import { Button } from 'antd'
import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

const ButtonInputSearch = (props) => {
    const { size,
        placeholder,
        textbutton,
        bordered,
        backgroundColorInput = "#fff",
        backgroundColorButton = "white",
        colorButton = '#2C9876'
    } = props
    return (
        <div style={{ display: 'flex'}}>
            <InputComponent size={size}
                placeholder={placeholder}
                bordered={false}
                style={{
                    backgroundColor: backgroundColorInput,
                    borderRadius: '10px',
                    width: '600px',
                }}
                {...props}
            />

            {/* <ButtonComponent size={size}
                bordered={false}
                styleButton={{
                    background: backgroundColorButton,
                    color: colorButton,
                    height: '38px', 
                    width: '120px',
                    marginLeft: '10px',
                    fontWeight: 500,
                }}
                icon={<SearchOutlined style={{ color: colorButton }} />}
                textbutton={textbutton}
                styleTextButton={{ color: colorButton}}
            /> */}
        </div>
    )
}

export default ButtonInputSearch