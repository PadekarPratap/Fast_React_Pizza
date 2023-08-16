import { Link } from "react-router-dom";
import SearchOrder from "../order/searchOrder";

const Header = () => {
  return (
    <div>
      <Link to="/">Fast React Pizza Co.</Link>
      <SearchOrder />
      <p>Jonas</p>
    </div>
  );
};
export default Header;
