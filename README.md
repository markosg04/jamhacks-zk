# jamhacks-zk

### Dependencies:

1. rust: `curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh` 
2. circom:
`git clone https://github.com/iden3/circom.git
cd circom
cargo build --release
cargo install --path circom`



### Initialize the project:
1. `npm init`
2. `npm i circomlib`
3. `npm i snarkjs`


### Workshop commands:
- Compile the circuit: `circom poseidon_hasher.circom --wasm --r1cs -o ./build`
- Powers of Tau ceremony: `wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_12.ptau`
- Proving key: `npx snarkjs groth16 setup build/poseidon_hasher.r1cs powersOfTau28_hez_final_12.ptau circuit_0000.zkey`
- Verifier key: `npx snarkjs zkey export verificationkey circuit_0000.zkey verification_key.json`
- 