import { Route, Routes } from 'react-router-dom'
import Top from './pages/Top'
import Profile from './pages/Profile'
import Issue from './pages/Issue'
import PullRequest from './pages/PullRequest'
import Header from './components/organisms/Header'
import Container from './container/Container'
import ModalWrapper from './components/organisms/ModalWrapper'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.min.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/issue" element={<Issue />} />
          <Route path="/pull-request" element={<PullRequest />} />
        </Routes>
      </Container>
      <ToastContainer />
      <ModalWrapper />
    </div>
  )
}

export default App
