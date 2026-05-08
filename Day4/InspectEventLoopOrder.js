console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

async function test() {
  console.log("4");

  await Promise.resolve();

  console.log("5");
}

test();

console.log("6");


//Output
// 1
// 4
// 6
// 3
// 5
// 2