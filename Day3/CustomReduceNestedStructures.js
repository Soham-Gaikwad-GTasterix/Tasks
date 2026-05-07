const users = [
  { name: "A", age: 20 },
  { name: "B", age: 20 },
  { name: "C", age: 25 }
];

const grouped = users.reduce((acc, user) => {
  if (!acc[user.age]) {
    acc[user.age] = [];
  }

  acc[user.age].push(user.name);

  return acc;
}, {});

console.log(grouped);


//Output
//{ '20': ['A', 'B' ], '25': ['C' ] }