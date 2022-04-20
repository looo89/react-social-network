import React from "react";
import { connect } from "react-redux";
import {requestUsers, follow, unfollow} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../coomon/Preloader/Preloader";
import { compose } from "redux";
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage,
    getIsFetcing, getFollowingInProgress } from "../../redux/users-selectors";
import {UserType} from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType ={
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType ={
    requestUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number)=> void
    unfollow: (userId: number)=>void
}
type OwnPropsType ={
}


type PropsType = MapDispatchPropsType & MapStatePropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize}= this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged=(pageNumber: number)=>{
        const {pageSize}= this.props;
        this.props.requestUsers(pageNumber, pageSize);
    }

    render () {   
        return <> 
            { this.props.isFetching ? <Preloader/> : null }
    
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
                /> 
            </>
    }
}
let mapStateToProps = (state: AppStateType): MapStatePropsType=>{
    return{
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetcing(state), 
        followingInProgress: getFollowingInProgress(state), 
    }
}



export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
        mapStateToProps, 
        {follow, unfollow, requestUsers }),
    )(UsersContainer);



