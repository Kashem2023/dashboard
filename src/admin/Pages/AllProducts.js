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
import { AiFillDelete } from 'react-icons/ai';



export default function AllProducts() {

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(null)
    const [delId, setDelId] = useState(null)


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


    const handleProductDelete = async (id) => {

        setLoading(true)

        const res = await fetch(`${endPoint}/api/products/delete`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({id: id})
        })

        const reponse = await res.json()

        setLoading(false)

        if(reponse.success === true){
            getAllProduct()
        }
    }



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
                                    <TableCell>
                                        <AiFillDelete size={20} color="#F0B12B" className="cursor-pointer ml-20" onClick={() => {handleProductDelete(item._id)}} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            }
        </Card>
    );
}