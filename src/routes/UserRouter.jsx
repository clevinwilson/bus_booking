import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';

function UserRouter() {
    return (
        <Routes>
            <Route  path='/' element={<Home/>} />

        </Routes>
    )
}

export default UserRouter