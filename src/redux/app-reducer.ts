
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCSESS='INITIALIZED_SUCCSESS';

export type InitialStateType={
    initialized: boolean
} 

let initialState: InitialStateType = {
    initialized: false   
};

const appReducer = (state = initialState, action: any): InitialStateType=>{
    switch (action.type) {
       case INITIALIZED_SUCCSESS : {
            return {
                ...state,
                initialized: true,
            }
        }    
       default:
            return state;
    }
}


type InitializedSucsessActionType= {
    type: typeof INITIALIZED_SUCCSESS;
}

export const initializedSucsess = (): InitializedSucsessActionType =>
    ({type: INITIALIZED_SUCCSESS });

export const initializeApp =()=>(dispatch: any)=>{
   let promise=dispatch(getAuthUserData());
   Promise.all([promise])
    .then(()=>{
        dispatch(initializedSucsess());
   });   
}    

    
export default appReducer;