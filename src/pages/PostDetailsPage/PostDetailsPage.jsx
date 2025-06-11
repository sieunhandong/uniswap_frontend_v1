import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Breadcrumb, Button, ConfigProvider, Layout, Space, Typography } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import PostDetailsComponent from '../../components/PostDetailsComponent/PostDetailsComponent'
import styled from 'styled-components'

const { Content } = Layout
const { Text } = Typography

// Styled components
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 24px 0;
`

const MainContent = styled.div`
  max-width: 1270px;
  margin: 0 auto;
  background: transparent;
`

const StyledBreadcrumb = styled(Breadcrumb)`
  padding: 16px 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  margin-bottom: 16px;
  
  .ant-breadcrumb-link {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

const BackButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  height: auto;
  
  &:hover {
    color: #1890ff;
  }
`

const PostDetailsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00b96b',
                    borderRadius: 4,
                },
            }}
        >
            <PageContainer>
                <MainContent>
                    <StyledBreadcrumb
                        items={[
                            {
                                title: (
                                    <BackButton 
                                        type="text" 
                                        onClick={() => navigate('/')}
                                        icon={<HomeOutlined />}
                                    >
                                        Trang chủ
                                    </BackButton>
                                ),
                            },
                            {
                                title: 'Chi tiết sản phẩm',
                            },
                        ]}
                    />
                    
                    <Content style={{ padding: '24px', background: 'white', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        <PostDetailsComponent idProduct={id} />
                    </Content>
                </MainContent>
            </PageContainer>
        </ConfigProvider>
    )
}

export default PostDetailsPage