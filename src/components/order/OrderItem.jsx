import { currencyUnit } from '../../utils/currency';

const OrderItem = ({ item }) => {
  console.log(item);
  const { quantity, name, totalPrice } = item;
  return (
    <li className="flex items-center justify-between gap-2 py-3">
      <div>
        <span className="text-lg font-bold">{quantity}&times;</span>{' '}
        <span className="font-robotoMono">{name}</span>
      </div>
      <div className="text-lg font-bold">{currencyUnit(totalPrice, 'EUR')}</div>
    </li>
  );
};
export default OrderItem;
