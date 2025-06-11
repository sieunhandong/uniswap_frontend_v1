import React from 'react'
import HeaderComponent from '../HeaderComponent/HeaderComponent'
import Footer from '../Footer/FooterComponent'

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <div style={{ position: 'sticky', top: 0, zIndex: 999, backgroundColor: '#fff' }}>
        <HeaderComponent />
      </div>
      {children}
      <Footer />
    </div>
  )
}

export default DefaultComponent
