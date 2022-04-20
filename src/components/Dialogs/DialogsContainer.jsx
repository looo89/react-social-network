import React from "react"
import { connect } from "react-redux";
import { sendMessageCreator } from "../../redux/dialogs-reducer.ts"
import Dialogs from "./Dialogs";
import { withAuthRedirect } from "../../hok/withAuthRedirect";
import { compose } from "redux";



let mapStateToProps =(state)=>{
    return{
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps=(dispatch)=>{
    return{
        sendMessage: (newMessageBody)=>{
            dispatch(sendMessageCreator(newMessageBody))
        },
    }
}
let DialogsContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)(Dialogs)

export default  DialogsContainer;