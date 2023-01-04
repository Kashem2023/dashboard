import React, { useEffect, useState } from 'react'
import { endPoint } from '../data'

const Payment = () => {

    const [selectedValue, setSelectedValue] = useState('');
    const [Mid, setMid] = useState(null)

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const getMethod = async (e) => {
        const res = await fetch(`${endPoint}/api/get-method`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })

        const resData = await res.json()
        setSelectedValue(resData?.method[0].name);
        setMid(resData?.method[0]._id);
    }

    useEffect(() => {
        getMethod()
    }, [])

    const handleClick = async (e) => {
        e.preventDefault();

        const res = await fetch(`${endPoint}/api/set-method`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: Mid, name: selectedValue})
        })

        const resData = await res.json()
        console.log(resData);

        // window.location.reload();

    }


    return (
        <div className='max-w-[800px] mx-auto mt-5'>
            <div className='bg-[#F0B12B] rounded-lg pl-4 py-4'>
                <h1 className='text-center text-2xl font-semibold pb-3 mr-2'>Set Payment Method</h1>
                <h1 className=' text-xl font-semibold pb-3 mx-2'> Method: {selectedValue}</h1>
                <form onSubmit={handleClick}>
                    <label>
                        <input
                            type="radio"
                            value="Banking"
                            checked={selectedValue === 'Banking'}
                            onChange={handleChange}
                        />
                        <span className='pl-2'>Banking</span>
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            value="Stripe"
                            checked={selectedValue === 'Stripe'}
                            onChange={handleChange}
                        />
                        <span className='pl-2'>Stripe</span>
                    </label>
                    <br />
                    <br />
                    <button type='submit' className='border px-4 py-2 my-3 rounded-lg mx-auto text-xl'>Save</button>

                </form>
            </div>
        </div>
    )
}

export default Payment