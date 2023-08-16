import { Link } from "react-router-dom";

const CartOverview = () => {
  return (
    <div>
      <p>
        <span>14 Pizzas</span>
        <span>$ 14.99</span>
      </p>

      <Link to="/cart">Go to Cart</Link>
    </div>
  );
};
export default CartOverview;
