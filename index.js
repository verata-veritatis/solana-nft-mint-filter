const { Connection, PublicKey } = require("@solana/web3.js");

// Token Program
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

// Import hash list.
// THIS IS A SAMPLE OF 100 DEGEN APE MINT HASHES.
const HASH_LIST = require('./hashes.json');

// Setup the connection.
const connection = new Connection("https://api.metaplex.solana.com/");

// Which wallet are we checking?
const target = new PublicKey(`Avooe3wrH2zYVCHav7BLzMgEaFHhF4FDxPtsGX8egwgC`)

// Runnnnnnnn
const getOwnedTokens = async () => {
    return await connection.getParsedTokenAccountsByOwner(target, {
        programId: TOKEN_PROGRAM_ID,
    }).then(
        result => result.value
    ).then(
        tokens => tokens.filter(i => i.account.data.parsed.info.tokenAmount.uiAmount > 0)
    ).then(
        tokens => tokens.map(i => i.account.data.parsed.info.mint)
    ).then(
        hashes => hashes.filter(i => HASH_LIST.includes(i))
    );
};

getOwnedTokens().then(result => console.dir(result, { depth: null }));