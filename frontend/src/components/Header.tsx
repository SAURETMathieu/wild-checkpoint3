import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex items-center flex-col justify-center gap-4 p-4 text-white bg-[#F7146B]">
      <h1 className="text-2xl font-bold">Checkpoint : frontend</h1>
      <Link to="/" className="font-normal">
        Countries
      </Link>
    </header>
  );
}
