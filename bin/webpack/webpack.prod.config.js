module.exports = {
  entry: {
    front_ent_tools: ['./lib/index.js']
  },
  externals: {
    'moment': 'moment',
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
