function extractUser({
  name,
  age,
  address: {
    city
  }
}) {
  return `${name} is ${age} years old from ${city}`;
}

const user = {
  name: "John",
  age: 25,
  address: {
    city: "Pune"
  }
};

console.log(extractUser(user));


//Output
//John is 25 years old from Pune