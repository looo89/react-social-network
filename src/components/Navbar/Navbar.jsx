import React from "react";
import { NavLink } from "react-router-dom";
import classes from './Navbar.module.css'

const DialogItem=(props)=>{
  return(
      <div className={classes.item}>
        <NavLink to="/profile" className={SelectedLink()} >Profile</NavLink>
          </div>
  )
}



const SelectedLink = () => {
  return (
      select => select.isActive ? classes.activeLink : classes.item
  ); 
}

const Navbar =()=>{
    return(
        <nav className={classes.nav}>
          <div className={classes.item}>
            <NavLink to="/profile" className={SelectedLink()} >Profile</NavLink>
          </div>
          <div className={classes.item}>
            <NavLink to="/dialogs" className={SelectedLink()} >Message</NavLink>
          </div>
          <div className={classes.item}>
            <NavLink to="/users" className={SelectedLink()} >Users</NavLink>
          </div>
          <div className={classes.item}>
            <NavLink to="news" className={SelectedLink()} >News</NavLink>
          </div>
          <div className={classes.item}>
            <NavLink to="music" className={SelectedLink()} >Music</NavLink>
          </div>
          <div className={classes.item}>
            <NavLink to="settings" className={SelectedLink()} >Settings</NavLink>
          </div>
      </nav> 
    )
}

export default Navbar











