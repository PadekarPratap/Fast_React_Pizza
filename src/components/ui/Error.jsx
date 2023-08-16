import { useNavigate, useRouteError } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  console.log(error);
  return (
    <div>
      <h1>Something has gone wrong!</h1>
      <p>{error.message || error.statusText}</p>
      <button onClick={() => navigate(-1)}>&larr;Go back</button>
    </div>
  );
};
export default Error;
