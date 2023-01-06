import React from 'react'
import { endPoint } from '../data'
import { AiFillHome, AiOutlineUser, AiFillDatabase, AiFillEdit } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { MdSell } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';

const sideBar = [
    {
        id: 1,
        title: 'Home',
        link: '/',
        icons: <AiFillHome />
    },
    {
        id: 2,
        title: 'Orders',
        link: '/orders',
        icons: <MdSell />
    },
    {
        id: 3,
        title: 'Users',
        link: '/users',
        icons: <AiOutlineUser />
    },
    {
        id: 4,
        title: 'Product',
        link: '/product',
        icons: <AiFillDatabase />
    },
    {
        id: 4,
        title: 'Add Catergories',
        link: '/catergories',
        icons: <AiFillDatabase />
    },
    {
        id: 5,
        title: 'Add Logo',
        link: '/add-logo',
        icons: <AiFillEdit />
    },
    {
        id: 5,
        title: 'Create Product',
        link: '/create-product',
        icons: <AiFillEdit />
    },
    {
        id: 5,
        title: 'Payment',
        link: '/Payment',
        icons: <AiFillEdit />
    }
]

const Sidebar = () => {

    const navigate = useNavigate()

    let activeStyle = {
        backgroundColor: '#E3F5FD'
    };

    function removeCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }

    const logout = async () => {
        await fetch(`${endPoint}/api/admin/logout`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
        removeCookie("token");
        navigate('/')
        window.location.reload();
    }


    return (

        <div className="hidden md:flex flex-col h-screen p-3 bg-[#25AB44] sticky top-0 shadow w-60">
            <div className="space-y-3">
                <div className="flex items-center">
                    <h2 className="text-xl font-bold">Dashboard</h2>
                </div>
                <div className="flex-1">
                    <ul className="pt-2 pb-4 space-y-3 text-sm">

                        {
                            sideBar?.map((data) => (
                                <li key={data.id}>
                                    <NavLink
                                        to={`${data.link}`}
                                        style={({ isActive }) =>
                                            isActive ? activeStyle : { backgroundColor: "#25AB44" }
                                        }
                                        className="flex items-center p-2 space-x-3 rounded-md sideberhover text-[18px] text-[#262b25]"
                                    >
                                        {data.icons}
                                        <span className='text-[20px]'>{data.title}</span>
                                    </NavLink>
                                </li>
                            ))
                        }
                        <button onClick={logout} className="flex items-center p-2 space-x-3 rounded-md sideberhover text-[18px] text-[]">
                            <BiLogOut />
                            <span className='text-[20px]'>Logout</span>
                        </button>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Sidebar