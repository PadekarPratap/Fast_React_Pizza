import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="my-4">
      <Link
        to="/menu"
        className="text-sm font-semibold text-blue-500 hover:text-blue-600"
      >
        &larr;Back to Menu
      </Link>

      <div className="mt-12">
        <p className="mb-4 text-lg font-medium md:text-2xl">
          Your cart is Empty. Start by adding pizzas in your cart.
        </p>
        <Link className="btn-primary py-2" to="/menu">
          Start Ordering
        </Link>
      </div>
    </div>
  );
};
export default EmptyCart;
