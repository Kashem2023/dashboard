import React, { useState } from 'react'
import { endPoint } from '../data'

const AdminLogin = () => {


    const [logData, setLogData] = useState({
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setLogData({
            ...logData,
            [e.target.name]: e.target.value
        })
    }

    function setCookie(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    const Login = async (e) => {

        e.preventDefault();

        const res = await fetch(`${endPoint}/api/admin/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(logData)
        })

        const resData = await res.json()

        if (resData.success === false) {
            return alert(resData.message)
        } else {
            setCookie('token', resData.token, 1)
            window.location.reload();
        }

    }

    return (
        <div className='login'>
            <div className="container">
                <form onSubmit={Login}>
                    <div className="title">Login</div>
                    <div className="input-box underline">
                        <input type="email" onChange={inputHandle} name="email" value={setLogData.email} placeholder="Enter Your Email" required />
                        <div className="underline" />
                    </div>
                    <div className="input-box">
                        <input type="password" onChange={inputHandle} name="password" value={setLogData.password} placeholder="Enter Your Password" required />
                        <div className="underline" />
                    </div>
                    <div className="input-box button">
                        <input type="submit" className='submit' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin