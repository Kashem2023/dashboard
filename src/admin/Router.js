import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './Components/Sidebar.js'
import AdminHome from './Pages/AdminHome.js'
import AdminLogin from './Pages/AdminLogin.js'
import AllProducts from './Pages/AllProducts.js'
import AllUsers from './Pages/AllUsers.js'
import CreateProduct from './Pages/CreateProduct.js'
import Orders from './Pages/Orders.js'
import Payment from './Pages/Payment.js'
import SingleOrder from './Pages/SingleOrder.js'
import Spinner from './Components/Spinner.js'
import AddLogo from './Pages/AddLogo.js'
import AddCatergories from './Pages/AddCatergories.js'
import { GoThreeBars } from 'react-icons/go';



const Router = () => {

    const [login, setLogin] = useState(null)
    const [loading, setLoading] = useState(null)


    useEffect(() => {
        setLoading(true)
        const token = document.cookie.includes('token')
        setLogin(token)
        setLoading(false)
    }, [])


    return (
        <React.Fragment>
            {
                loading ? <Spinner /> :
                    login ?
                        <div className='flex'>
                            <Sidebar />
                            <Routes>
                                <Route path="/" element={<AdminHome />} />
                                <Route path='/orders' element={<Orders />} />
                                <Route path='/order/:id' element={<SingleOrder />} />
                                <Route path='/users' element={<AllUsers />} />
                                <Route path='/product' element={<AllProducts />} />
                                <Route path='/catergories' element={<AddCatergories />} />
                                <Route path='/add-logo' element={<AddLogo />} />
                                <Route path='/create-product' element={<CreateProduct />} />
                                <Route path='/Payment' element={<Payment />} />
                            </Routes>
                        </div> :
                        <Routes>
                            <Route path="/" element={<AdminLogin />} />
                        </Routes>
            }
        </React.Fragment>
    )
}

export default Router