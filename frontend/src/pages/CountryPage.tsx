import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_COUNTRY } from "../gql/countries";
import PageNotFound from "./NotFound";

export function CountryPage() {
  const params = useParams();
  const { data, loading } = useQuery(gql(GET_COUNTRY), {
    variables: {
      code: params.code?.toUpperCase(),
    },
  });
  const country = data?.country;

  if (loading) return <p>Loading...</p>;
  if (!country) {
    return <PageNotFound message="Country not found" />;
  }

  return (
    <section
      key={country.id}
      className="flex flex-col items-center justify-center p-2 cursor-pointer gap-2"
      title={country.code}
    >
      <span className="text-6xl font-bold">{country.emoji}</span>
      <h3 className="mt-6">
        Name: {country.name} ({country.code})
      </h3>
      <p>Continent: {country.continent.name}</p>
    </section>
  );
}
