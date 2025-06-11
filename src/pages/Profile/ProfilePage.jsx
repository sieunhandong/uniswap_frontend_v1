import React, { useEffect, useState } from 'react'
import { 
  WrapperAvatarProfile, 
  WrapperContentProfile, 
  WrapperHeader, 
  WrapperProfileContainer, 
  WrapperUploadFile, 
  WrapprerLabel,
  AvatarContainer,
  ProfileSection,
  InputContainer,
  SaveButton,
  UploadButton,
  InfoCard,
  UserInfoSection,
  UserName,
  UserRole,
  UserStats,
  StatItem
} from './style'
import InputFormComponent from '../../components/InputFormComponent/InputFormComponent'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../services/UserService'
import { useMutatioHooks } from '../../hooks/useMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide'
import { 
    UserOutlined, 
    MailOutlined, 
    PhoneOutlined, 
    EnvironmentOutlined,
    CameraOutlined,
    SaveOutlined
} from '@ant-design/icons'
import { getBase64 } from '../../utils'

const ProfilePage = () => {
    const user = useSelector((state) => state.user);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');

    const dispatch = useDispatch();
    const mutation = useMutatioHooks(
        async (data) => {
            const { id, access_token, ...rests } = data
            const res = await UserService.updateUser(id, access_token, rests);
            return { ...res.data, access_token };
        }
    )

    const { data, isPending, isSuccess, isError } = mutation

    useEffect(() => {
        setEmail(user?.email);
        setName(user?.name);
        setPhone(user?.phone);
        setAddress(user?.address);
        setAvatar(user?.avatar);
    }, [user])

    useEffect(() => {
        if (isSuccess) {
            message.success("Profile updated successfully!");
            handleGetDetailsUser(user?.id, data?.access_token)
        } else if (isError) {
            message.error("Update failed. Please try again.")
        }
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnchangeEmail = (value) => setEmail(value)
    const handleOnchangeName = (value) => setName(value)
    const handleOnchangePhone = (value) => setPhone(value)
    const handleOnchangeAddress = (value) => setAddress(value)
    
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList?.[0];
        if (!file) return;

        let preview = file.url;
        if (!preview && file.originFileObj) {
            preview = await getBase64(file.originFileObj);
        }
        setAvatar(preview);
    };

    const handleUpdate = () => {
        mutation.mutate({ 
            id: user?.id, 
            email, 
            name, 
            phone, 
            address, 
            avatar, 
            access_token: user?.access_token 
        })
    }

    return (
        <WrapperProfileContainer>
            <Loading isLoading={isPending}>
                <ProfileSection>
                    <WrapperAvatarProfile>
                        <AvatarContainer>
                            {avatar ? (
                                <img src={avatar} alt="avatar" className="avatar-image" />
                            ) : (
                                <div className="avatar-placeholder">
                                    <UserOutlined style={{ fontSize: '48px', color: '#fff' }} />
                                </div>
                            )}
                            <WrapperUploadFile 
                                onChange={handleOnchangeAvatar}
                                maxCount={1}
                                beforeUpload={() => false}
                                showUploadList={false}
                            >
                                <UploadButton icon={<CameraOutlined />}>
                                    Change Photo
                                </UploadButton>
                            </WrapperUploadFile>
                        </AvatarContainer>
                        
                        <UserInfoSection>
                            <UserName>{name || 'User Name'}</UserName>
                            <UserRole>Member</UserRole>
                            
                            <UserStats>
                                <StatItem>
                                    <div className="stat-number">24</div>
                                    <div className="stat-label">Books</div>
                                </StatItem>
                                <StatItem>
                                    <div className="stat-number">12</div>
                                    <div className="stat-label">Trades</div>
                                </StatItem>
                                <StatItem>
                                    <div className="stat-number">5.0</div>
                                    <div className="stat-label">Rating</div>
                                </StatItem>
                            </UserStats>
                        </UserInfoSection>
                    </WrapperAvatarProfile>
                    
                    <WrapperContentProfile>
                        <WrapperHeader>Account Information</WrapperHeader>
                        
                        <InfoCard>
                            <InputContainer>
                                <WrapprerLabel htmlFor="name">
                                    <UserOutlined /> Full Name
                                </WrapprerLabel>
                                <InputFormComponent 
                                    id="name" 
                                    value={name} 
                                    onChange={handleOnchangeName}
                                    placeholder="Enter your full name"
                                />
                            </InputContainer>
                            
                            <InputContainer>
                                <WrapprerLabel htmlFor="email">
                                    <MailOutlined /> Email 
                                </WrapprerLabel>
                                <InputFormComponent 
                                    id="email" 
                                    value={email} 
                                    onChange={handleOnchangeEmail}
                                    placeholder="Enter your email address"
                                />
                            </InputContainer>
                            
                            <InputContainer>
                                <WrapprerLabel htmlFor="phone">
                                    <PhoneOutlined /> Phone Number
                                </WrapprerLabel>
                                <InputFormComponent 
                                    id="phone" 
                                    value={phone} 
                                    onChange={handleOnchangePhone}
                                    placeholder="Enter your phone number"
                                />
                            </InputContainer>
                            
                            <InputContainer>
                                <WrapprerLabel htmlFor="address">
                                    <EnvironmentOutlined /> Address
                                </WrapprerLabel>
                                <InputFormComponent 
                                    id="address" 
                                    value={address} 
                                    onChange={handleOnchangeAddress}
                                    placeholder="Enter your address"
                                />
                            </InputContainer>
                        </InfoCard>
                        
                        <SaveButton
                            onClick={handleUpdate}
                            disabled={isPending}
                            icon={<SaveOutlined />}
                        >
                            {isPending ? 'Saving Changes...' : 'Save Changes'}
                        </SaveButton>
                    </WrapperContentProfile>
                </ProfileSection>
            </Loading>
        </WrapperProfileContainer>
    )
}

export default ProfilePage