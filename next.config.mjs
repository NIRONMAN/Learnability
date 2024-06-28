/** @type {import('next').NextConfig} */
const nextConfig = {
    // next.config.js
    reactStrictMode:false,
    webpack: (config, { isServer }) => {
      // Handle ESM packages for server-side rendering
      if (isServer) {
        config.externals = ['@vertx/core', ...config.externals];
      }
      return config;
    },
  
  
};

export default nextConfig;
