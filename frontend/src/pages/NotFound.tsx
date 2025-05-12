import { Link } from "react-router-dom";

const PageNotFound = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold">{message}</h2>
      <Link
        to="/"
        className="text-pink-500 underline underline-offset-2 hover:text-pink-600"
      >
        Go back to home
      </Link>
    </div>
  );
};
export default PageNotFound;
