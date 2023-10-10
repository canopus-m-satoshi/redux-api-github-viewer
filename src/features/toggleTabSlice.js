import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isShow: false,
}

export const toggleTabSlice = createSlice({
  name: 'toggleTab',
  initialState,
  reducers: {
    toggleTab: (state, action) => {
      // state.isShow = action.payload
      state.isShow = !state.isShow
    },
  },
})

export const { toggleTab } = toggleTabSlice.actions

export default toggleTabSlice.reducer
