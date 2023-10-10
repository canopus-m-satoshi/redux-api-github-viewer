import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modal: {
    toggle: false,
    stack: [],
  },
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggle: (state) => {
      state.modal.toggle = !state.modal.toggle

      // modal閉じる時にスタックを空にする
      if (!state.modal.toggle) {
        state.modal.stack.pop()
      }
    },
    push: (state, action) => {
      state.modal.stack.push(action.payload)
    },
  },
})

export const { toggle, push } = uiSlice.actions

export default uiSlice.reducer
