import { Link } from 'react-router-dom';
import SearchOrder from '../order/SearchOrder';
import Username from '../user/Username';

const Header = () => {
  return (
    <div className="flex h-20 items-center justify-between px-5">
      <Link
        to="/"
        className="font-robotoMono text-lg font-semibold uppercase tracking-widest md:text-2xl"
      >
        <span className="hidden sm:inline">Fast React Pizza Co.</span>
        <span className="text-4xl sm:hidden">🍕</span>
      </Link>
      <div className="flex items-center space-x-4">
        <Username />
        <SearchOrder />
      </div>
    </div>
  );
};
export default Header;
