import React from "react";
import { NavLink } from "react-router-dom";
import classes from './Header.module.css'


const Header = (props)=>{
    return (
        <header className={classes.header}>
          <img src='https://e7.pngegg.com/pngimages/381/29/png-clipart-logo-graphic-design-company-company-logo-angle-building-thumbnail.png'/>
          <div className={classes.loginBlock}>
            {props.isAuth 
              ? <div>{props.login} <button onClick={props.logout}>Log out</button></div>
              : <div><NavLink to={'/login'}>Login</NavLink></div> }
            
          </div>
        </header>
    )   
}

export default Header
