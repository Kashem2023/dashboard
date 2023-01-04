import React from 'react'
import { Bars } from 'react-loader-spinner'

const Spinner = () => {
    return (
        <div className='flex justify-center items-center'>
            <Bars
                height="80"
                width="80"
                color="#F0B12B"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Spinner