import { Link, useNavigate, useRouteError } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  console.log(error);
  return (
    <div className="fixed left-1/2 top-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 space-y-3 text-center">
      <Link to="/" className="text-2xl font-medium text-yellow-500">
        Fast React Pizza Co.
      </Link>
      <h1 className="text-xl font-semibold md:text-3xl">
        Something has gone wrong!
      </h1>
      <p className="text-lg italic">{error.message || error.statusText}</p>
      <button
        className=" font-semibold text-blue-500 hover:text-blue-700"
        onClick={() => navigate(-1)}
      >
        &larr;Go back
      </button>
    </div>
  );
};
export default Error;
