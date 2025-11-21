// player.js
const { Character } = require('./character');
const { Food } = require('./food');

class Player extends Character {
  constructor(name, currentRoom) {
    super(name, currentRoom, 20, 3); // stronger than default
  }

  move(direction) {
    const nextRoom = this.currentRoom.getRoomInDirection(direction);
    if (nextRoom) {
      this.currentRoom = nextRoom;
      nextRoom.printRoom();
    } else {
      console.log("You cannot move in that direction.");
    }
  }

  takeItem(itemName) {
    const item = this.currentRoom.getItemByName(itemName);
    if (!item) return console.log(`There is no ${itemName} here.`);
    this.items.push(item);
    this.currentRoom.items = this.currentRoom.items.filter(i => i !== item);
    console.log(`You picked up the ${itemName}.`);
  }

  dropItem(itemName) {
    const item = this.getItemByName(itemName);
    if (!item) return console.log(`You don't have ${itemName}.`);
    this.items = this.items.filter(i => i !== item);
    this.currentRoom.items.push(item);
    console.log(`You dropped the ${itemName}.`);
  }

  eatItem(itemName) {
    const item = this.getItemByName(itemName);
    if (!item) return console.log(`You don't have ${itemName}.`);
    if (!(item instanceof Food)) return console.log(`You can't eat the ${itemName}!`);
    this.items = this.items.filter(i => i !== item);
    this.health += 5;
    console.log(`You eat the ${itemName}. Health is now ${this.health}.`);
  }
}

module.exports = { Player };
