import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function PageLayout() {
  return (
    <body>
      <Header />
      <main className="flex flex-col items-center justify-center p-8">
        <Outlet />
      </main>
    </body>
  );
}
