import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getTotalQuantity,
  getTototalPrice,
} from '../../features/cart/cartSlice';
import { currencyUnit } from '../../utils/currency';

const CartOverview = () => {
  const totalCartPrice = useSelector(getTototalPrice);
  const totalCartQty = useSelector(getTotalQuantity);

  if (!totalCartQty) return null;

  return (
    <div className="flex h-16 items-center justify-between bg-stone-800 px-5 py-5 text-lg uppercase text-stone-100 md:text-xl">
      <p className="space-x-3 text-stone-200">
        <span>{totalCartQty} Pizzas</span>{' '}
        <span>{currencyUnit(totalCartPrice, 'EUR')}</span>
      </p>

      <Link to="/cart">Open Cart &rarr;</Link>
    </div>
  );
};
export default CartOverview;
