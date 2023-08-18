import { Link, useFetcher } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from '../components/cart/EmptyCart';
import { clearCart } from '../features/cart/cartSlice';
import { useEffect } from 'react';

/*
const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];
*/

const Cart = () => {
  const { username } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/menu');
    }
  }, [fetcher]);

  console.log(fetcher.data);

  // const cart = fakeCart
  const cart = useSelector((state) => state.cart.cart);

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mb-5">
      <div className="mt-4">
        <Link
          to="/menu"
          className="text-sm font-semibold text-blue-500 hover:text-blue-600"
        >
          &larr;Back to Menu
        </Link>
      </div>

      <h1 className="mt-8 text-3xl font-bold text-stone-800">
        Your Cart, {username}
      </h1>

      <div className="mt-5">
        <ul className="divide-y divide-stone-300 border-b border-stone-300">
          {cart.map((item) => (
            <CartItem
              key={item.pizzaId}
              item={item}
              ingredients={
                fetcher?.data?.data?.find((el) => el.id === item.pizzaId)
                  ?.ingredients ?? []
              }
              isIngredientsLoading={fetcher?.state === 'loading'}
            />
          ))}
        </ul>
      </div>

      <div className="mt-8 space-x-3">
        <Link to="/order/new" className="btn-primary uppercase">
          Order Pizza
        </Link>
        <button
          className="rounded-full bg-stone-300 px-4 py-3 font-semibold uppercase outline-none transition-all duration-300 focus-within:ring-2 focus-within:ring-stone-600/50 focus-within:ring-offset-2 hover:bg-stone-200 "
          onClick={() => dispatch(clearCart())}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};
export default Cart;
