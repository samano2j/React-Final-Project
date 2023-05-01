import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import config from "../config"
import { supabase } from "../lib/supabaseClient"
import { useDispatch } from "react-redux"
import { getData } from "../redux/middleware/api"
import { useState } from "react"
import Form from "./Form"

const TableItem = (data) => {
    const [showForm, setShowForm] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()

    const handleEdit = async () => {
        setShowModal(true)
        setShowForm(true)
    }

    const handleDelete = async () => {
        const { error } = await supabase
            .from(config.tableName)
            .delete()
            .eq('Key', data.data.Key)
        
        dispatch(getData({mode: 'normal'}))

    }

    return (
        <tbody>
            <tr className="border-solid border-y-2">
                <td className="p-2 hidden sm:table-cell">{data.data.Id}</td>
                <td className="p-2">{data.data.Title}</td>
                <td className="p-2">{data.data.State}</td>
                <td className="p-2 hidden sm:table-cell">{data.data.Url}</td>
                <td className="p-2 hidden sm:table-cell">{data.data.Created_at}</td>
                <td className="p-2 hidden sm:table-cell">{data.data.Updated_at}</td>
                <td className="align-middle p-2 text-xl text-pink-700">
                    <FontAwesomeIcon
                    className="cursor-pointer pr-10" 
                    icon={faPen}
                    onClick={handleEdit} />
                    <FontAwesomeIcon 
                    className="cursor-pointer" 
                    icon={faTrash}
                    onClick={handleDelete} />
                    {showModal && (
                    <Form dataField={data} openForm={showForm} closeForm={() => setShowForm(false)}/>)}
                </td>
            </tr>
        </tbody>
    )
}


export default TableItem
