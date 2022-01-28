const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  Account,
  sendAndConfirmTransaction
} = require('@solana/web3.js');

const newPair = new Keypair();
console.log(newPair);

const publicKey = new PublicKey(newPair._keypair.publicKey).toString();

const secretKey = newPair._keypair.secretKey;

const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const walletKeyPair = await Keypair.fromSecretKey(secretKey);
    console.log(`---Airdropping 2 SOL --`);
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

const transferSOL = async (from, to, transferAmount) => {
  try {
    const connection  = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const userWallet = await Keypair.fromSecretKey(secretKey);
    const transaction = new Transaction().add(
      fromPubkey: new PublicKey(from.publicKey).toString(),
      toPubkey: new PublicKey(to.publicKey).toString(),
      lamports: transferAmount * LAMPORTS_PER_SOL
    );

    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      [from]
    );
    console.log(signature);
    return signature;
  } catch (err) {
    console.log(err);
  }
};

const getWalletBalance = async (pubk) => {
  try {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const balance = await connection.getBalance(new PublicKey(pubk));
    return balance/LAMPORTS_PER_SOL;
  } catch (err) {
    console.log(err);
  }
};
