import { Menu } from 'antd'
import React, { useState } from 'react'
import { getItem } from '../../utils';
import { MailOutlined, AppstoreOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import { AdminUser } from '../../components/AdminUser/AdminUser';
import { AdminProduct } from '../../components/AdminProduct/AdminProduct';
import { OrderAdmin } from '../../components/OrderAdmin/OrderAdmin';
import PostCreate from '../PostCreate/PostCreate';
import MyPosts from '../MyPostPage/MyPostPage';
import ModerationPage from '../ModerationPage/ModerationPage';
import DepositRequestsPage from '../DespositAdmin/DespositAdmin';
import { useSelector } from 'react-redux';

const AdminPage = () => {

    const user = useSelector((state) => state.user)
    const isAdmin = user?.isAdmin
    const items = [
        // getItem('Người dùng', 'user', <UserOutlined />),
        ...(isAdmin === true ? [getItem('Người dùng', 'user', <UserOutlined />)] : []),
        // getItem('Sản Phẩm', 'product', <AppstoreOutlined />),
        // getItem('Đơn hàng', 'order', <ShoppingCartOutlined />),
        ...(isAdmin === true ? [getItem('Kiểm duyệt nạp tiền', 'desposit-admin', <AppstoreOutlined />)] : []),
        ...(isAdmin === true ? [getItem('Kiểm duyệt tin', 'moderation', <AppstoreOutlined />)] : []),
        ...(isAdmin === false ? [getItem('Bài đăng', 'my-post', <AppstoreOutlined />)] : []),
    ]

    const [keySelected, setKeySelected] = useState('')
    
    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <AdminUser />
                )
            // case 'product':
            //     return (
            //         <AdminProduct />
            //     )
            // case 'order':
            //     return (
            //         <OrderAdmin />
            //     )
            case 'desposit-admin':
                return (
                    <DepositRequestsPage />
                )
            case 'moderation':
                return (
                    <ModerationPage />
                )
            case 'my-post':
                return (
                    <MyPosts />
                )
            default:
                return <></>
        }

    }

    const handleOnClick = ({ key }) => {
        setKeySelected(key)
    }
    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{ display: 'flex', overflow: 'hidden' }}>
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh'
                    }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div style={{ flex: 1, padding: '15px 0 15px 15px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    )
}

export default AdminPage