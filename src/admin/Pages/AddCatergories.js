import React, { useEffect, useState } from 'react'
import { endPoint } from '../data'
import Spinner from '../Components/Spinner';
import { AiFillDelete } from 'react-icons/ai';

const AddCatergories = () => {

    const [text, setText] = useState()
    const [categories, setCategories] = useState()
    const [loading, setLoading] = useState(null)


    const getCategories = async () => {

        setLoading(true)

        const res = await fetch(`${endPoint}/api/getCategories`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })

        const resData = await res.json()

        setCategories(resData?.categories);

        setLoading(false)

    }

    useEffect(() => {
        getCategories()
    }, [])


    const handleClick = async (e) => {

        setLoading(true)

        const res = await fetch(`${endPoint}/api/addCategories`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: text })
        })

        const resData = await res.json()

        setLoading(false)

        getCategories()

    }

    const handleCategoriesDelete = async (id) => {

        setLoading(true)

        const res = await fetch(`${endPoint}/api/delCategories`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        })

        const resData = await res.json()

        setLoading(false)

        getCategories()

    }

    return (
        <div className='w-[1000px] flex justify-center flex-col items-center'>
            <div>
                <h1 className='text-3xl bold my-5'>All Catergories</h1>
            </div>

            {
                loading ? <Spinner /> : <>

                    <div className='my-8 flex flex-wrap'>

                        {
                            categories?.map((data) => (
                                <div key={data?._id} className='bg-[#F0B12B] rounded-lg p-3 m-3 flex'>
                                    <h1>{data?.Cdata}</h1>
                                    <AiFillDelete size={20} color="#0009" className="cursor-pointer ml-20" onClick={() => {handleCategoriesDelete(data?._id)}} />
                                </div>
                            ))
                        }

                    </div>
                    <input type="text" placeholder='add catergories' className='border outline-none px-2 py-4 border-black w-[250px]' onChange={(e) => setText(e.target.value)} />
                    <button type='submit' onClick={handleClick} className='border px-4 py-2 my-3 rounded-lg mx-auto text-xl bg-[#F0B12B]'>add catergories</button>
                </>
            }
        </div>
    )
}

export default AddCatergories