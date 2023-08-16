import { useLoaderData } from "react-router-dom";
import { getMenu } from "../services/apiRestaurant";
import MenuItem from "../components/menu/MenuItem";

const Menu = () => {
  const menu = useLoaderData();

  return (
    <ul>
      {menu.data.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
};

/* eslint-disable-next-line */
export const loader = async () => {
  const menu = await getMenu();
  return menu;
};

export default Menu;
