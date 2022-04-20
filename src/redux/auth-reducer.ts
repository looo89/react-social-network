import { type } from "os";
import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA='/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS= '/auth/GET_CAPTCHA_URL_SUCCESS';


let initialState= {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null 
};

export type InitialStateType  = typeof initialState;

const authReducer = (state = initialState, action: any): InitialStateType=>{
    switch (action.type) {
       case SET_USER_DATA : {
            return {
                ...state, 
                ...action.payload,
            }
        }
        case GET_CAPTCHA_URL_SUCCESS : {
            return {
                ...state, 
                captchaUrl: action.captchaUrl,
            }
        }   
       default:
            return state;
    }
}

type SetAuthUserDataPayloadType={
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataType={
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataPayloadType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataType =>
    ({type: SET_USER_DATA, payload : { userId, email, login, isAuth}});


type GetCaptchaSuccessActionType={
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl: string}
}
export const getCaptchaSuccess = (captchaUrl: string): GetCaptchaSuccessActionType =>
    ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}});

export const getAuthUserData =()=> async (dispatch: any)=>{
    let response = await authAPI.me();
        if (response.data.resultCode===0) {
          let{id, login, email}=response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
}    

export const login =(email: string, password: string, rememberMe: boolean, captcha: any )=>async(dispatch: any)=>{

    let response = await authAPI.login(email, password, rememberMe, captcha);
        if (response.data.resultCode===0) {
            dispatch(getAuthUserData())
        } else {
            if (response.data.resultCode===10){
                dispatch(getCaptchaUrl());
            }

            let message =response.data.messages.length>0 ? response.data.messages[0] : "Some error" ;
            dispatch(stopSubmit("login", {_error: message}))
        }
}    

export const logout =()=>async(dispatch: any)=>{
    let response = await authAPI.logout();
        if (response.data.resultCode===0) {
            dispatch(setAuthUserData(null, null, null, false))
        }
}  

export const getCaptchaUrl =()=>async(dispatch: any)=>{
    const response = await securityAPI.getCaptcha();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaSuccess(captchaUrl))

}    

    
export default authReducer;