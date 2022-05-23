import React from 'react'
import { Link } from 'react-router-dom';
import '../NavBar/sections/NavBar.css';
import LeftMenu from './sections/LeftMenu';
import { FiDroplet } from "react-icons/fi";
import RightMenu from './sections/RightMenu';

function NavBar() {
  return (
    <nav className='menu' style={{ position: 'fixed', zIndex: 5, width: '100%'}}>
      <div className='menu_logo'>
        <Link to="/"><FiDroplet /></Link>
      </div>
      <div className='menu_container'>
        <div className='menu_left'>
          <LeftMenu mode='horizontal' />
        </div>
        <div className='menu_right'>
          <RightMenu mode='horizontal' />
        </div>
      </div>

    </nav>
  )
}

export default NavBar
