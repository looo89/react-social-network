import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";

let state = {
    posts: [
        {id: 1, message: 'Hi', likesCount: 12}, 
        {id: 2, message: 'Its my first post', likesCount: 11},
    ],
};


it('length of posts should be incremented', ()=>{
    // start date
    let action= addPostActionCreator('biba');
    // action
    let newState = profileReducer(state, action);
    //expectation
    expect(newState.posts.length).toBe(3);
})

it('like of post should be 0', ()=>{
    let action= addPostActionCreator('biba');
    let newState = profileReducer(state, action);
    expect(newState.posts[2].likesCount).toBe(0);
})
it('new post should be biba', ()=>{
    let action= addPostActionCreator('biba');
    let newState = profileReducer(state, action);
    expect(newState.posts[2].message).toBe('biba');
})

it('after deleting length post should be decrement', ()=>{
    let action= deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(1);
})