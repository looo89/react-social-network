import React from "react";
import { reduxForm } from "redux-form";
import classes from './ProfileInfo.module.css';
import { createField, Input, Textarea } from "../../coomon/FormsControls/FormsControls";
import style from "../../coomon/FormsControls/FormsControls.module.css"



const ProfileDataForm=({handleSubmit, profile, error})=>{
    return(
        <form onSubmit={handleSubmit}>
            <div><button>Save</button></div>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <b>Full name:</b> {createField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job:</b> {createField("","lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <b>My professional skills:</b>
                {createField("My professional skills","lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me:</b> 
                {createField("About me", "aboutMe", [], Textarea)}
            </div>
             <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key=>{
                    return <div key={key} className={classes.contact}>
                        <b>{key}: </b> {createField(key, "contacts."+key, [], Input)}
                    </div>
                    })} 
            </div>  
        </form>
    )
}

const ProfileDataFormReduxForm=reduxForm({form: 'edit-profile'})(ProfileDataForm);

export default ProfileDataFormReduxForm;
