import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import BusDetailsPage from '../pages/Home/BusDetailsPage';

function UserRouter() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/details/:id' element={<BusDetailsPage />} />
        </Routes>
    )
}

export default UserRouter