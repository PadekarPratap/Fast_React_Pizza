import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../services/apiRestaurant';
import MenuItem from '../components/menu/MenuItem';

const Menu = () => {
  const menu = useLoaderData();

  return (
    <div className="my-8">
      <ul className="divide-y divide-stone-200">
        {menu.data.map((pizza) => (
          <MenuItem key={pizza.id} pizza={pizza} />
        ))}
      </ul>
    </div>
  );
};

/* eslint-disable-next-line */
export const loader = async () => {
  const menu = await getMenu();
  return menu;
};

export default Menu;
