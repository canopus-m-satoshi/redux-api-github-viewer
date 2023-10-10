import { Route, Routes } from 'react-router-dom'
import Top from './pages/Top'
import Profile from './pages/Profile'
import Issue from './pages/Issue'
import PullRequest from './pages/PullRequest'
import Header from './components/organisms/Header'
import Container from './container/Container'
import ModalWrapper from './components/organisms/ModalWrapper'

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
      <ModalWrapper />
    </div>
  )
}

export default App
