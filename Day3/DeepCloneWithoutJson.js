function deepClone(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(deepClone);
  }

  const cloned = {};

  for (const key in value) {
    cloned[key] = deepClone(value[key]);
  }

  return cloned;
}

const original = {
  name: "JS",
  address: {
    city: "Pune"
  }
};

const copied = deepClone(original);

copied.address.city = "Mumbai";

console.log(original.address.city);


//Output
//Pune