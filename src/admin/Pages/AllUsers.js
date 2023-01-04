import { endPoint } from '../data'
import {
    Card,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    Title,
} from "@tremor/react";
import { useEffect, useState } from "react";
import { AiFillDelete } from 'react-icons/ai';
import Spinner from '../Components/Spinner';


export default function AllUsers() {

    const [allUser, setAllUser] = useState(null)
    const [loading, setLoading] = useState(null)

    const getAllUser = async () => {

        setLoading(true)

        const res = await fetch(`${endPoint}/api/admin/users`, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })

        const resData = await res.json()

        setAllUser(resData.users);

        setLoading(false)
    }

    useEffect(() => {
        getAllUser()
    }, [])


    return (



        <Card>
            <Title>List of the all users</Title>

            {
                loading ? <Spinner /> :


                    <Table marginTop="mt-5">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell>
                                    image
                                </TableHeaderCell>
                                <TableHeaderCell>
                                    Name
                                </TableHeaderCell>
                                <TableHeaderCell>
                                    e-mail
                                </TableHeaderCell>
                                <TableHeaderCell>
                                    Contact Number
                                </TableHeaderCell>
                                <TableHeaderCell>
                                    role
                                </TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allUser?.map((item) => (
                                <TableRow key={item?.name}>
                                    <div className="w-10 h-10 bg-[#F0B12B] flex justify-center items-center rounded-full mt-[6px]">
                                        <span className="text-black font-bold">{item.name.charAt(0)[0]}</span>
                                    </div>
                                    <TableCell>
                                        {item?.name}
                                    </TableCell>
                                    <TableCell>
                                        <Text>{item?.email}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{item?.telephone}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text>{item?.role}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <AiFillDelete size={20} color="#F0B12B" className="cursor-pointer" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
            }
        </Card>
    )
}


