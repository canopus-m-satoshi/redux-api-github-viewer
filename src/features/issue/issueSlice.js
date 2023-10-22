import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { format } from 'date-fns'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

const GITHUB_URL = 'https://api.github.com/repos/canopus-m-satoshi/redux-api-github-viewer/issues'

// 非同期処理
export const fetchIssueData = createAsyncThunk('fetch/issue', async () => {
  try {
    const response = await axios.get(GITHUB_URL, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
  }
})

export const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    create: (state, action) => {
      const today = format(new Date(), 'MM-dd-yyyy')

      state.data.push({
        id: state.data.length + 1,
        status: Number(action.payload.state),
        title: action.payload.title,
        body: action.payload.body,
        createdDate: today,
        updatedDate: today,
      })
    },
    update: (state, action) => {
      const index = state.data.findIndex((item) => item.id === action.payload.id)

      if (index !== -1) {
        const today = format(new Date(), 'MM-dd-yyyy')
        if (
          state.data[index].title !== action.payload.title ||
          state.data[index].status !== action.payload.state ||
          state.data[index].body !== action.payload.body
        ) {
          state.data[index].title = action.payload.title
          state.data[index].status = Number(action.payload.state)
          state.data[index].body = action.payload.body
          state.data[index].updatedDate = today
        }
      }
    },
    remove: (state, action) => {
      const checkedIDs = action.payload.map(Number)
      state.data = state.data.filter((item) => !checkedIDs.includes(item.id))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssueData.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      .addCase(fetchIssueData.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.entities.push(action.payload)
          state.currentRequestId = undefined
        }

        const formatDate = action.payload.map((item) => ({
          ...item,
          created_at: format(new Date(item.created_at), 'MM-dd-yyyy'),
          updated_at: format(new Date(item.updated_at), 'MM-dd-yyyy'),
        }))

        state.data = formatDate
        console.log('🚀 ~ file: issueSlice.js:84 ~ .addCase ~ formatDate:', formatDate)
      })
      .addCase(fetchIssueData.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.error
        }
      })
  },
})

export const { create, update, remove } = issueSlice.actions

export default issueSlice.reducer
