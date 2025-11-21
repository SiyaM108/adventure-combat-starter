// character.js
class Character {
  constructor(name, currentRoom, health = 10, strength = 1) {
    this.name = name;
    this.currentRoom = currentRoom;
    this.health = health;
    this.strength = strength;
    this.items = [];
  }

  getItemByName(name) {
    return this.items.find(item => item.name.toLowerCase() === name.toLowerCase()) || null;
  }

  isAlive() {
    return this.health > 0;
  }

  applyDamage(amount) {
    this.health -= amount;
    if (this.health < 0) this.health = 0;
  }
}

module.exports = { Character };
