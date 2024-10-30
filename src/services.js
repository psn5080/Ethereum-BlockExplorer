import { Alchemy, Network } from "alchemy-sdk";
import { formatEther } from "./helper";

const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY;
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);

/**
 * Fetches the last ten blocks from the Ethereum blockchain.
 * @returns {Promise<Array>} An array of block objects.
 */
export const getLastTenBlocks = async () => {
    try {
        const lastTenBlocks = [];
        const latestBlock = await alchemy.core.getBlockNumber();
        const blockPromises = [];

        for (let block = latestBlock; block > latestBlock - 10; block--) {
            blockPromises.push(alchemy.core.getBlock(block));
        }

        return await Promise.all(blockPromises);
    } catch (error) {
        console.error("Error fetching last ten blocks:", error);
        return [];
    }
};

/**
 * Fetches the last ten transactions from the latest block.
 * @returns {Promise<Array>} An array of transaction objects.
 */
export const getLastTenTxs = async () => {
    try {
        const latestBlockNumber = await alchemy.core.getBlockNumber();
        const latestBlock = await alchemy.core.getBlock(latestBlockNumber);

        const txPromises = latestBlock.transactions.slice(0, 10).map(txHash =>
            alchemy.transact.getTransaction(txHash)
        );

        return await Promise.all(txPromises);
    } catch (error) {
        console.error("Error fetching last ten transactions:", error);
        return [];
    }
};

/**
 * Fetches details of a specific block by block number.
 * @param {number} blockNumber - The block number to fetch.
 * @returns {Promise<Object>} The block object.
 */
export const getIndividualBlock = async (blockNumber) => {
    try {
        return await alchemy.core.getBlock(parseInt(blockNumber));
    } catch (error) {
        console.error(`Error fetching block ${blockNumber}:`, error);
        return null;
    }
};

/**
 * Fetches details of a specific transaction by transaction hash.
 * @param {string} txhash - The transaction hash to fetch.
 * @returns {Promise<Object>} The transaction object.
 */
export const getIndividualTransaction = async (txhash) => {
    try {
        return await alchemy.transact.getTransaction(txhash);
    } catch (error) {
        console.error(`Error fetching transaction ${txhash}:`, error);
        return null;
    }
};

/**
 * Fetches the balance of a specific Ethereum account.
 * @param {string} address - The Ethereum address to fetch the balance for.
 * @returns {Promise<string>} The account balance in wei.
 */
export const getAccountBalance = async (address) => {
    try {
        return await alchemy.core.getBalance(address, "latest");
    } catch (error) {
        console.error(`Error fetching balance for address ${address}:`, error);
        return "0";
    }
};

/**
 * Fetches the transaction history of a specific Ethereum account.
 * @param {string} address - The Ethereum address to fetch transactions for.
 * @returns {Promise<Array>} An array of transaction objects.
 */
export const getAccountTxs = async (address) => {
    try {
        const API_ENDPOINT = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=20&sort=asc&apikey=${ETHERSCAN_API_KEY}`;

        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        return data.result || [];
    } catch (error) {
        console.error(`Error fetching transactions for address ${address}:`, error);
        return [];
    }
};

/**
 * Fetches metadata for a specific NFT.
 * @param {string} nftAddress - The contract address of the NFT.
 * @param {string} tokenId - The token ID of the NFT.
 * @returns {Promise<Object>} The NFT metadata object.
 */
export const getNftMetadata = async (nftAddress, tokenId) => {
    try {
        return await alchemy.nft.getContractMetadata(nftAddress, tokenId);
    } catch (error) {
        console.error(`Error fetching NFT metadata for ${nftAddress} with token ID ${tokenId}:`, error);
        return null;
    }
};