

import React, { useEffect, useState } from "react";
import classes from './ProfileInfo.module.css';


const ProfileStatusWithHooks=(props)=>{

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(()=>{
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode=()=>{
        setEditMode(true);
    }
    
    const deactivateEditMode=()=>{
        setEditMode(false);
        props.updateStatus(status);
    }
    
    const onStatusChange=(e)=>{
        setStatus(e.currentTarget.value)
    }

    return(
        <div>
            {!editMode &&
                <div>
                    <b>Status: </b><span onDoubleClick={activateEditMode}>{props.status || 'no status'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onBlur={deactivateEditMode}
                        autoFocus={true}
                        onChange={onStatusChange}
                        value={status}>
                </input>
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks







