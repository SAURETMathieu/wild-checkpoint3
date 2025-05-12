import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function PageLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center p-8">
        <Outlet />
      </main>
    </div>
  );
}
