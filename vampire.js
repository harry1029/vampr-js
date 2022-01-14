class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let num = 0;
    if (this.creator === null) {
      return num;
    } else {
      num++;
      return num + this.creator.numberOfVampiresFromOriginal;
    }
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let currentVampire = this;
    if (currentVampire.creator === null || vampire.creator === null) {
      return currentVampire;
    }

    if (currentVampire.name === vampire.name) {
      return currentVampire;
    }

    while(currentVampire.numberOfVampiresFromOriginal !== vampire.numberOfVampiresFromOriginal) {

      if (currentVampire.creator.name === vampire.name) {
        return vampire;
      } else if (currentVampire.name === vampire.creator.name) {
        return currentVampire;
      }

      if (currentVampire.numberOfVampiresFromOriginal > vampire.numberOfVampiresFromOriginal) {
        currentVampire = currentVampire.creator;
      } else if (currentVampire.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
        vampire = vampire.creator;
      }
    }

    while(currentVampire.creator.name !== vampire.creator.name) {
      currentVampire = currentVampire.creator;
      vampire = vampire.creator;
    }

    if (currentVampire.creator.name === vampire.creator.name) {
      return currentVampire.creator;
    }
  }
}

module.exports = Vampire;