class EventBus {

  constructor() {

    // Store all events
    this.events = {};
  }


  // Subscribe to event
  subscribe(eventName, callback) {

    // Create array if event doesn't exist
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    // Add callback
    this.events[eventName].push(callback);

    console.log(`Subscribed to: ${eventName}`);
  }


  // Publish event
  publish(eventName, data) {

    // Check if event exists
    if (!this.events[eventName]) {
      console.log(`No subscribers for ${eventName}`);
      return;
    }

    // Run all callbacks
    this.events[eventName].forEach(callback => {
      callback(data);
    });
  }


  // Unsubscribe
  unsubscribe(eventName, callback) {

    if (!this.events[eventName]) return;

    this.events[eventName] =
      this.events[eventName].filter(
        cb => cb !== callback
      );

    console.log(`Unsubscribed from: ${eventName}`);
  }

}


// Create Event Bus
const bus = new EventBus();


// Subscriber 1
function loginNotification(user) {

  console.log(`Welcome ${user}`);
}


// Subscriber 2
function analytics(user) {

  console.log(`Analytics tracked for ${user}`);
}


// Subscribe both
bus.subscribe("login", loginNotification);

bus.subscribe("login", analytics);


// Publish event
bus.publish("login", "John");


// Unsubscribe one listener
bus.unsubscribe("login", analytics);


// Publish again
bus.publish("login", "Mike");


// Output 
// Subscribed to: login
// Subscribed to: login
// Welcome John
// Analytics tracked for John
// Unsubscribed from: login
// Welcome Mike