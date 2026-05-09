class User {
  constructor(name) {
    this.name = name;
  }

  login() {
    console.log(`${this.name} logged in`);
  }
}

class Admin extends User {
  deleteUser(user) {
    console.log(`${user} deleted`);
  }
}

const admin = new Admin("John");

admin.login();
admin.deleteUser("Mike");


//Output
// John logged in
// Mike deleted