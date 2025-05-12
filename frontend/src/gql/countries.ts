export const GET_COUNTRIES = `
  query GetCountries {
    countries {
      name
      emoji
      id
      code
    }
  }
`;

export const GET_COUNTRY = `
  query GetCountry($id: ID!) {
    country(id: $id) {
      name
      emoji
      id
      code
      continent {
        id
        name
      }
    }
  }
`;
