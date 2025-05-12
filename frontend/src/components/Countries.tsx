import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_COUNTRIES } from "../gql/countries";
import type { CountryType } from "../types";

export function Countries() {
  const { data, loading, error } = useQuery(gql(GET_COUNTRIES));

  const countries = data?.countries || [];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="flex flex-wrap gap-4 justify-center items-center">
      {countries?.map((country: CountryType) => (
        <Link
          key={country.id}
          to={`/countries/${country.code.toLowerCase()}`}
          aria-label={`Navigation vers les détails du pays: ${country.name}`}
          className="flex flex-col items-center justify-center bg-[#F5F5F5] border-gray-300 border rounded-md p-2 w-[90px] max-w-[90px] cursor-pointer hover:bg-gray-200"
          title={country.code}
        >
          <h2>{country.name}</h2>
          <p>{country.emoji}</p>
        </Link>
      ))}
    </section>
  );
}
