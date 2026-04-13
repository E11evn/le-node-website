/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/os', destination: '/', permanent: true },
    ]
  },
}
export default nextConfig
