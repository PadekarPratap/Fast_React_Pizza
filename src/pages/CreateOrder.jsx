import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../services/apiRestaurant";

const fakeCart = [
  {
    pizzaId: 7,
    name: "Napoli",
    quantity: 3,
    unitPrice: 16,
    totalPrice: 48,
  },
  {
    pizzaId: 5,
    name: "Diavola",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 3,
    name: "Romana",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

// https://uibakery.io/regex-library/phone-number
const validatePhone = (phone) => {
  return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    phone
  );
};

const CreateOrder = () => {
  const cart = fakeCart;

  const formError = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div>
      <h1>Ready to order? Let&apos;s go</h1>

      <Form method="POST" action="/order/new">
        <div>
          <label htmlFor="firstName">Name</label>
          <input type="text" name="customer" id="firstName" required />
          {formError?.customer && <p>{formError.customer}</p>}
        </div>

        <div>
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" name="phone" id="phone" required />
          {formError?.phone && <p>{formError.phone}</p>}
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input type="text" name="address" id="address" required />
        </div>

        <div>
          <input type="checkbox" name="priority" id="check" />
          <label htmlFor="check">Make this order as a priority order</label>
        </div>

        {/* hidden input for cart  */}
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <div>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Placing Order..." : "Create Order"}
          </button>
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
    priority: data.priority === "on",
  };

  let errors = {};

  if (!validatePhone(order.phone))
    errors.phone = "Please enter a valid phone number.";

  if (order.customer.length < 3)
    errors.customer = "Enter a name of minimum 3 characters.";

  if (Object.keys(errors).length > 0) return errors;

  // if everything is good create a new order and redirect to order page.
  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.data.id}`);
};

export default CreateOrder;
