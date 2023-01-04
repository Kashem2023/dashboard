import { endPoint } from '../data'
import {
    Card,
    Table,
    TableRow,
    TableCell,
    TableBody,
    BadgeDelta,
} from '@tremor/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Spinner from '../Components/Spinner';



export default function Orders() {

    const [allOrder, setAllOrder] = useState(null)
    const [loading, setLoading] = useState(null)

    const getAllUser = async () => {

        setLoading(true)

        const res = await fetch(`${endPoint}/api/admin/orders/me`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })

        const resData = await res.json()

        setAllOrder(resData?.orders);
        setLoading(false)
    }

    useEffect(() => {
        getAllUser()
    }, [])


    return (
        <Card>
            <h1 className='py-5 text-[24px] font-semibold'>List Of The Orders. Please, Click to get full Details</h1>
            <Table>

                {
                    loading ? <Spinner /> :


                        <TableBody>
                            {allOrder?.map((item) => (
                                <TableRow key={item}>
                                    <Link to={`/order/${item?._id}`}>
                                        <TableCell>{item?.billingAdress?.firstName} {item?.billingAdress?.lastName}</TableCell>
                                        <TableCell textAlignment="text-right">{item?.billingAdress?.number}</TableCell>
                                        <TableCell textAlignment="text-right">{item?.billingAdress?.city}</TableCell>
                                        <TableCell textAlignment="text-right">${item?.totalPrice}</TableCell>
                                        <TableCell textAlignment="text-right">{item?.orderStatus}</TableCell>
                                        <TableCell textAlignment="text-right">
                                            <BadgeDelta deltaType={item.deltaType} text={item.delta} size="xs" />
                                        </TableCell>
                                    </Link>
                                </TableRow>

                            ))}
                        </TableBody>
                }
            </Table>
        </Card>
    );
}