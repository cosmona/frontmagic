module.exports = function(api) {
  // Cache the returned value forever and don't call this function again.
  api.cache(true);

  // Return the Babel configuration object.
  return {
    presets: [
      // Add your Babel presets here
    ],
    plugins: [
      // Add your Babel plugins here
    ],
  };
};
