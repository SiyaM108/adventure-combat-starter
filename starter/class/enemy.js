const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, currentRoom); // Call Character constructor
    this.description = description; // optional extra description
    this.cooldown = 0;
    this.player = null; // reference to the player
    this.health = 10;   // or any default value
  }


  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    // pick a random exit from current room and move there
    const exits = Object.keys(this.currentRoom.exits);
    if (exits.length === 0) return;

    const dir = exits[Math.floor(Math.random() * exits.length)];
    this.currentRoom = this.currentRoom.exits[dir];
    this.alert(`${this.name} moves ${dir} to ${this.currentRoom.name}`);
    this.cooldown += 1000;
  }

  takeSandwich() {
    // pick up food if present in room
    const sandwich = this.currentRoom.items.find(item => item.name === "sandwich");
    if (sandwich) {
      this.items.push(sandwich);
      this.currentRoom.items = this.currentRoom.items.filter(i => i !== sandwich);
      this.alert(`${this.name} takes the sandwich!`);
      this.cooldown += 1000;
    }
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(`${this.name} attacks ${this.player.name}!`);
      this.player.applyDamage(this.strength || 1);
      this.cooldown += 1000;
    }
  }

  applyDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      console.log(`${this.name} has died!`);
    } else {
      this.alert(`${this.name} takes ${amount} damage! Health is now ${this.health}`);
    }
  }

  act() {
    if (this.health <= 0) return; // dead

    if (this.cooldown > 0) {
      this.rest();
      return;
    }

    // Example sequence
    this.scratchNose();
    this.takeSandwich();
    if (this.player && this.player.currentRoom === this.currentRoom) {
      this.attack();
    }

    this.rest();
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
