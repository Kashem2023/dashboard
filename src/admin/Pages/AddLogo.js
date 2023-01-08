import React, { useEffect, useState } from 'react'
import { endPoint } from '../data'
import FileBase from 'react-file-base64';
import Spinner from '../Components/Spinner';

const AddLogo = () => {

    const [image, setImage] = useState()

    const [loading, setLoading] = useState(null)

    const [mainImage, setMainImage] = useState(false)

    const [Id, setId] = useState(false)

    const getLogo = async () => {

        setLoading(true)

        const res = await fetch(`${endPoint}/api/getlogo`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })

        const resData = await res.json()

        setMainImage(resData?.logo[0]?.selectedFile[0]);

        setId(resData.logo[0]?._id);

        setLoading(false)
    }

    useEffect(() => {
        getLogo()
    }, [])

    const handleClick = async () => {

        setLoading(true)

        const res = await fetch(`${endPoint}/api/addlogo`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ selectedFile: image?.selectedFile, id: Id })
        })

        const resData = await res.json()

        setLoading(false)

        console.log(resData);

        getLogo()
    }

    return (
        <div className='w-[1000px] flex justify-center flex-col items-center mt-16 md:mt-0'>
            {
                loading ? <Spinner /> :
                    <div>
                        <div className='border p-5 rounded-lg border-[4px]'>
                            {
                                mainImage ? <img src={mainImage?.base64} /> : "image not Found"
                            }

                        </div>
                        <div className='my-5'>
                            <FileBase type="file" multiple={true} onDone={(base64) => { setImage({ ...image, selectedFile: base64 }) }} required />
                        </div>
                        <button type='submit' onClick={handleClick} className='border px-4 py-2 my-3 rounded-lg mx-auto text-xl bg-[#F0B12B]'>Change Logo</button>
                    </div>
            }
        </div>
    )
}

export default AddLogo