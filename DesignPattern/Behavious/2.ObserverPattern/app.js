class Sailor {
  constructor(nameSailor) {
    this.name = nameSailor;
  }

  doSomeThing(message) {
    console.log(`${this.name} see captain ${message}`);
  }

  updateStatus(message) {
    this.doSomeThing(message);
  }
}

class Captain {
  constructor(nameCaptain) {
    this.nameCaptain = nameCaptain;
    this.sailorList = [];
  }

  addObserver(observer) {
    this.sailorList.push(observer);
  }

  notifyForSailor(message) {
    for (const observer of this.sailorList) {
      observer.updateStatus(message);
    }
  }

  getInfoPirateCrew() {
    return `Im ${this.nameCaptain}, Im pirate captain. I have ${
      this.sailorList.length
    } peoples in the gang, include ${this.sailorList.map(
      (sailor) => sailor.name
    )}`;
  }
}

const zoro = new Sailor("Roronoa Zoro");
const sanji = new Sailor("Sanji");
const brook = new Sailor("Brook");
const nami = new Sailor("Nami");
const robin = new Sailor("Robin");

const luffy = new Captain("Luffy");
luffy.addObserver(zoro);
luffy.addObserver(sanji);
luffy.addObserver(brook);
luffy.addObserver(nami);
luffy.addObserver(robin);

luffy.notifyForSailor("eating meat");

// console.log(luffy.getInfoPirateCrew());
