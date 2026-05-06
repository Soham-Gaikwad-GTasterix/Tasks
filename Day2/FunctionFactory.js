function createMathOperations(base) {
  return {
    add(num) {
      return base + num;
    },

    subtract(num) {
      return base - num;
    },

    multiply(num) {
      return base * num;
    }
  };
}

const math = createMathOperations(10);

console.log(math.add(5));
console.log(math.subtract(3));
console.log(math.multiply(2));

//Output
//15
//7
//20