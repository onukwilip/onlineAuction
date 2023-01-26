/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI:
      "mongodb+srv://gery:dregos@microservices-cluster.xphnago.mongodb.net/auction-db?retryWrites=true&w=majority",
    SMTP_APP_PASSWORD: "pglolyhpvcqobkib",
  },
};

module.exports = nextConfig;
