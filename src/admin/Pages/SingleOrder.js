import { endPoint } from '../data'
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import {
    Card,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody
} from '@tremor/react';
import Spinner from '../Components/Spinner';


const SingleOrder = () => {

    let { id } = useParams();

    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(null)

    const getSingleOrder = async () => {

        setLoading(true)

        const res = await fetch(`${endPoint}/api/order/${id}`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })

        const resData = await res.json()

        setOrder(resData?.order);

        setLoading(false)
    }

    useEffect(() => {

        getSingleOrder()

    }, [])

    return (
        <React.Fragment>
            {
                loading ? <div className='ml-20'><Spinner /></div> :
                    <div className='my-5'>
                        <div className='ml-5 mt-5'>
                            <h1 className='text-center text-2xl font-semibold pb-2 mt-3'>User Details</h1>
                            <p className='text-xl'><span className='text-red-700'>Name:</span> {order?.billingAdress?.firstName} {order?.billingAdress?.lastName}</p>
                            <br />
                            <p className='text-xl'><span className='text-red-700'>Email:</span> {order?.billingAdress?.email}</p>
                            <br />
                            <p className='text-xl'><span className='text-red-700'>Mobile:</span> {order?.billingAdress?.number}</p>
                            <br />
                            <p className='text-xl'><span className='text-red-700'>Country:</span> {order?.billingAdress?.country}</p>
                            <br />
                            <p className='text-xl'><span className='text-red-700'>City:</span> {order?.billingAdress?.city}</p>
                            <br />
                            <p className='text-xl'><span className='text-red-700'>Adress:</span> {order?.billingAdress?.firstAdress} {order?.billingAdress?.lastAdress}</p>
                            <br />
                            <p className='text-xl'><span className='text-red-700'>Zip Code:</span> {order?.billingAdress?.postalCode}</p>
                            <br />
                            <p className='text-xl'><span className='text-red-700'>Total Price:</span> ${order?.totalPrice}</p>
                            <br />
                            <p className='text-xl'><span className='text-red-700'>Payment Method:</span> {order?.method}</p>
                        </div>
                        <div className='ml-5 mt-5'>
                            <h1 className='text-center text-2xl font-semibold pb-2 mt-3'>Product Details</h1>
                            <Card>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableHeaderCell> image </TableHeaderCell>
                                            <TableHeaderCell> Name </TableHeaderCell>
                                            <TableHeaderCell textAlignment="text-right"> price </TableHeaderCell>
                                            <TableHeaderCell textAlignment="text-right"> quantity </TableHeaderCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {order?.orderItems?.map((item) => (
                                            <TableRow key={item.name}>
                                                <img src={item.selectedFile[0].base64} className="w-[50px] h-[50px] rounded-full" />
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell textAlignment="text-right">{item.price}</TableCell>
                                                <TableCell textAlignment="text-right">{item.quantity}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        </div>
                    </div>
            }
        </React.Fragment>

    )
}

export default SingleOrder