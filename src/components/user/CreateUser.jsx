import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../features/user/userSlice';

const CreateUser = () => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (!user) return;
    dispatch(createUser(user));
    navigate('/menu');
  };

  return (
    <div className="mt-8 space-y-5 text-center font-robotoMono text-lg md:text-2xl">
      <p className="font-semibold">
        Welcome! Please start by telling us your name:
      </p>

      <form noValidate onSubmit={handleUserSubmit}>
        <input
          className="w-full max-w-[400px] rounded-full px-4 py-3 text-center text-xl outline-none transition-all duration-300 placeholder:text-stone-400 focus-within:ring-4 focus-within:ring-yellow-400/60"
          type="text"
          placeholder="Your full name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        {user && (
          <button
            type="submit"
            onClick={() => navigate('menu')}
            className="btn-primary mx-auto mt-8 block text-lg uppercase"
          >
            Start Ordering
          </button>
        )}
      </form>
    </div>
  );
};
export default CreateUser;
