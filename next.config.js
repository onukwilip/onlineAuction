/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI:
      "mongodb+srv://gery:dregos@microservices-cluster.xphnago.mongodb.net/auction-db?retryWrites=true&w=majority",
    SMTP_APP_PASSWORD: "pglolyhpvcqobkib",
    JWT_KEY: "13i4uuor8324",
    API_DOMAIN: "https://aunction.vercel.app",
    // API_DOMAIN: "http://localhost:3000",
  },
};

module.exports = nextConfig;
