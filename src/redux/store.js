
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";




let store ={
    _state: {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi', likesCount: 12}, 
            {id: 2, message: 'Its my first post', likesCount: 11}
          ],
        newPostText: 'new post',
    },
    dialogsPage:{
        messages: [
          {id: 1, message: 'Hi'},
          {id: 2, message: 'How are you?'},
          {id: 3, message: 'Hello'},
        ],
        dialogs: [ 
          {id: 1, name: 'Dima'},
          {id: 2, name: 'Andrey'},
          {id: 3, name: 'Sveta'},
          {id: 4, name: 'Sasha'},
          {id: 5, name: 'Viktor'},
          {id: 6, name: 'Valera'},
        ],
        newMessageBody: '',

    },},
    _callSubscriber() {
      console.log('state changed')
    },

    getState() {
      return this._state
    },
    subscribe (observer) {
      this._callSubscriber=observer;
    },



    dispatch(action){

      this._state.profilePage = profileReducer(this._state.profilePage, action);
      this._state.dialogsPage= dialogsReducer(this._state.dialogsPage, action);
      this._state.sidebar = sidebarReducer(this._state.sidebar, action);

      
      this._callSubscriber(this._state);
      }

}


export default store;
