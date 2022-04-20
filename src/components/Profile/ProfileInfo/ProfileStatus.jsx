import React from "react";
import classes from './ProfileInfo.module.css';


class ProfileStatus extends React.Component{
    state={
        editMode: false,
        status: this.props.status
    }
    activateEditMode=()=>{
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode=()=>{
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    onStatusChange=(e)=>{
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }
    render(){
        return(
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>
                            {this.props.status || 'no status'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input value={this.state.status}
                        onChange={this.onStatusChange}
                        onBlur={this.deactivateEditMode}></input>
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus