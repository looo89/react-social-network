import { type } from 'os';
import { AppStateType } from './redux-store';
import {usersAPI} from "../api/api";
import { UserType } from "../types/types";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import actions from 'redux-form/lib/actions';


const FOLLOW='/users/FOLLOW';
const UNFOLLOW = '/users/UNFOLLOW';
const SET_USERS= '/users/SET_USERS';
const SET_CURRENT_PAGE= '/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT ='/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING='/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS='/users/TOGGLE_IS_FOLLOWING_PROGRESS'





let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // array of user id
};

type InitialStateType = typeof initialState 

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType=>{
    switch (action.type) {
       case FOLLOW : {
        return {
            ...state, 
            users: state.users.map(u=>{
                if(u.id===action.userId){
                    return {...u, followed : true}
                }
                return u;
            })
         }
       }

        case UNFOLLOW :  {
            return {
                ...state, 
                users: state.users.map(u=>{
                    if(u.id===action.userId){
                        return {...u, followed :false}
                    }
                    return u;
                })
             }
       }

       case SET_USERS : {
           return {...state, users: action.users}
       }
       
        case SET_CURRENT_PAGE : {
            return {...state, currentPage: action.currentPage}
        }

        case SET_TOTAL_USERS_COUNT : {
            return {...state, totalUsersCount: action.count}
        }

        case TOGGLE_IS_FETCHING : {
            return {...state, isFetching: action.isFetching}
        }

        case TOGGLE_IS_FOLLOWING_PROGRESS : {
            return {...state, 
                    followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id=>id !==action.userId)
                }
        }
       default:
            return state;
    }
}

type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType| 
    SetUsersActionType | SetCurrentPageActionType | 
    SetUsersTotalCountActionType | ToggleIsFetchingActionType |
    ToggleIsFetchingActionType | ToggleFollowingProgressActionType

type FollowSuccessActionType={
    type: typeof FOLLOW
    userId: number
}
type UnfollowSuccessActionType={
    type: typeof UNFOLLOW
    userId: number
}
type SetUsersActionType={
    type: typeof SET_USERS
    users: Array<UserType>
}
type SetCurrentPageActionType={
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type SetUsersTotalCountActionType={
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
type ToggleIsFetchingActionType={
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}

type ToggleFollowingProgressActionType={
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}

export const followSuccess = (userId: number): FollowSuccessActionType =>({type: FOLLOW, userId});
export const unfollowSuccess= (userId: number): UnfollowSuccessActionType =>({type: UNFOLLOW, userId});
export const setUsers= (users: Array<UserType>): SetUsersActionType =>({type: SET_USERS, users});
export const setCurrentPage= (currentPage: number): SetCurrentPageActionType=>({type: SET_CURRENT_PAGE, currentPage });
export const setUsersTotalCount=(totalUsersCount: number): SetUsersTotalCountActionType=>({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching =(isFetching: boolean): ToggleIsFetchingActionType=>({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress =(isFetching: boolean, userId: number): ToggleFollowingProgressActionType=>({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});



type GetStateType =()=>AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const requestUsers =(page: number, pageSize: number): ThunkType=>{ 
    return async (dispatch , getState )=>{
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let response = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.data.items));
        dispatch(setUsersTotalCount(response.data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch: DispatchType,userId: number,
    apiMethod: any,
    actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await apiMethod(userId)

    if (response.resultCode == 0) {
    dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
    }

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)}
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {await _followUnfollowFlow(dispatch, userId, 
        usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
}
}
export default usersReducer;