import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import classes from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";



const Profile =(props)=>{
    
    return(
        <div>
            <ProfileInfo profile={props.profile} 
                status={props.status}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
                updateStatus={props.updateStatus}/>
            <MyPostsContainer />
            
        </div>
    )
}


export default Profile