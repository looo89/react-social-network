import React from "react"
import classes from './../Dialogs.module.css'




const Message=(props)=>{

    // let newMessageElement = React.createRef();
    // let dialogsElements=props.state.dialogs
    //     .map(d => <DialogItem name={d.name} id={d.id}/>);

    // let messagesElements=props.state.messages
    //     .map(m => <Message message={m.message} />);

    
    // let addMessage=()=>{
    //       props.addMessage();
    // }
      
    // let onMessageChange=()=>{
    //       let text= newMessageElement.current.value;
    //       props.updateNewMessageText(text);
    // }
    

    return(
        <div>
             <div className={classes.message}>{props.message}</div>
             {/* <div>
                //<textarea ref={newMessageElement} onChange={onMessageChange}/>
              </div>
              <div>               
                <button onClick={addMessage} >Add message</button>
              </div> */}
        </div>
    )
}


export default Message;