import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'

import * as api from '../../services/api'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

const today = format(new Date(), 'MM-dd-yyyy')

// 非同期処理
export const fetchIssueData = createAsyncThunk('fetch/issue', async () => {
  const response = await api.fetchIssues('state=all')

  return response.data
})

export const createIssue = createAsyncThunk('create/issue', async ({ title, body }) => {
  const response = await api.createIssue({
    title,
    body,
  })

  return response.data
})

// issue の更新
export const updateIssue = createAsyncThunk('update/issue', async ({ title, body, state, number }) => {
  const response = await api.updateIssue(number, {
    title,
    body,
    state,
  })

  return response
})

export const closeIssue = createAsyncThunk('close/issue', async (checkedItems) => {
  const responses = await Promise.all(
    checkedItems.map((checkedItem) => {
      return api.updateIssue(checkedItem, { state: 'close' })
    }),
  )

  const messages = responses.reduce((acc, item) => {
    // FIXME: id ごとの結果のメッセージを返す
    return acc
  }, {})

  return {
    reponses: responses,
    messages,
  }
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

export const issueSlice = createSlice({
  name: 'issue',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchIssueData.pending, (state) => {
        handleLoadingState(state, null, 'pending')
      })
      .addCase(fetchIssueData.fulfilled, (state, action) => {
        handleLoadingState(state, action, 'fulfilled')

        const formatDate = action.payload.map((item) => ({
          ...item,
          createdAt: format(new Date(item.created_at), 'MM-dd-yyyy'),
          updatedAt: format(new Date(item.updated_at), 'MM-dd-yyyy'),
        }))

        state.data = formatDate
      })
      .addCase(fetchIssueData.rejected, (state, action) => {
        handleLoadingState(state, action, 'rejected')
      })
      .addCase(createIssue.pending, (state) => {
        handleLoadingState(state, null, 'pending')
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        handleLoadingState(state, action, 'fulfilled')

        state.data.unshift({
          title: action.payload.title,
          body: action.payload.body,
          state: 'open',
          user: { login: action.payload.user.login },
          id: action.payload.id,
          createdAt: today,
          updatedAt: today,
        })
      })
      .addCase(createIssue.rejected, (state, action) => {
        handleLoadingState(state, action, 'rejected')
      })
      .addCase(updateIssue.pending, (state) => {
        handleLoadingState(state, null, 'pending')
      })
      .addCase(updateIssue.fulfilled, (state, action) => {
        handleLoadingState(state, action, 'fulfilled')

        const index = state.data.findIndex((item) => item.id === action.payload.data.id)

        if (index !== -1) {
          if (
            state.data[index].title !== action.payload.data.title ||
            state.data[index].state !== action.payload.data.state ||
            state.data[index].body !== action.payload.data.body
          ) {
            state.data[index].title = action.payload.data.title
            state.data[index].state = action.payload.data.state
            state.data[index].body = action.payload.data.body
            state.data[index].updatedDate = today
          }
        }
      })
      .addCase(updateIssue.rejected, (state, action) => {
        handleLoadingState(state, action, 'rejected')
      })
      .addCase(closeIssue.pending, (state) => {
        handleLoadingState(state, null, 'pending')
      })
      .addCase(closeIssue.fulfilled, (state, action) => {
        handleLoadingState(state, action, 'fulfilled')

        const closedDatas = action.payload

        closedDatas.forEach((closedData) => {
          const index = state.data.findIndex((item) => item.id === closedData.data.id)

          if (index !== -1) {
            state.data[index].state = 'closed'
            state.data[index].updatedDate = today
          }
        })
      })
      .addCase(closeIssue.rejected, (state, action) => {
        handleLoadingState(state, action, 'rejected')
      })
  },
})

export const { create, update, remove } = issueSlice.actions

export default issueSlice.reducer
