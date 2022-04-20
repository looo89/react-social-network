import { type } from 'os';

import { stopSubmit } from "redux-form";
import { usersAPI, profileAPI } from "../api/api";
import { PhotosType, PostType, ProfileType } from '../types/types';



const ADD_POST='/profile/ADD-POST';
const SET_USER_PROFILE = '/profile/SET_USER_PROFILE';
const SET_STATUS = '/profile/SET_STATUS';
const DELETE_POST = '/profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS= '/profile/SAVE_PHOTO_SUCCESS';



let initialState = {
    posts: [
        {id: 1, message: 'Hi', likesCount: 12}, 
        {id: 2, message: 'Its my first post', likesCount: 11},
    ] as Array<PostType> , 
    profile : null as ProfileType | null,
    status: '',
    newPostText: '',
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType=>{
    switch (action.type) {
        case ADD_POST: {
            let newPost={
                id: 5,
                message: action.newPostText,
                likesCount: 0,
              };
            return {
                ...state,
                posts : [...state.posts, newPost],
            };
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        }

        case DELETE_POST: {
            return {
                ...state,
                posts : state.posts.filter(p=>p.id!==action.postId),
            };
        }


        case SET_USER_PROFILE : {
            return {
                ...state, profile: action.profile
            }
        }
        case SET_STATUS : {
            return {
                ...state, 
                status: action.status
            }
        }
        default:
            return state;
    }
}
type ActionsTypes= AddPostActionCreatorActionType | AddPostActionCreatorActionType | SetUserProfileActionType |
    SetStatusActionType | DeletePostActionType | SavePhotoSuccessActionType

type AddPostActionCreatorActionType={
    type: typeof ADD_POST
    newPostText: string
}
type SetUserProfileActionType={
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type SetStatusActionType={
    type: typeof SET_STATUS
    status: string
}
type DeletePostActionType={
    type: typeof DELETE_POST
    postId: number
}

type SavePhotoSuccessActionType={
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType =>({type: ADD_POST , newPostText});
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType =>({type: SET_USER_PROFILE, profile});
export const setStatus = (status: string): SetStatusActionType =>({type: SET_STATUS, status});
export const deletePost = (postId: number): DeletePostActionType =>({type: DELETE_POST, postId});
export const savaPhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType =>({type: SAVE_PHOTO_SUCCESS, photos});


export const getUserProfile=(userId: number )=> async(dispatch: any)=>{
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatus=(userId: number) => async (dispatch: any)=>{
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateStatus=(status: string) => async(dispatch: any)=>{
    let response = await profileAPI.updateStatus(status);
    if(response.data.resultCode===0){
        dispatch(setStatus(status));
    };
}

export const savePhoto=(file: any) => async(dispatch: any)=>{
    let response = await profileAPI.savePhoto(file);
    if(response.data.resultCode===0){
        dispatch(savaPhotoSuccess(response.data.data.photos));
    }
}
    
export const saveProfile=(profile: ProfileType) => async(dispatch: any, getState: any)=>{
    const userId= getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);
    if(response.data.resultCode===0){
        dispatch(getUserProfile(userId))
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
}  



export default profileReducer;