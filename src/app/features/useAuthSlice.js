import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import request from "../../utilities/request";

export const login = createAsyncThunk('login',async (arg,thunkApi)=>{
    const res = await request(arg);
    if(res.status === 200 || res.status === 401) {
        const data = await res.json();
        if(res.status === 200) {
            return thunkApi.fulfillWithValue(data);
        }
        else {
            return thunkApi.rejectWithValue(data.message);
        }
    } else {
        return thunkApi.rejectWithValue('Internal Server Error');
    }
});
export const logout = createAsyncThunk('logout', async(arg, thunkApi)=>{
    const {auth} = thunkApi.getState();
    console.log(auth.adminId);
    const res = await request({
        url:'/auth/logout',
        method:'DELETE',
        data:{
            id: auth.role === 'admin'? auth.adminId: auth.userId
        }
    });

    if(res.status === 200) {
        return thunkApi.fulfillWithValue()
    } else {
        return thunkApi.rejectWithValue('unable to logout');
    }
},{
    condition:(arg,{getState})=>{
        const {auth} = getState();
        if(!auth.isLoading && auth.isLogin) {
            return true;
        } else {
            return false;
        }
    }
});


const initialState = {
    role:'',
    isLogin: false,
    userId: '',
    adminId:'',
    isLoading: false,
}

const authSlice = createSlice({
 name:'auth',
 initialState,
 reducers:{
    chooseUser(state, action) {
        state.userId = action.payload;
    },
    saveAuth(state, action){
        state.role = action.payload.role || '';
        state.adminId = action.payload.adminId || '';
        state.userId = action.payload.userId || '';
        state.isLogin = action.payload.isLogin || false;
    }
 },
 extraReducers: (builder)=>{
    builder.addCase(login.fulfilled,(state,action)=>{
        state.role = action.payload.role || '';
        state.userId = action.payload.userId || '';
        state.adminId = action.payload.adminId || '';
        state.isLogin = true;
        state.isLoading = false;
    })

    builder.addCase(logout.fulfilled,(state)=>{
        state.role = '';
        state.isLogin = false;
        state.userId = '';
        state.adminId = '';
        state.errorMessage = '';
        state.isLoading = false
    });

    builder.addMatcher(isAnyOf(login.rejected, logout.rejected),(state)=>{
        state.isLoading = false;
    })

    builder.addMatcher(isAnyOf(login.pending,logout.pending),(state)=>{
        state.isLoading = true;
    })
 }
});
export const {saveAuth,chooseUser} = authSlice.actions;
export default authSlice.reducer;