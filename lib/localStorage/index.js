const set = function(options) {
  for (let p in options) {
    localStorage.setItem(p, options[p]);
  }
};

const get = function(params) {
  return localStorage.getItem(params);
};

const remove = function(options) {
  if (options instanceof Array) {
    for (let p of options) {
      localStorage.removeItem(p);
    }
    return;
  }
  if (typeof options === 'string') {
    localStorage.removeItem(options);
  }
};
export default { set, get, remove };
