import { endPoint } from '../data'
import {
    Card,
    ColGrid,
    Metric,
    Text,
} from '@tremor/react';
import { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import Spinner from '../Components/Spinner';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);



export default function AdminHome() {

    const [totalPrice, setTotalPrice] = useState(null)
    const [allUser, setAllUser] = useState(null)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(null)

    const getTotalPrice = async () => {

        setLoading(true)

        const res = await fetch(`${endPoint}/api/admin/orders/me`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })

        const resData = await res.json()

        setTotalPrice(resData?.totalAmount);
    }
    const getAllUser = async () => {
        const res = await fetch(`${endPoint}/api/admin/users`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })

        const resData = await res.json()

        setAllUser(resData?.users);
    }

    const getAllProduct = async () => {
        const res = await fetch(`${endPoint}/api/getAllProduct`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })

        const resData = await res.json()

        setProduct(resData?.products);
        setLoading(false)
    }

    useEffect(() => {
        getTotalPrice()
        getAllProduct()
        getAllUser()
    }, [])

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197, 72, 49)"],
                data: [0, totalPrice],
            },
        ],
    };


    return (
        <div className='max-w-[750px] mx-auto mt-10'>
            {
                loading ? <Spinner /> :

                    <div>
                        <ColGrid numColsSm={2} numColsLg={3} gapX="gap-x-6" gapY="gap-y-6">
                            <Card>
                                <Text>Sales</Text>
                                <Metric>${totalPrice}</Metric>
                            </Card>
                            <Card>
                                <Text>Product</Text>
                                <Metric>{product?.length}</Metric>
                            </Card>
                            <Card>
                                <Text>User</Text>
                                <Metric>{allUser?.length}</Metric>
                            </Card>

                        </ColGrid>
                        <div className="lineChart">
                            <Line data={lineState} />
                        </div>
                    </div>
            }
        </div>
    );
}