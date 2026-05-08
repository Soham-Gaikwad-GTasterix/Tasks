async function parallel() {
  const [a, b] = await Promise.all([
    Promise.resolve(1),
    Promise.resolve(2)
  ]);

  console.log(a, b);
}

parallel();


//output
//1 2