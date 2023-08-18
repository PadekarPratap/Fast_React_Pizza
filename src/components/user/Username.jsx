import { useSelector } from 'react-redux';

const Username = () => {
  const { username } = useSelector((state) => state.user);

  if (!username) return null;

  return (
    <p className="hidden text-lg font-bold uppercase md:block">{username}</p>
  );
};
export default Username;
