const cache = new WeakMap();

function processUser(user) {
  if (cache.has(user)) {
    console.log("From cache");
    return cache.get(user);
  }

  console.log("Processing...");

  const result = {
    name: user.name.toUpperCase()
  };

  cache.set(user, result);

  return result;
}

let user = {
  name: "john"
};

console.log(processUser(user));
console.log(processUser(user));


// Output
// Processing...
// { name: 'JOHN' }
// From cache
// { name: 'JOHN' }