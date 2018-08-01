var items = {};

var storage = {
  getItem: (key) => { return items[key] || null; },
  removeItem: (key) => { items[key] = undefined; },
  setItem: (key, value) => { items[key] = value; },
  clear: (key) => { items = {}; }
};

export { storage };