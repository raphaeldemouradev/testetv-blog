import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'images.unsplash.com',
      port: '',
      pathname: '/**', //permissão geral do site
    },
    {
      protocol: 'https',
      hostname: 'www.datocms-assets.com',
    },
    ]
  },
};

export default nextConfig;
