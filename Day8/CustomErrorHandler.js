class ValidationError extends Error {

  constructor(message) {
    super(message);

    this.name = "ValidationError";
  }
}


function validateUser(age) {

  if (age < 18) {

    throw new ValidationError(
      "User must be adult"
    );
  }

  return "Valid User";
}


try {

  console.log(validateUser(15));

} catch (error) {

  if (error instanceof ValidationError) {

    console.log("Validation Error:");
    console.log(error.message);

  } else {

    console.log("Unknown Error");
  }
}


// Output
// Validation Error:
// User must be adult