const SHA256 = require('crypto-js/sha256');
class Block{
  constructor(index, timestamp, data, previousHash = ''){
//list of parameters of attributes of the this class
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce=0;
  }
//we have to import a library crypto-js for implementing SHA256
  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + this.nonce + JSON.stringify(this.data)).toString();
  }

//to include or implement POW in the present chain
  mineBlock(difficulty){

//The while loop will keep continuing itself until the hash string is set to certain amount of zeroes intially

    while(this.hash.substring(0,difficulty) !== Array(difficulty + 1).join("0")){
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
  }
}

//class to create the remaining blocks
class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()]; //the constructor here creates the Genesis block
    this.difficulty = 5; //difficulty has been set to 5 for now
  }
//function to create Genesis Block
  createGenesisBlock(){
    return new Block(0, "16/04/2000 , 23:48:25", "Genesis Block", "0");
  }
//function to get the current block
  getLatestBlock(){
    return this.chain[this.chain.length - 1];

  }
//function to add a new block into the chain
  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash; //this here copies the hash of the previous block into
                                                       //the previousHash attribute of the  new block

    //newBlock.hash = newBlock.calculateHash(); // this here calls the calculate hash function for new block
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

//function to check whether chain is valid or not
  isChainValid(){
    let chainLength = this.chain.length;
    for(let i=1; i<chainLength; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i-1];

//if the data is somehow being tampered

      if(currentBlock.hash !== currentBlock.calculateHash())
      {
        return false;
      }

// to check whether the previous hash of the current block is same as that of the hash of the previous block

      if(currentBlock.previousHash !== previousBlock.hash)
      {
        return false;
      }
    }
    return true;
  }

}



let eVote = new Blockchain(); //object created here

console.log("Mining Block 1...");
eVote.addBlock(new Block(1, "18/10/19 , 13:52:39", { validGovtID: "Yes" }));

console.log("Mining Block 2...");
eVote.addBlock(new Block(2, "20/10/19 , 12:24:36", { validGovtID: "Yes" }));


//eVote.chain[2].data = {validGovtID: "No"};

if(eVote.isChainValid()){
  console.log('This is a valid Blockchain');

  console.log(JSON.stringify(eVote, null, 4));

}

else{
  console.log('The Chain has been tempered');
}
