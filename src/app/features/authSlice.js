import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import request from "../../utilities/request";
import { resetControl } from "./controlSlice";
import { resetUsecase } from "./usecaseSlice";
import { resetUsers } from "./usersSlice";

export const login = createAsyncThunk('login', async (arg, thunkApi) => {
    try {
        const res = await request(arg);
        if (res.ok) {
            const data = await res.json();
            return thunkApi.fulfillWithValue(data);
        } else if(res.status === 400) { 
            const data = await res.json();
            return thunkApi.rejectWithValue(data);
        }
    } catch (err) {
        return thunkApi.rejectWithValue('Internal Server Error');
    }
});

export const logout = createAsyncThunk('logout', async (arg, thunkApi) => {
    try {
        const res = await request({
            url: `/auth/logout`,
            method: 'DELETE'
        });
        if (res.ok) {
            thunkApi.dispatch(resetControl());
            thunkApi.dispatch(resetUsecase());
            thunkApi.dispatch(resetUsers());
            return thunkApi.fulfillWithValue()
        } else {
            return thunkApi.rejectWithValue('unable to logout');
        }
    } catch (err) {
        return thunkApi.rejectWithValue('something went wrong');
    }
}, {
    condition: (_, { getState }) => {
        const { auth } = getState();
        if (!auth.isLoading && auth.isLogin) {
            return true;
        } else {
            return false;
        }
    }
});

export const loginWithSession = createAsyncThunk('loginWithSession', async (arg, thunkApi) => {
    try {
        const res = await request({
            url: '/auth/session',
            method: 'GET'
        });
        if (res.ok) {
            const data = await res.json();
            return thunkApi.fulfillWithValue(data);
        } else {
            return thunkApi.rejectWithValue('Unauthorize user');
        }
    } catch (err) {
        return thunkApi.rejectWithValue('Internal Server Error');
    }
}, {
    condition(_, { getState }) {
        const { auth } = getState();
        if (!auth.isLogin && !auth.isLoading) {
            return true;
        } else {
            return false;
        }
    }
})

export const updateSession = createAsyncThunk('updateSession', async (userId, thunkApi) => {
    try {
        const res = await request({
            url: '/auth/session',
            method: 'PUT',
            data: { userId }
        });
        if (res.ok) {
            const data = await res.json();
            return thunkApi.fulfillWithValue(data);
        } else {
            return thunkApi.rejectWithValue('something went wrong');
        }
    } catch (err) {
        return thunkApi.rejectWithValue('something went wrong');
    }
}, {
    condition(arg, { getState }) {
        const { auth } = getState();
        if (arg && !auth.isLoading && !auth.choosedUser) {
            return true;
        } else {
            return false;
        }
    }
})

const initialState = {
    role: '',
    isLogin: false,
    isLoading: false,
    choosedUser: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        resetAuth(){
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.role = action.payload.role;
            state.isLogin = true;
            state.isLoading = false;
        })

        builder.addCase(logout.fulfilled, () => {
            return initialState;
        });

        builder.addCase(loginWithSession.fulfilled, (state, action) => {
            state.role = action.payload.role;
            state.isLoading = false;
            state.isLogin = true;
            if(action.payload.role === 'admin') {
                state.choosedUser = action.payload.isChoosedUser;
            }
        })

        builder.addCase(updateSession.fulfilled, (state) => {
            state.isLoading = false;
            state.choosedUser = true;
        })

        builder.addMatcher(isAnyOf(login.rejected, logout.rejected, loginWithSession.rejected, updateSession.rejected), (state) => {
            state.isLoading = false;
        })

        builder.addMatcher(isAnyOf(login.pending, logout.pending, loginWithSession.pending, updateSession.pending), (state) => {
            state.isLoading = true;
        })
    }
});

export const {resetAuth} = authSlice.actions;
export default authSlice.reducer;