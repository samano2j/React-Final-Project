import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotateRight } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { getData } from "../redux/middleware/api"

const Navbar = () => {
    const dispatch = useDispatch()

    return (
        <div className="bg-blue-800 flex justify-between items-center p-4 text-white text-xl">
            <h1>Angular 9 MatTable CRUD Example</h1>
            <div className="flex gap-3 items-center">
                <h1>Reload data: </h1>
                <FontAwesomeIcon 
                className="cursor-pointer"
                icon={faRotateRight}
                onClick={()=>dispatch(getData({mode:'normal'}))} />
            </div>
        </div>
    )
}
export default Navbar