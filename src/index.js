import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html {
    font-family: Lato, "Lucida Grande", "Lucida Sans Unicode", Tahoma, sans-serif;
    line-height: 1.5;
    font-size: 14px;
    padding: 0px;
    margin: 0px;
}

  body {
    margin: 0;
    padding: 0;
  }

    *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
)

reportWebVitals()
