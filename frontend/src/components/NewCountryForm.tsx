import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_CONTINENTS } from "../gql/continents";
import { ADD_COUNTRY, GET_COUNTRIES } from "../gql/countries";
import type { ContinentType } from "../types";
import Loader from "./Loader";

export function NewCountryForm() {
  const [formData, setFormData] = useState({
    name: "",
    emoji: "",
    code: "",
    continentId: "",
  });

  const { data: continentsData } = useQuery(gql(GET_CONTINENTS));
  const continents = continentsData?.continents || [];

  const [addCountry, { loading, error }] = useMutation(gql(ADD_COUNTRY), {
    refetchQueries: [{ query: gql(GET_COUNTRIES) }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCountry({
        variables: {
          data: {
            name: formData.name,
            emoji: formData.emoji,
            code: formData.code,
            continent: {
              id: parseInt(formData.continentId),
            },
          },
        },
      });
      setFormData({ name: "", emoji: "", code: "", continentId: "" });
      alert("Country added!");
    } catch (err) {
      console.error("Submission error", err);
    }
  };

  return (
    <section>
      <form
        className="bg-[#F1F1F1] p-4 rounded-md border border-gray-200 flex gap-2 flex-col sm:flex-row"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 px-4">
          {["name", "emoji", "code"].map((field) => (
            <div key={field} className="flex flex-col gap-2">
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                id={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className="bg-white rounded-md p-1 border border-gray-300 w-full max-w-[100%] sm:max-w-[70%] hover:border-gray-400"
                required
              />
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <label htmlFor="continentId">Continent</label>
            <select
              id="continentId"
              value={formData.continentId}
              onChange={handleChange}
              className="bg-white rounded-md p-1 border border-gray-300 w-full max-w-[100%] sm:max-w-[70%] cursor-pointer h-[34px] hover:border-gray-400"
              required
            >
              <option value="" disabled selected>
                Select a continent
              </option>
              {continents.map((continent: ContinentType) => (
                <option key={continent.id} value={continent.id}>
                  {continent.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#F7146B] text-white p-4 rounded-md hover:bg-[#F7146B]/90 hover:cursor-pointer my-auto disabled:opacity-50 h-15 w-18 ml-auto mt-2 sm:mt-0"
        >
          {loading ? <Loader /> : "Add"}
        </button>
      </form>
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">
          Error: {error.message}
        </p>
      )}
    </section>
  );
}
