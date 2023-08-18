import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Menu, { loader as menuLoader } from './pages/Menu';
import CreateOrder, { action as createOrderAction } from './pages/CreateOrder';
import Order, { loader as orderLoader } from './pages/Order';
import Cart from './pages/Cart';
import Error from './components/ui/Error';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        // errorElement: <Error />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderID',
        element: <Order />,
        loader: orderLoader,
        // errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
