import { useDispatch } from "react-redux";
import { deleteItem } from "../../features/cart/cartSlice";


const DeleteItemButton = ({pizzaId}) => {

    const dispatch = useDispatch();
  return (
    <button
    onClick={() => dispatch(deleteItem(pizzaId))}
    className="btn-primary px-4 py-2 text-sm"
  >
    Delete
  </button>
  )
}
export default DeleteItemButton