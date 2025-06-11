import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils';
import { FieldTimeOutlined, HomeOutlined } from '@ant-design/icons'


const CardComponent = (props) => {
    const { image, name, price, id } = props
    const navigate = useNavigate();
    const handleDetailsProduct = (id) => {
        navigate(`/post-details/${id}`)
    }
    return (
        <WrapperCardStyle
            hoverable
            styles={{
                root: { width: '200px' },
                head: { backgroundColor: '#f0f2f5', height: '200px' }, // Thay vì dùng headStyle
                body: { padding: '10px' }
            }}
            cover={<img alt="example" src={image} style={{ padding: '10px' }} />}
            onClick={() => handleDetailsProduct(id)}
        >
            {/* <WrapperImageStyle src={logo} alt="logo" /> */}
            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                {/* <span style={{ marginRight: '4px' }}>
                    <span>{rating}</span><StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
                </span>
                <WrapperStyleTextSell> | Đã bán {selled || 1000}+</WrapperStyleTextSell> */}
                <div style={{ display: 'flex', marginBottom: '4px', gap: '4px' }}>
                    <FieldTimeOutlined style={{ fontSize: '12px', color: "rgb(128,128,137)" }} />
                    <WrapperStyleTextSell>8 giờ trước</WrapperStyleTextSell>
                </div>
                <div style={{ display: 'flex', marginBottom: '4px', gap: '4px' }}>
                    <HomeOutlined style={{ fontSize: '12px', color: "rgb(128,128,137)" }} />
                    <WrapperStyleTextSell>Thường Tín, Hà Nội</WrapperStyleTextSell>
                </div>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
                {/* <WrapperDiscountText> - {discount || 5}%</WrapperDiscountText> */}
            </WrapperPriceText>
        </WrapperCardStyle>

    )
}

export default CardComponent