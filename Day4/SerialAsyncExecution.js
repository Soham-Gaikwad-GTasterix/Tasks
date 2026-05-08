async function serial() {
  const a = await Promise.resolve(1);
  const b = await Promise.resolve(2);

  console.log(a, b);
}

serial();


//output
//1 2