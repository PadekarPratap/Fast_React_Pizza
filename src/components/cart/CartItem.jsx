import { currencyUnit } from '../../utils/currency';
import DeleteItemButton from '../ui/DeleteItemButton';
import UpdateCartItem from '../ui/UpdateCartItem';

const CartItem = ({ item, ingredients, isIngredientsLoading }) => {
  const { name, quantity, totalPrice, pizzaId } = item;

  // console.log(item);

  // console.log(ingredients);

  return (
    <li className="flex flex-col py-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-lg font-medium">
          {quantity}&times; {name}
        </h3>
        <p className="italic text-stone-500">
          {isIngredientsLoading ? 'Loading...' : ingredients?.join(', ')}
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <p className="text-sm font-bold">{currencyUnit(totalPrice, 'EUR')}</p>

        <div className="flex items-center gap-3">
          <UpdateCartItem pizzaId={pizzaId} />
          <DeleteItemButton pizzaId={pizzaId} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
