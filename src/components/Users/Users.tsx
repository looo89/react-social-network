import React from "react";
import User from "./User";
import Paginator from "../coomon/Paginator/Paginator";
import {UserType} from "../../types/types"


type PropsType={
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number)=> void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number)=> void
    unfollow: (userId: number)=>void
}

let Users: React.FC<PropsType> =({totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props})=>{

    return <div>
                <Paginator totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
                    currentPage={currentPage} 
                    onPageChanged={onPageChanged} />
                <div>
                {
                    users.map(u => <User user={u}
                             key={u.id}
                            followingInProgress={props.followingInProgress}
                            follow={props.follow}
                            unfollow={props.unfollow} /> 
                        )
                }
                </div>
        </div>

}
export default Users;

