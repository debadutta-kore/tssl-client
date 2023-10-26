import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import request from "../../utilities/request";

export const fetchControl = createAsyncThunk('fetchControls', async (arg, thunkApi) => {
    try {
        const res = await request({
            url: '/account/user/details',
            method: 'GET'
        });
        if (res.ok) {
            const data = await res.json();
            return thunkApi.fulfillWithValue(data);
        } else {
            return thunkApi.rejectWithValue('Unable to fetch usecase');
        }
    } catch (err) {
        return thunkApi.rejectWithValue('Something went wrong');
    }
}, {
    condition(arg, { getState }) {
        const { control } = getState();
        if (!control.id && !control.isLoading) {
            return true;
        } else {
            return false;
        }
    }
});

export const updateAccess = createAsyncThunk('updateAccess', async (arg, thunkApi) => {
    try {
        const res = await request({
            url: '/account/user/access',
            method: 'PUT',
            data:{
                enable: arg.enable ? 1 : 0
            }
        });
        if (res.ok) {
            return thunkApi.fulfillWithValue();
        } else {
            return thunkApi.rejectWithValue('Unable to update the user access');
        }
    } catch (err) {
        return thunkApi.rejectWithValue('Something went wrong');
    }
},{
    condition(arg,{getState}){
        const {control} = getState();
        if(arg && typeof arg.enable !=='undefined' && !control.isLoading){
            return true;
        } else {
            return false;
        }
    }
});

const initialState = {
    isLoading: false
};

const control = createSlice({
    name: 'control',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchControl.fulfilled, (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.isLoading = false;
            state.enable = action.payload.enable;
        });
        builder.addCase(updateAccess.fulfilled, (state, action) => {
            state.isLoading = false;
            state.enable = action.meta.arg.enable ? 1 : 0;
        });
        builder.addMatcher(isAnyOf(fetchControl.pending, updateAccess.pending), (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(isAnyOf(fetchControl.rejected, fetchControl.rejected), (state) => {
            state.isLoading = false;
        });
    }
});

export default control.reducer;