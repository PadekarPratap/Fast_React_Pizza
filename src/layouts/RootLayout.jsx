import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/ui/Header";
import CartOverview from "../components/cart/CartOverview";
import Loader from "../components/ui/Loader";

const RootLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <>
      {isLoading && <Loader />}
      <header>
        <Header />
      </header>

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </>
  );
};

export default RootLayout;
