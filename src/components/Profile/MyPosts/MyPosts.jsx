import React from "react";
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { required, maxLengthCreator } from "../../../utils/validators/validators";
import { Textarea } from "../../coomon/FormsControls/FormsControls";


let maxLength10 = maxLengthCreator(10);

let AddNewPostForm=(props)=>{
  return(
    <form  onSubmit={props.handleSubmit}>
        <div>
            <Field  
              component={Textarea}
              name={"newPostText"}
              validate={[required, maxLength10]} />
        </div>
        <div>               
          <button >Add post</button>
        </div>
    </form>
  )
}
let AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"})(AddNewPostForm)


const MyPosts =(props)=>{
  
  let postsElements= [...props.posts]
    .reverse()
    .map((p)=><Post key={p.id} message={p.message} likesCount={p.likesCount} />)

  let newPostElement = React.createRef();

  let onAddPost=(values)=>{
    props.addPost(values.newPostText);
  }


  return(
    <>
      <div className={classes.postsBlock}>
        <h3>My posts</h3>
      </div>
       <AddNewPostFormRedux onSubmit={onAddPost}/> 
      
      <div className={classes.posts}>
        {postsElements}
      </div>   
    </> 
  )
}


export default MyPosts





