import {createSlice} from '@reduxjs/toolkit';

const loggedIn =!! localStorage.getItem('token');
const initialState = {isAuthenticated : loggedIn, email: '', idToken: ''};

const AuthSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.email = action.payload.email;
            state.idToken = action.payload.idToken
            localStorage.setItem('token',JSON.stringify(action.payload.idToken) );
        },
        logOut(state) {
            state.isAuthenticated = false;
            localStorage.removeItem('token');
        }
    }
});
export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;