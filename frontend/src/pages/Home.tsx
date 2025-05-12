import { Countries } from "../components/Countries";
import { NewCountryForm } from "../components/NewCountryForm";

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <NewCountryForm />
      <Countries />
    </div>
  );
}
