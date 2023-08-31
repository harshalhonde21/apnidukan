import React, { useState } from 'react'
import './index1.css';
import { NavLink } from 'react-router-dom';
export default function Navbar(props) {
  return (
    <div>
      <div className="nav" style={{width:"100%",display:`${props.hide}`}}> 
        <ul>
            <li><NavLink to="/">Customer Login</NavLink></li>
            <li><NavLink to="/shoplogin">Shopkeeper Login</NavLink></li>
        </ul>
      </div>
    </div>
  )
}
