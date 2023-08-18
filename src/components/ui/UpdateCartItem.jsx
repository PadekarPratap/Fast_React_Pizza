import { useDispatch, useSelector } from 'react-redux';
import {
  decreaseItemQty,
  increaseItemQty,
} from '../../features/cart/cartSlice';

const UpdateCartItem = ({ pizzaId }) => {
  const currentItem = useSelector((state) =>
    state.cart.cart.find((item) => item.pizzaId === pizzaId),
  );

  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <button
        onClick={() => dispatch(decreaseItemQty(pizzaId))}
        className="btn-primary px-3.5 py-2 text-sm"
      >
        -
      </button>
      <span>{currentItem.quantity}</span>
      <button
        onClick={() => dispatch(increaseItemQty(pizzaId))}
        className="btn-primary px-3.5 py-2 text-sm"
      >
        +
      </button>
    </div>
  );
};
export default UpdateCartItem;
