/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI:
      "mongodb+srv://gery:dregos@microservices-cluster.xphnago.mongodb.net/auction-db?retryWrites=true&w=majority",
    SMTP_APP_PASSWORD: "unsmbeadzjuzqtja",
    JWT_KEY: "13i4uuor8324",
    CLOUDINARY_NAME: "dcw8gj4c1",
    CLOUDINARY_KEY: "431845878597357",
    CLOUDINARY_SECRET: "P4WCtUSL_USnj0KvHXVr7uqgkh0",
    CLOUDINARY_FOLDER: "gereadragos-auction-app",
    // API_DOMAIN: "https://aunction.vercel.app",
    API_DOMAIN: "https://auction-app-s9qv.onrender.com",
    // API_DOMAIN: "http://localhost:3000",
  },
};

module.exports = nextConfig;
