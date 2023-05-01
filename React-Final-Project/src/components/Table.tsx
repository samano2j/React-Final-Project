import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import TableItem from "./TableItem"
import Form from "./Form"
import { useState } from "react"
import { getData } from "../redux/middleware/api"

const Table = () => {
    const [showForm, setShowForm] = useState(false)
    const tableItem = useSelector((state) => state.tableData.data)
    const dispatch = useDispatch()

    const [ascTitle, setAscTitle] = useState(true)
    const [ascId, setAscId] = useState(true)
    const [ascState, setAscState] = useState(true)
    const [ascUrl, setAscUrl] = useState(true)
    const [ascCreatedAt, setAscCreatedAt] = useState(true)
    const [ascUpdatedAt, setAscUpdatedAt] = useState(true)

    const handleChange = (e) => {
        dispatch(getData({mode:'filter', value:e.target.value}))
    }

    const sortTitle = () => {
        dispatch(getData({mode:'title', value:ascTitle}))
        ascTitle ? setAscTitle(false) : setAscTitle(true)
    }

    const sortId = () => {
        dispatch(getData({mode:'id', value:ascId}))
        ascId ? setAscId(false) : setAscId(true)
    }

    const sortState = () => {
        dispatch(getData({mode:'state', value:ascState}))
        ascState ? setAscState(false) : setAscState(true)
    }

    const sortUrl = () => {
        dispatch(getData({mode:'url', value:ascUrl}))
        ascUrl ? setAscUrl(false) : setAscUrl(true)
    }

    const sortCreatedAt = () => {
        dispatch(getData({mode:'createdAt', value:ascCreatedAt}))
        ascCreatedAt ? setAscCreatedAt(false) : setAscCreatedAt(true)
    }

    const sortUpdatedAt = () => {
        dispatch(getData({mode:'updatedAt', value:ascUpdatedAt}))
        ascUpdatedAt ? setAscUpdatedAt(false) : setAscUpdatedAt(true)
    }

    return (
        <div className="p-5">
            <div>
                <input
                    type='text'
                    placeholder='Filter issues'
                    className="w-full border-solid border-b-2 focus:outline-none"
                    onChange={handleChange}
                />
            </div>
            <div>
                <table className="w-full mt-7 table-fixed break-all">
                    <thead className="text-gray-400 text-left">
                        <tr>
                        <td className="p-2 cursor-pointer hidden sm:table-cell" onClick={sortId}>Id</td>
                        <td className="p-2 cursor-pointer" onClick={sortTitle}>Title</td>
                        <td className="p-2 cursor-pointer" onClick={sortState}>State</td>
                        <td className="p-2 cursor-pointer hidden sm:table-cell" onClick={sortUrl}>Url</td>
                        <td className="p-2 cursor-pointer hidden sm:table-cell" onClick={sortCreatedAt}>Created at</td>
                        <td className="p-2 cursor-pointer hidden sm:table-cell" onClick={sortUpdatedAt}>Updated at</td>
                        <td className="p-2"><FontAwesomeIcon 
                        className="text-blue-900 text-xl cursor-pointer"
                        onClick={()=>setShowForm(true)}
                        icon={faPlus} /></td>
                        </tr>
                    </thead>
                    {tableItem && tableItem.length > 0 && tableItem.map((data)=>(
                            <TableItem
                                key={data.Key}
                                data={data}
                            />
                    ))}
                </table>
                <Form openForm={showForm} closeForm={() => setShowForm(false)}/>
            </div>
        </div>
    )
}

export default Table