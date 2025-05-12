import { gql, useQuery } from "@apollo/client";
import { GET_COUNTRY } from "../gql/countries";

export function CountryPage() {
  const { data, loading, error } = useQuery(gql(GET_COUNTRY));
  const country = data?.country;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      <div
        key={country.id}
        aria-label={`Navigation vers les détails du pays: ${country.name}`}
        className="flex flex-col items-center justify-center bg-[#F5F5F5] border-gray-300 border rounded-md p-2 w-[90px] max-w-[90px] cursor-pointer hover:bg-gray-200"
        title={country.code}
      >
        <h3>{country.name}</h3>
        <p>{country.emoji}</p>
      </div>
    </section>
  );
}
