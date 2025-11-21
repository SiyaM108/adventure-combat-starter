const Character = require('./Character');
const Food = require('./food');

class Player extends Character {
  constructor(name, currentRoom) {
    super(name, currentRoom, 20, 3); // stronger than default
  }

  takeItem(item) {
    this.items.push(item);
    console.log(`${this.name} picked up ${item.name}`);
  }

  dropItem(item) {
    this.items = this.items.filter(i => i !== item);
    this.currentRoom.items.push(item);
    console.log(`${this.name} dropped ${item.name}`);
  }

  eatItem(itemName) {
    const item = this.getItemByName(itemName);
    if (!item) return console.log("You don't have that item.");
    if (!(item instanceof Food)) return console.log("You can't eat that!");
    this.items = this.items.filter(i => i !== item);
    this.health += 5; // Eating restores health
    console.log(`${this.name} eats ${itemName}. Health is now ${this.health}`);
  }
}

module.exports = {
  Character,
};
