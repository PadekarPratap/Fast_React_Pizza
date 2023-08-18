import { useLoaderData } from 'react-router-dom';
import { getOrder } from '../services/apiRestaurant';
import { formatDate } from '../utils/dateFormat';
import { calcMinutesLeft } from '../utils/minutesLeft';
import { currencyUnit } from '../utils/currency';
import OrderItem from '../components/order/OrderItem';

const Order = () => {
  const order = useLoaderData();
  console.log(order);

  const {
    id,
    priority,
    estimatedDelivery,
    orderPrice,
    priorityPrice,
    status,
    cart,
  } = order.data;

  return (
    <div className="my-12 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-robotoMono text-2xl font-semibold">
          Order #{id} Status
        </h2>

        <div className="space-x-3">
          <span className="rounded-full bg-red-600 px-3 py-1 text-red-100">
            {priority && <span>Priority</span>}
          </span>
          <span className="rounded-full bg-green-600 px-3 py-1 text-green-100">
            {status} Order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-stone-200 p-4">
        {calcMinutesLeft(estimatedDelivery) >= 0 ? (
          <p className="text-sm font-medium">
            only {calcMinutesLeft(estimatedDelivery)} mins left!
          </p>
        ) : (
          <p className="font-robotoMono font-medium md:text-lg">
            Your Order has arrived!
          </p>
        )}
        <p className="font-mono text-sm text-stone-500">
          Est. delivery: {formatDate(estimatedDelivery)}
        </p>
      </div>

      {/* cart items  */}
      <div>
        <ul className="divide-y divide-stone-200 border-b">
          {cart.map((item) => (
            <OrderItem key={item.pizzaId} item={item} />
          ))}
        </ul>
      </div>

      <div className="font-robotoMono space-y-3 rounded-md bg-stone-200 p-4">
        <p className=" text-stone-500">
          Pizza Price: {currencyUnit(orderPrice, 'EUR')}
        </p>

        {priority && (
          <p className="text-stone-500">
            Priority Price {currencyUnit(priorityPrice, 'EUR')}
          </p>
        )}

        <p className="text-lg font-bold">
          Total Payment on delivery:{' '}
          {priorityPrice
            ? currencyUnit(orderPrice + priorityPrice, 'EUR')
            : currencyUnit(orderPrice, 'EUR')}
        </p>
      </div>
    </div>
  );
};

/* eslint-disable-next-line */
export const loader = async ({ params }) => {
  const order = await getOrder(params.orderID);
  return order;
};

export default Order;
