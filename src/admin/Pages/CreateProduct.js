import { endPoint } from '../data'
import React, { useEffect, useState } from 'react'
import FileBase from 'react-file-base64';
import Spinner from '../Components/Spinner';


const CreateProduct = () => {

    const [product, setProduct] = useState({
        name: '',
        price: '',
        oldPrice: '',
        selectedC: '',
        Stock: '',
        Option: '',
        description: '',
        features: '',
        selectedFile: []
    })

    const [loading, setLoading] = useState(null)
    const [categories, setCategories] = useState()

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


    const inputHandle = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const CreateProduct = async (e) => {
        setLoading(true)

        e.preventDefault();

        product.Option = product.Option.split(',')

        const res = await fetch(`${endPoint}/api/createProduct`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })


        const resData = await res.json()
        setProduct({
            name: '',
            price: '',
            oldPrice: '',
            selectedC: '',
            Stock: '',
            Option: '',
            description: '',
            features: '',
            selectedFile: []
        })
        setLoading(false)
        console.log(resData);
    }


    return (

        <React.Fragment>
            {
                loading ?
                    <div className='mt-10 ml-20'>
                        <Spinner />
                    </div>
                    :
                    <div className='max-w-[800px] mx-auto mt-5 mb-5'>
                        <h1 className='text-center text-3xl font-semibold my-5'>Create a Single Product</h1>
                        <div className='mx-6 md:mx-0'>
                            <form onSubmit={CreateProduct} className='space-y-2'>
                                <div className="">
                                    <label>Product Name</label>
                                    <br />
                                    <input type="text" placeholder='Product Name' onChange={inputHandle} name="name" value={product.name} className='outline-none border-[1px] border-gray-300 w-[300px] md:w-[575px] h-[38px] pl-5 text-[14px] mt-2' required />
                                </div>
                                <div className="">
                                    <label>Price</label>
                                    <br />
                                    <input type="text" placeholder='Price' onChange={inputHandle} name="price" value={product.price} className='outline-none border-[1px] border-gray-300 w-[300px] md:w-[575px] h-[38px] pl-5 text-[14px] mt-2' required />
                                </div>
                                <div className="">
                                    <label>Old Price</label>
                                    <br />
                                    <input type="text" placeholder='Old Price' onChange={inputHandle} name="oldPrice" value={product.oldPrice} className='outline-none border-[1px] border-gray-300 w-[300px] md:w-[575px] h-[38px] pl-5 text-[14px] mt-2' />
                                </div>
                                <div className="">
                                    <label>Add Categories</label>
                                    <br />
                                    <select name="selectedC" onChange={inputHandle} value={product.selectedC} className="outline-none bg-transparent border px-4 py-2 rounded-lg mt-2 cursor-pointer">
                                        <option value="0" defaultValue>All Categories</option>
                                        {
                                            categories?.map((i) => (
                                                <option className="level-0" value={i?.Cdata}>{i?.Cdata}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="">
                                    <label>Stock</label>
                                    <br />
                                    <input type="text" placeholder='Stock' onChange={inputHandle} name="Stock" value={product.Stock} className='outline-none border-[1px] border-gray-300 w-[300px] md:w-[575px] h-[38px] pl-5 text-[14px] mt-2' required />
                                </div>
                                <div className="">
                                    <label>Available Option <span className='text-red-600'>(Must Be Comma separated)</span></label>
                                    <br />
                                    <input type="text" placeholder='Write a Available Option' onChange={inputHandle} name="Option" value={product.Option} className='outline-none border-[1px] border-gray-300 w-[300px] md:w-[575px] h-[38px] pl-5 text-[14px] mt-2' required />
                                </div>
                                <div className="">
                                    <label>Description</label>
                                    <br />
                                    <textarea type="text" rows="4" cols="50" placeholder='Write a product Description' onChange={inputHandle} name="description" value={product.description} className='outline-none border-[1px] border-gray-300 w-[300px] md:w-[575px] h-[38px] pl-5 text-[14px] mt-2' required ></textarea>
                                </div>
                                <div className="">
                                    <label>Features</label>
                                    <br />
                                    <textarea type="text" rows="4" cols="50" placeholder='Add a Product Features' onChange={inputHandle} name="features" value={product.features} className='outline-none border-[1px] border-gray-300 w-[300px] md:w-[575px] h-[38px] pl-5 text-[14px] mt-2' required ></textarea>
                                </div>
                                <div>
                                    <FileBase type="file" multiple={true} onDone={(base64) => setProduct({ ...product, selectedFile: base64 })} required />
                                </div>
                                <button className='w-[140px] h-[42px] bg-[#25AB44] text-white rounded-full mr-1 mt-4'>Create Product</button>
                            </form>
                        </div>
                    </div>
            }
        </React.Fragment>


    )
}

export default CreateProduct