/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  // disable: process.env.NODE_ENV !== "production",
});

const nextConfig = withPWA({
  reactStrictMode: true,
  env: {
    API_DOMAIN: "",
  },
});

module.exports = nextConfig;
