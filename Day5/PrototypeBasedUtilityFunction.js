Array.prototype.customSum = function () {
  return this.reduce((acc, curr) => acc + curr, 0);
};

const arr = [1, 2, 3];

console.log(arr.customSum());


//Output
// 6