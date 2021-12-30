export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://cors-anywhere.herokuapp.com/https://goth-stock-backend.herokuapp.com";
