import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchOrder = () => {
  const [orderQuery, setOrderQuery] = useState("");
  const navigate = useNavigate();

  const handleOrder = (e) => {
    e.preventDefault();
    if (!orderQuery || orderQuery === "new") return;
    navigate(`/order/${orderQuery}`);
    setOrderQuery("");
  };

  return (
    <form onSubmit={handleOrder}>
      <input
        type="text"
        value={orderQuery}
        placeholder="search order #"
        onChange={(e) => setOrderQuery(e.target.value)}
      />
    </form>
  );
};
export default SearchOrder;
