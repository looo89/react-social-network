import React from "react"
import classes from './Dialogs.module.css'
import Message from "./Message/Message"
import DialogItem from "./DialogItem/DialogItem"
import { Redirect } from "react-router-dom"
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../coomon/FormsControls/FormsControls";
import { maxLengthCreator, required } from "../../utils/validators/validators"


const Dialogs = (props)=>{
    
    let state=props.dialogsPage;
    let dialogsElements=state.dialogs
        .map(d => <DialogItem name={d.name} id={d.id} />);
    let messagesElements=state.messages
        .map(m => <Message message={m.message}  />);


    let addNewMessage=(values)=>{
        props.sendMessage(values.newMessageBody)
    }

    if (!props.isAuth) return <Redirect to="/login"/>;
    
    return(
            <div className={classes.dialogs}>
                <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
               <div>{messagesElements}</div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
}
const maxLength100=maxLengthCreator(100);
const AddMessageForm=(props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} 
                    validate={[required, maxLength100]}
                    name={"newMessageBody"} 
                    placeholder={"Enter your message"}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)
export default Dialogs;