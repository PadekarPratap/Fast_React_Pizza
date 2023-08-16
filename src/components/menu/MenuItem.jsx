import { currencyUnit } from "../../utils/currency";

const MenuItem = ({ pizza }) => {
  const { id, imageUrl, ingredients, name, soldOut, unitPrice } = pizza;

  return (
    <li>
      <img src={imageUrl} alt={`${name} pizza`} />
      <h3>{name}</h3>
      <p>{ingredients.join(", ")}</p>
      <p>{currencyUnit(unitPrice, "EUR")}</p>
    </li>
  );
};
export default MenuItem;
