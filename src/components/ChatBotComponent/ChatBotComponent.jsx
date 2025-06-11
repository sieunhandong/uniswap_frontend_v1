import React, { useEffect, useRef, useState } from 'react';
import './ChatBox.css';
import * as ChatBotService from '../../services/ChatBotService';
import { AudioOutlined, CameraOutlined, DeleteOutlined, MessageOutlined } from '@ant-design/icons';
import { MessageCircle } from 'lucide-react';

const ChatBotComponent = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isSpeakingEnabled, setIsSpeakingEnabled] = useState(true);
    const chatBoxRef = useRef(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    // Add welcome message when chat opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeMessage = "Xin chào! Tôi là trợ lí ảo UniSwap với AI thông minh. Tôi có thể gợi ý sản phẩm phù hợp với mong muốn của bạn. Bạn cần tôi giúp gì không?";
            setMessages([{ sender: 'bot', text: welcomeMessage }]);
            if (isSpeakingEnabled) {
                speakText(welcomeMessage);
            }
        }
    }, [isOpen, isSpeakingEnabled]);

    const speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN';

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(v => v.lang === 'vi-VN' && v.name.includes('Google'));

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        window.speechSynthesis.speak(utterance);
    };

    const handleSend = async () => {
        if (!input.trim() && !selectedImage) return;

        // Text message
        if (input.trim()) {
            setMessages(prev => [...prev, { sender: 'user', text: input }]);

            try {
                const data = { query: input };
                const res = await ChatBotService.chatBot(data);
                const botReply = res.reply || "Bot không trả lời được.";
                setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
                if (isSpeakingEnabled) speakText(botReply);
            } catch {
                setMessages(prev => [...prev, { sender: 'bot', text: 'Lỗi khi gọi API.' }]);
            }
        }

        // Image message
        if (selectedImage) {
            const imageUrl = URL.createObjectURL(selectedImage);
            setMessages(prev => [...prev, { sender: 'user', type: 'image', imageUrl }]);

            const formData = new FormData();
            formData.append("image", selectedImage);

            try {
                const res = await ChatBotService.upLoadImage(formData);
                const reply = res.reply || "Không tìm thấy sản phẩm phù hợp.";
                setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
                if (isSpeakingEnabled) speakText(reply);
            } catch {
                setMessages(prev => [...prev, { sender: 'bot', text: "Lỗi xử lý ảnh." }]);
            }

            setSelectedImage(null); // Clear image after sending
        }

        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    const handleVoiceInput = () => {
        const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const voiceText = event.results[0][0].transcript;
            setInput(voiceText);
        };

        recognition.onerror = (event) => {
            console.error("Lỗi nhận dạng giọng nói:", event.error);
        };

        recognition.start();
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedImage(file); // Store image for preview
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="chat-toggle-btn"
                aria-label={isOpen ? "Đóng trò chuyện" : "Mở trò chuyện"}
            >
                <MessageCircle />
            </button>

            {isOpen && (
                <div className="chat-popup">
                    <div className="chat-box">
                        <div className="chat-header">
                            <span>AI UniSwap</span>
                            <div className="voice-toggle">
                                <input
                                    type="checkbox"
                                    id="toggle-voice"
                                    checked={isSpeakingEnabled}
                                    onChange={(e) => setIsSpeakingEnabled(e.target.checked)}
                                />
                                <label htmlFor="toggle-voice">Phát giọng nói</label>
                            </div>
                            <button onClick={() => setIsOpen(false)} aria-label="Đóng">✖</button>
                        </div>
                        <div className="chat-messages" ref={chatBoxRef}>
                            {messages.map((msg, index) => (
                                <div key={index} className={`msg ${msg.sender}`}>
                                    {msg.type === 'image' ? (
                                        <img src={msg.imageUrl} alt="User uploaded" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                                    ) : (
                                        msg.text
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="input-container">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Nhập tin nhắn..."
                            />
                            <label htmlFor="image-upload" className="icon-button" title="Gửi ảnh"><CameraOutlined /></label>
                            <input
                                id="image-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageSelect}
                                style={{ display: "none" }}
                            />
                            <button onClick={handleVoiceInput} className="icon-button" title="Ghi âm"><AudioOutlined /></button>
                            <button onClick={handleSend} className="send-button">Gửi</button>
                        </div>

                        {selectedImage && (
                            <div style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="preview"
                                    style={{ maxWidth: '80px', maxHeight: '80px', borderRadius: '8px' }}
                                />
                                <button onClick={handleRemoveImage} className="icon-button" title="Xoá ảnh"><DeleteOutlined /></button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBotComponent;