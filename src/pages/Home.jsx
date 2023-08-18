import { useSelector } from 'react-redux';
import CreateUser from '../components/user/CreateUser';
import { Link } from 'react-router-dom';

const Home = () => {
  const { username } = useSelector((state) => state.user);
  return (
    <div className="flex min-h-[calc(100vh-9rem)] flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-semibold text-stone-800 md:text-4xl">
        The Best Pizza. <br />
        <span className="text-yellow-500">
          Out of the Oven, straight to your doorstep.{' '}
        </span>
      </h1>

      {username ? (
        <Link to="/menu" className="btn-primary mt-8">
          Go to Menu
        </Link>
      ) : (
        <CreateUser />
      )}
    </div>
  );
};
export default Home;
