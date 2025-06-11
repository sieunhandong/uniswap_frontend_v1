import { Image } from 'antd';
import React from 'react'
import Slider from 'react-slick'

const SliderComponent = ({ arrImages }) => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000
    };
    return (
        <Slider {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image key={image} src={image} alt="slider" preview={false} width="100%" height={"500px"} style={{ objectFit: 'cover' }}/>
                )
            })}
        </Slider>
    )
}

export default SliderComponent