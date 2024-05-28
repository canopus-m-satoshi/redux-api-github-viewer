import { configureStore } from '@reduxjs/toolkit'
import toggleTabReducer from './features/toggleTabSlice'
import uiReducer from './features/ui/uiSlice'
import issueReducer from './features/issue/issueSlice'
import userReducer from './features/user/userSlice'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['ui/push', 'update/issue/fulfilled', 'close/issue/fulfilled'],
        ignoredPaths: ['ui.modal.stack'],
      },
    }),
  reducer: {
    toggleTab: toggleTabReducer,
    ui: uiReducer,
    issue: issueReducer,
    user: userReducer,
  },
})
