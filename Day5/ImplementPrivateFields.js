class BankAccount {
  #balance;

  constructor(balance) {
    this.#balance = balance;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount(100);

account.deposit(50);

console.log(account.getBalance());

//Illegal outside the class body. Private field can only be accessed inside the same class.
//Will give Syntax Error.
console.log(account.#balance);  


//Output
// 150
// Syntax Error