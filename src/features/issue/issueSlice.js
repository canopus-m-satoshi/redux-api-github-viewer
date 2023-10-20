import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { format } from 'date-fns'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

// 非同期処理
export const fetchIssueData = createAsyncThunk('issue/', async () => {
  try {
    const response = await axios.get('https://api.github.com/repos/canopus-m-satoshi/redux-api-github-viewer/issues', {
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
        status: Number(action.payload.status),
        title: action.payload.title,
        description: action.payload.description,
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
          state.data[index].status !== action.payload.status ||
          state.data[index].description !== action.payload.description
        ) {
          state.data[index].title = action.payload.title
          state.data[index].status = Number(action.payload.status)
          state.data[index].description = action.payload.description
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
