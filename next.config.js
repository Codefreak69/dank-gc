/** @type {import('next').NextConfig} */
const nextConfig = {};

// set config for images domain
nextConfig.images = {
  domains: ["localhost", "lh3.googleusercontent.com"],
};

module.exports = nextConfig;
