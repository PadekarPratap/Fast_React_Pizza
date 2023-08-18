import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../services/apiRestaurant';
import Spinner from '../components/ui/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from '../components/cart/EmptyCart';
import { clearCart, getTototalPrice } from '../features/cart/cartSlice';
import { currencyUnit } from '../utils/currency';
import { useState } from 'react';
import { store } from '../store';
import { fetchUserAddress } from '../features/user/userSlice';

/*
const fakeCart = [
  {
    pizzaId: 7,
    name: 'Napoli',
    quantity: 3,
    unitPrice: 16,
    totalPrice: 48,
  },
  {
    pizzaId: 5,
    name: 'Diavola',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 3,
    name: 'Romana',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];
*/

// https://uibakery.io/regex-library/phone-number
const validatePhone = (phone) => {
  return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    phone,
  );
};

const CreateOrder = () => {
  const [priority, setPriority] = useState('');

  const {
    username,
    status,
    error: positionError,
    address,
    position: geoPosition,
  } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  const totalCartPrice = useSelector(getTototalPrice);
  const priorityPrice = priority ? 0.2 * totalCartPrice : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const formError = useActionData();
  const navigation = useNavigation();

  const isAddressLoading = status === 'loading';

  const [posPermissionError, setPosPermissionError] = useState('');

  const handlePosition = () => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        // console.log(lat, lng);

        const position = {
          lat,
          lng,
        };

        dispatch(fetchUserAddress({ lat, lng, position }));
      },
      (err) => {
        console.log(err.message);
        setPosPermissionError(err.message);
      },
    );
  };

  const isSubmitting = navigation.state === 'submitting';

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="max-w-4xlxl mx-auto my-8">
      <h1 className="mb-5 text-3xl font-bold tracking-wider">
        Ready to order? Let&apos;s go
      </h1>

      <Form method="POST" action="/order/new">
        <div className="form-control">
          <label
            className="font-mono text-xl tracking-wider md:basis-[20%]"
            htmlFor="firstName"
          >
            Name
          </label>
          <div className="grow">
            <input
              className="input-control mb-4"
              type="text"
              name="customer"
              id="firstName"
              required
              defaultValue={username}
            />
            {formError?.customer && (
              <p className="mt-3 inline rounded-md border border-red-700 bg-red-100 p-2 text-red-700">
                {formError.customer}
              </p>
            )}
          </div>
        </div>

        <div className="form-control">
          <label
            className="font-mono text-xl tracking-wider md:basis-[20%]"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <div className="grow">
            <input
              className="input-control mb-4"
              type="tel"
              name="phone"
              id="phone"
              required
            />
            {formError?.phone && (
              <p className="mt-3 inline rounded-md border border-red-700 bg-red-100 p-2 text-red-700">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="form-control">
          <label
            className="font-mono text-xl tracking-wider md:basis-[20%]"
            htmlFor="address"
          >
            Address
          </label>
          <div className="relative grow">
            <input
              className="input-control"
              type="text"
              name="address"
              id="address"
              required
              defaultValue={address}
            />
            {!address && (
              <span className="absolute right-1 top-1 z-50">
                <button
                  className="btn-primary px-3 py-2"
                  onClick={handlePosition}
                  disabled={isAddressLoading}
                  type="button"
                >
                  Get Position
                </button>
              </span>
            )}
            <div className="mt-3">
              {positionError || posPermissionError ? (
                <p className="inline rounded-md border border-red-700 bg-red-100 p-2 text-red-700">
                  {positionError || posPermissionError}
                </p>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>

        <div className="mb-5 flex items-center gap-5">
          <input
            className="h-6 w-6 cursor-pointer accent-yellow-500 outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="check"
            value={priority}
            onChange={(e) => setPriority(e.target.checked)}
          />
          <label className="font-mono text-xl tracking-wider" htmlFor="check">
            Make this order as a priority order
          </label>
        </div>

        {/* hidden input for cart  */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={JSON.stringify(geoPosition)}
        />

        <div>
          <button
            disabled={isSubmitting}
            className={`btn-primary ${
              isSubmitting ? 'flex items-center gap-4 uppercase' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <span>Creating Order</span> <Spinner />
              </>
            ) : (
              `Create Order for ${currencyUnit(totalPrice, 'EUR')}`
            )}
          </button>
          {priority && (
            <small className="mt-4 block font-robotoMono font-medium">
              * Priority prices may apply separately.{' '}
            </small>
          )}
        </div>
      </Form>
    </div>
  );
};

/* eslint-disable-next-line */
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    customer: data.customer.trim(),
    phone: data.phone.trim(),
    address: data.address.trim(),
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
    position: `${JSON.parse(data.position).lat} ${
      JSON.parse(data.position).lng
    }`,
  };

  console.log(order);

  let errors = {};

  if (!validatePhone(order.phone))
    errors.phone = 'Please enter a valid phone number.';

  if (order.customer.length < 3)
    errors.customer = 'Enter a name of minimum 3 characters.';

  if (Object.keys(errors).length > 0) return errors;

  // if everything is good create a new order and redirect to order page.
  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.data.id}`);
};

export default CreateOrder;
