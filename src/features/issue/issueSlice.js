import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { format } from 'date-fns'
import { toast } from 'react-toastify'

const initialState = {
  data: [],
  status: 'idle',
  error: null,
}

const GITHUB_URL = 'https://api.github.com/repos/canopus-m-satoshi/redux-api-github-viewer/issues'

// 非同期処理
export const fetchIssueData = createAsyncThunk('fetch/issue', async () => {
  try {
    const response = await axios.get(`${GITHUB_URL}?state=all`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
    return response.data
  } catch (error) {
    throw new Error(error)
  }
})

// issue の更新
export const updateIssue = createAsyncThunk('update/issue', async (issue) => {
  try {
    const response = await axios({
      method: 'patch',
      url: `${GITHUB_URL}/${issue.number}`,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
      data: {
        title: issue.title,
        body: issue.body,
        state: issue.state,
      },
    })

    return response
  } catch (error) {
    throw new Error(error)
  }
})

export const closeIssue = createAsyncThunk('close/issue', async (checkedItems) => {
  try {
    const responses = []
    for (let i = 0; i < checkedItems.length; i++) {
      const checkedItem = checkedItems[i]
      const response = await axios({
        method: 'patch',
        url: `${GITHUB_URL}/${checkedItem}`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
        data: {
          state: 'close',
        },
      })

      // return response
      responses.push(response)
    }

    return responses
  } catch (error) {
    throw new Error(error)
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
  reducers: {
    create: (state, action) => {
      const today = format(new Date(), 'MM-dd-yyyy')

      state.data.push({
        id: state.data.length + 1,
        state: action.payload.state,
        title: action.payload.title,
        body: action.payload.body,
        createdDate: today,
        updatedDate: today,
      })
    },
    remove: (state, action) => {
      const checkedIDs = action.payload.map(Number)
      state.data = state.data.filter((item) => !checkedIDs.includes(item.id))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssueData.pending, (state) => {
        handleLoadingState(state, null, 'pending')
      })
      .addCase(fetchIssueData.fulfilled, (state, action) => {
        handleLoadingState(state, action, 'fulfilled')

        const formatDate = action.payload.map((item) => ({
          ...item,
          created_at: format(new Date(item.created_at), 'MM-dd-yyyy'),
          updated_at: format(new Date(item.updated_at), 'MM-dd-yyyy'),
        }))

        state.data = formatDate
      })
      .addCase(fetchIssueData.rejected, (state, action) => {
        handleLoadingState(state, action, 'rejected')
      })
      .addCase(updateIssue.pending, (state) => {
        handleLoadingState(state, null, 'pending')
      })
      .addCase(updateIssue.fulfilled, (state, action) => {
        handleLoadingState(state, action, 'fulfilled')

        const index = state.data.findIndex((item) => item.id === action.payload.data.id)

        if (index !== -1) {
          const today = format(new Date(), 'MM-dd-yyyy')
          if (
            state.data[index].title !== action.payload.data.title ||
            state.data[index].state !== action.payload.data.state ||
            state.data[index].body !== action.payload.data.body
          ) {
            state.data[index].title = action.payload.data.title
            state.data[index].state = action.payload.data.state
            state.data[index].body = action.payload.data.body
            state.data[index].updatedDate = today
            toast.success('Successfully updated!', {
              autoClose: 4500,
              position: 'bottom-right',
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
        }
      })
      .addCase(updateIssue.rejected, (state, action) => {
        handleLoadingState(state, action, 'rejected')
      })
  },
})

export const { create, update, remove } = issueSlice.actions

export default issueSlice.reducer
