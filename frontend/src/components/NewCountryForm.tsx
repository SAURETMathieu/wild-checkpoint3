import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_COUNTRY, GET_COUNTRIES } from "../gql/countries";
import Loader from "./Loader";

export function NewCountryForm() {
  const [formData, setFormData] = useState({
    name: "",
    emoji: "",
    code: "",
  });

  const [addCountry, { loading, error }] = useMutation(gql(ADD_COUNTRY), {
    refetchQueries: [{ query: gql(GET_COUNTRIES) }],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
      await addCountry({
        variables: {
          data: {
            name: formData.name,
            emoji: formData.emoji,
            code: formData.code,
          },
        },
      });
      setFormData({ name: "", emoji: "", code: "" });
      alert("Country added!");
    } catch (err) {
      console.error("Submission error", err);
    }
  };

  return (
    <section>
      <form
        className="bg-[#F1F1F1] p-4 rounded-md border border-gray-200 flex gap-2"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-2">
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
                className="bg-white rounded-md p-1 border border-gray-300 max-w-[70%]"
                required
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#F7146B] text-white p-4 rounded-md hover:bg-[#F7146B]/90 hover:cursor-pointer my-auto disabled:opacity-50 h-15 w-18"
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
