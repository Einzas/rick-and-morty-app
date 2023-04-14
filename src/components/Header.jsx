import React from 'react'
import "./header.css"
const Header = () => {
  return (
    <header>
        <div className='relative w-auto flex items-center justify-center '>
            <img className='absolute z-10 ' src={"images/name.png"} alt="" />
            <img className='rotating' src={"/images/logo.png"} alt="" />
        </div>
    </header>
  )
}

export default Header