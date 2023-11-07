import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import * as api from '../../services/api'

const initialState = {
  data: {},
}

export const fetchUserData = createAsyncThunk('fetch/user', async () => {
  const response = await api.fetchUser()

  return response.data
})

const handleLoadingState = (state, action = null, type) => {
  switch (type) {
    case 'pending':
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
      break

    case 'fulfilled':
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.entities.push(action.payload)
        state.currentRequestId = undefined
      }
      break

    case 'rejected':
      if (state.loading === 'pending') {
        state.loading = 'idle'
        state.error = action.error
      }
      break

    default:
      state.loading = 'pending'
      break
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        handleLoadingState(state, null, 'pending')
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        handleLoadingState(state, action, 'fulfilled')

        state.data = action.payload
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        handleLoadingState(state, action, 'rejected')
      })
  },
})

export default userSlice.reducer
