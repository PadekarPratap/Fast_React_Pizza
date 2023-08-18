import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../components/ui/Header';
import CartOverview from '../components/cart/CartOverview';
import Loader from '../components/ui/Loader';

const RootLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="flex h-screen flex-col">
      {isLoading && <Loader />}
      <header className="bg-yellow-400">
        <Header />
      </header>

      <main className="no-scrollbar mx-auto w-full max-w-screen-xl flex-grow overflow-scroll px-4">
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
};

export default RootLayout;
