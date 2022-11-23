/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{
      hostname: 'ane4bf-datap1.s3-eu-west-1.amazonaws.com'
    }]
  }
}

module.exports = nextConfig
