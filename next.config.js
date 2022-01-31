module.exports = {
  experimental: {
    staticPageGenerationTimeout: 100,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    return config
  },
}
