
module.exports = function(api) {
    api.cache(true);
    api.cache(false);
    var env = api.cache(() => process.env.NODE_ENV);
  
    var isProd = api.cache(() => process.env.NODE_ENV === "production");
  
    var isProd = api.cache.invalidate(() => process.env.NODE_ENV === "production"); 
  
    api.cache.forever(); // api.cache(true)
    api.cache.never();   // api.cache(false)
    api.cache.using(fn); // api.cache(fn)
  
    return { };
  };