class Character {
  constructor(name, currentRoom, health = 10, strength = 2) {
    this.name = name;
    this.currentRoom = currentRoom;
    this.health = health;
    this.strength = strength;
    this.items = [];
  }

  isAlive() {
    return this.health > 0;
  }

  takeDamage(amount) {
    this.health -= amount;
    console.log(`${this.name} takes ${amount} damage! Health: ${this.health}`);
    if (!this.isAlive()) {
      console.log(`${this.name} has died!`);
    }
  }

  getItemByName(name) {
    return this.items.find(item => item.name === name) || null;
  }

  attack(target) {
    if (!target || !target.isAlive()) return;
    console.log(`${this.name} attacks ${target.name} for ${this.strength} damage!`);
    target.takeDamage(this.strength);
  }
}

module.exports = {
  Character,
};
