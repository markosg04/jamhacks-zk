const snarkjs = require('snarkjs');
const circomlibjs = require('circomlibjs')
const fs = require('fs');

async function runTest(preImage) {

  /**
   * Generate hash
   */
   const poseidon = await circomlibjs.buildPoseidon();
   const hash = poseidon.F.toString(poseidon([preImage]));
  /**
   * Generate proof
   */
    const { publicSignals, proof } = await snarkjs.groth16.fullProve(
      { in: preImage, hash: hash }, 
      "build/poseidon_hasher_js/poseidon_hasher.wasm", 
      "circuit_0000.zkey");
    console.log(publicSignals);
    console.log(proof);

    /**
     * Verify proof
     */
     const vKey = JSON.parse(fs.readFileSync("verification_key.json"));

     const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

     if (res) {
      console.log("Verification OK");
    } else {
      console.log("Invalid proof");
    }
}

runTest(10).catch((err) => {
    console.error(err);
});