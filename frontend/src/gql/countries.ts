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
  query GetCountry($code: String!) {
    country(code: $code) {
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
