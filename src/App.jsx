import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import UserRouter from './routes/UserRouter';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* User Router */}
        <Route path={'/*'} element={<UserRouter />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App
