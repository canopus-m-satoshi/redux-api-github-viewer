import { configureStore } from '@reduxjs/toolkit'
import toggleTabReducer from './features/toggleTabSlice'
import uiReducer from './features/ui/uiSlice'
import issueReducer from './features/issue/issueSlice'

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['ui/push'],
        ignoredPaths: ['ui.modal.stack'],
      },
    }),
  reducer: {
    toggleTab: toggleTabReducer,
    ui: uiReducer,
    issue: issueReducer,
  },
})
