import React from "react";
import classes from './Post.module.css'


const Post =(props)=>{
    return(
        
      <div className={classes.item}>
        <img src="https://yt3.ggpht.com/a/AATXAJzviW0HQl1f9EE0uALnInOV9uq2eeDP9vFcnYTY=s900-c-k-c0xffffffff-no-rj-mo" />
         {props.message} 
          <div>
            <span>like</span>  {props.likesCount}
          </div>
        
          

      </div>
               
    )
}


export default Post





