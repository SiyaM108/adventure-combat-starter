const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    const item = this.currentRoom.getItemByName(itemName);
    if (!item) {
      console.log(`There is no ${itemName} here.`);
      return;
    }
    this.items.push(item);
    this.currentRoom.items = this.currentRoom.items.filter(i => i !== item);
    console.log(`You picked up the ${itemName}.`);
  }

  dropItem(itemName) {
    const item = this.getItemByName(itemName);
    if (!item) {
      console.log(`You don't have ${itemName}.`);
      return;
    }
    this.items = this.items.filter(i => i !== item);
    this.currentRoom.items.push(item);
    console.log(`You dropped the ${itemName}.`);
  }

  eatItem(itemName) {
    const item = this.getItemByName(itemName);
    if (!item) {
      console.log(`You don't have ${itemName}.`);
      return;
    }
    if (!(item instanceof Food)) {
      console.log(`You can't eat the ${itemName}!`);
      return;
    }
    this.items = this.items.filter(i => i !== item);
    this.health += 5; // Eating restores health
    console.log(`You eat the ${itemName}. Health is now ${this.health}.`);
  }


  getItemByName(name) {
    return this.items.find(item => item.name === name) || null;
  }

  hit(name) {
    if (!this.currentRoom.enemies) {
      console.log("There are no enemies here.");
      return;
    }

    const enemy = this.currentRoom.enemies.find(e => e.name === name);
    if (!enemy) {
      console.log(`No enemy named ${name} here.`);
      return;
    }

    console.log(`You hit ${enemy.name} for ${this.strength} damage!`);
    enemy.applyDamage(this.strength);

    if (enemy.isAlive()) {
      enemy.target = this; // Enemy will attack you back
    } else {
      console.log(`${enemy.name} has been defeated!`);
    }
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
