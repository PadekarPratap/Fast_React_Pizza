import { useDispatch, useSelector } from 'react-redux';
import { currencyUnit } from '../../utils/currency';
import { addItem } from '../../features/cart/cartSlice';
import DeleteItemButton from '../ui/DeleteItemButton';
import UpdateCartItem from '../ui/UpdateCartItem';

const MenuItem = ({ pizza }) => {
  const dispatch = useDispatch();

  const { imageUrl, ingredients, name, soldOut, unitPrice, id } = pizza;

  const isItemInCart = useSelector((state) =>
    state.cart.cart.find((item) => item.pizzaId === id),
  );

  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  };

  return (
    <li className="flex flex-col items-center gap-4 py-4 sm:flex-row sm:items-stretch">
      <img
        src={imageUrl}
        alt={`${name} pizza`}
        className={`w-56 rounded-md ${soldOut ? 'grayscale' : ''}`}
      />
      <div className="flex w-full grow flex-col py-2 text-center sm:text-left">
        <h3 className="mb-3 text-2xl font-medium">{name}</h3>
        <p className="text-lg capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <p
            className={`self-center text-xl font-bold sm:self-stretch ${
              soldOut ? 'text-gray-500' : ''
            }`}
          >
            {soldOut ? 'Sold out' : currencyUnit(unitPrice, 'EUR')}
          </p>

          <div className="flex items-center gap-4">
            {isItemInCart && <UpdateCartItem pizzaId={id} />}

            {isItemInCart ? (
              <DeleteItemButton pizzaId={id} />
            ) : (
              <button
                disabled={soldOut}
                className="btn-primary self-center px-3 py-2 text-sm sm:self-stretch"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};
export default MenuItem;
