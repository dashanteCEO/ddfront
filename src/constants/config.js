// process.env.NODE_ENV === "development"
//   ? "http://localhost:6969"
//   : "https://ddautoja-backend-production.up.railway.app";
export const base_url = 
  process.env.NODE_ENV === "development"
  ? "http://localhost:6969"
  : "https://ddautoja-backend-production.up.railway.app"
