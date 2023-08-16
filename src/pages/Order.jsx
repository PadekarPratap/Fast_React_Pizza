import { useLoaderData } from "react-router-dom";
import { getOrder } from "../services/apiRestaurant";
import { formatDate } from "../utils/dateFormat";
import { calcMinutesLeft } from "../utils/minutesLeft";

const Order = () => {
  const order = useLoaderData();
  console.log(order);

  const { priority, estimatedDelivery, orderPrice, priorityPrice } = order.data;

  return (
    <div>
      <h2>Status</h2>
      {priority && <span>Priority Order</span>}

      <p>only {calcMinutesLeft(estimatedDelivery)} mins left!</p>

      <p>Est. delivery: {formatDate(estimatedDelivery)}</p>

      <p>Pizza Price {orderPrice}</p>

      {priority && <p>Priority Price {priorityPrice}</p>}

      <p>
        Total Payment on delivery:
        {priorityPrice ? orderPrice + priorityPrice : orderPrice}
      </p>
    </div>
  );
};

/* eslint-disable-next-line */
export const loader = async ({ params }) => {
  const order = await getOrder(params.orderID);
  return order;
};

export default Order;
