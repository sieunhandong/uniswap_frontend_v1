import styled from 'styled-components';

export const PageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 60px 20px;
    min-height: 100vh;
    background-color: #f9f9f9;
`;

export const FormWrapper = styled.div`
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 25px;
    color: #333;
    font-size: 24px;
    font-weight: bold;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
`;

export const Input = styled.input`
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    font-size: 14px;

    &:disabled {
        background-color: #f2f2f2;
    }
`;

export const Select = styled.select`
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    font-size: 14px;
`;

export const FileInput = styled.input`
    margin-bottom: 20px;
`;

export const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 14px;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;

    &:hover {
        background-color: #0069d9;
    }

    &:disabled {
        background-color: #a0a0a0;
        cursor: not-allowed;
    }
`;

// ✅ Thêm phần mới dưới đây:

export const ImagePreview = styled.img`
    margin-bottom: 20px;
    width: 100%;
    max-width: 250px;
    border: 1px solid #ccc;
    border-radius: 8px;
    object-fit: contain;
    display: block;
`;

export const Message = styled.p`
    margin-top: 16px;
    font-weight: 500;
    color: ${props => props.error ? 'red' : 'green'};
    text-align: center;
`;
