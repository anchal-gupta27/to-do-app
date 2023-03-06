import "../Assets/css/DeleteModal.css"
import { List } from "../Interfaces";
import baseURL from "../requests/BaseURL";
import endpoints from '../requests/EndPoints';

interface Props {
    list: List;
    onClose: Function
    show: boolean
    listDeleted: Function
}



const DeleteModal = ({ list, onClose, show, listDeleted }: Props) => {

    if (!show) {
        return null
    }

    const deleteList = async () => {
        try {
            await baseURL.delete(endpoints.lists + "/" + list.id)
            listDeleted()
            onClose()

        } catch (error) {

        }
    }


    return <div className="delete-modal">
        <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-header">
                <div className="delete-modal-title">
                    Delete the To-do list? {list.name}
                </div>

            </div>
            <div className="delete-modal-footer">
                <div className="d-flex justify-content-between">
                    <button onClick={() => deleteList()}>Yes</button>
                    <button onClick={() => onClose()}>close</button>
                </div>

            </div>

        </div>

    </div>
}

export default DeleteModal