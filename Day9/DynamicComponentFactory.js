class Button {

  render() {

    return `
      <button>
        Button Component
      </button>
    `;
  }
}


class Input {

  render() {

    return `
      <input placeholder="Enter text" />
    `;
  }
}


class Card {

  render() {

    return `
      <div class="card">
        Card Component
      </div>
    `;
  }
}


// Factory
class ComponentFactory {

  static create(type) {

    switch(type) {

      case "button":
        return new Button();

      case "input":
        return new Input();

      case "card":
        return new Card();

      default:
        throw new Error(
          "Invalid component type"
        );
    }
  }
}


// Create Components
const button =
  ComponentFactory.create("button");

const input =
  ComponentFactory.create("input");

const card =
  ComponentFactory.create("card");


// Render Components
console.log(button.render());

console.log(input.render());

console.log(card.render());



// Output
// <button>
//   Button Component
// </button>
//    
//
// <input placeholder="Enter text" />
//    
//
// <div class="card">
//   Card Component
// </div>