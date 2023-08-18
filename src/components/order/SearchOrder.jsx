import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchOrder = () => {
  const [orderQuery, setOrderQuery] = useState('');
  const navigate = useNavigate();

  const handleOrder = (e) => {
    e.preventDefault();
    if (!orderQuery || orderQuery === 'new') return;
    navigate(`/order/${orderQuery}`);
    setOrderQuery('');
  };

  return (
    <form onSubmit={handleOrder}>
      <input
        type="text"
        value={orderQuery}
        placeholder="search order #"
        onChange={(e) => setOrderQuery(e.target.value)}
        className="w-36 rounded-full bg-yellow-100 px-4 py-3 text-sm font-medium transition-all  duration-500 placeholder:text-stone-400 focus:w-40 focus:outline-none focus:ring-4 focus:ring-yellow-800/10 sm:text-base md:w-64 md:focus:w-72"
      />
    </form>
  );
};
export default SearchOrder;
