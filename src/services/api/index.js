import axios from 'axios'

const GITHUB_URL = 'https://api.github.com'
const ISSUES_URL = '/repos/canopus-m-satoshi/redux-api-github-viewer/issues'

const instance = axios.create({
  baseURL: GITHUB_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
})

export const fetchIssues = (params) => {
  return instance.get(`${ISSUES_URL}?${params}`)
}

export const createIssue = (data) => {
  return instance.post(`${ISSUES_URL}`, data)
}

export const updateIssue = (id, data) => {
  return instance.patch(`${ISSUES_URL}/${id}`, data)
}

export const fetchUser = () => {
  return instance.get(`/users/canopus-m-satoshi`)
}
