import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/case/dieta-commerce",
        destination: "/fi/case/dieta-commerce",
        permanent: false,
      },
      {
        source: "/case/bongariliitto",
        destination: "/fi/case/bongariliitto",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
