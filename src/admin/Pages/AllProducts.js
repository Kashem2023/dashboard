import { endPoint } from '../data'
import {
    Card,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableBody,
    BadgeDelta,
} from '@tremor/react';
import { useEffect, useState } from 'react';
import Spinner from '../Components/Spinner';



export default function AllProducts() {

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(null)


    const getAllProduct = async () => {

        setLoading(true)

        const res = await fetch(`${endPoint}/api/getAllProduct`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })

        const resData = await res.json()

        setProduct(resData.products);

        setLoading(false)
    }

    useEffect(() => {
        getAllProduct()
    }, [])


    return (
        <Card>

            {
                loading ? <Spinner /> :

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell> image </TableHeaderCell>
                                <TableHeaderCell> Name </TableHeaderCell>
                                <TableHeaderCell textAlignment="text-right"> price </TableHeaderCell>
                                <TableHeaderCell textAlignment="text-right"> oldPrice ($) </TableHeaderCell>
                                <TableHeaderCell textAlignment="text-right"> Stock ($) </TableHeaderCell>
                                <TableHeaderCell textAlignment="text-right"> Status </TableHeaderCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {product?.map((item) => (
                                <TableRow key={item.name}>
                                    <img src={item.selectedFile[0].base64} className="w-[50px] h-[50px] rounded-full" />
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell textAlignment="text-right">{item.price}</TableCell>
                                    <TableCell textAlignment="text-right">{item.oldPrice}</TableCell>
                                    <TableCell textAlignment="text-right">{item.Stock}</TableCell>
                                    <TableCell textAlignment="text-right">
                                        <BadgeDelta deltaType={item.deltaType} text={item.delta} size="xs" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            }
        </Card>
    );
}