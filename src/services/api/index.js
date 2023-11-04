import axios from 'axios'

const GITHUB_URL = 'https://api.github.com/repos/canopus-m-satoshi/redux-api-github-viewer'

const instance = axios.create({
  baseURL: GITHUB_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
})

export const fetchIssues = (params) => {
  return instance.get(`/issues?${params}`)
}

export const createIssue = (data) => {
  return instance.post(`/issues`, data)
}

export const updateIssue = (id, data) => {
  return instance.patch(`/issues/${id}`, data)
}

export const fetchUser = () => {
  return instance.get(`/`)
}
