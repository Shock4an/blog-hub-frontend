import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
  const { data } = await axios.post('/auth/register', params);
  return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me',);
  return data
})


const initialState = {
  data: null,
  status: 'loading'
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      //Auth
      .addCase(fetchAuth.pending, (state) => {
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.data = action.payload

        // localStorage.setItem('userData', JSON.stringify(action.payload))
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = 'error'
        state.data = null
      })
      //AuthMe
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.data = action.payload

        // localStorage.setItem('userData', JSON.stringify(action.payload))
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = 'error'
        state.data = null
      })
      //Register
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading'
        state.data = null
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'loaded'
        state.data = action.payload
        
        // localStorage.setItem('userData', JSON.stringify(action.payload))
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = 'error'
        state.data = null
      })
  },
})

export const selectIsAuth = state => Boolean(state.auth.data)

console.log(state.auth.data)

export const _userId = 0;

// export const _userId = state => state.auth.data._id;

export const isMeLoading = state => state.status === 'loading'

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;