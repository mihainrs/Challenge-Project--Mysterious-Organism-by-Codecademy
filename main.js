// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};


const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,
    mutate() {
      const index = Math.floor(Math.random() * this.dna.length);
      let newBase = returnRandBase();
      while (this.dna[index] === newBase) {
        newBase = returnRandBase();
      }
      this.dna[index] = newBase;
      return this.dna;
    },
    compareDNA(otherPAequor) {
      let common = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherPAequor.dna[i]) {
          common++;
        }
      }
      const percentage = (common / this.dna.length) * 100;
      console.log(`specimen #${this.specimenNum} and specimen #${otherPAequor.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`);
    },
    willLikelySurvive() {
      const count = this.dna.filter(base => base === 'C' || base === 'G').length;
      return (count / this.dna.length) >= 0.6;
    }
  };
};

const survivingSpecimens = [];
let id = 1;
while (survivingSpecimens.length < 30) {
  const newOrganism = pAequorFactory(id, mockUpStrand());
  if (newOrganism.willLikelySurvive()) {
    survivingSpecimens.push(newOrganism);
  }
  id++;
}

// console.log(mockUpStrand());