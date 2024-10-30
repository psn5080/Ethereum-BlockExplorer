# Minimalistic Ethereum Block Explorer

## [Live Url](https://chainscan-seven.vercel.app/)

## Overview

This project is a minimalistic Ethereum block explorer that allows users to view recent blocks and transactions, search for account balances, and retrieve NFT metadata. The application is built using React and leverages the Alchemy SDK for interacting with the Ethereum blockchain.

## Features

- ✅ Display ten recent blocks and transactions on the homepage.
- ✅ Allow users to click on a block number to get the block's details, including its list of transactions.
  - ✅ From the list of transactions, allow users to click on specific transactions to get the details of the transaction.
- ✅ Make an accounts page where a user can look up their balance or someone else's balance.
- ✅ Given a contract address and token id, retrieve the NFT's metadata.
- ✅ Display the floor price of an NFT.

## More Todo

- Did a pending transaction get mined?
- What transfers did an address receive this year?

## Project Structure
blockexplorer/
├── package.json
├── postcss.config.js
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── README.md
├── src/
│   ├── App.css
│   ├── App.js
│   ├── assets/
│   ├── components/
│   │   ├── AccountBalance.jsx
│   │   ├── AccountTxs.jsx
│   │   ├── Block.jsx
│   │   ├── Blocks.jsx
│   │   ├── Header.jsx
│   │   ├── Nft.jsx
│   │   ├── Search.jsx
│   │   ├── Transaction.jsx
│   │   └── Transactions.jsx
│   ├── helper.js
│   ├── index.css
│   ├── index.js
│   ├── services.js
│   └── tailwind.config.js


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/blockexplorer.git
    cd blockexplorer
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your Alchemy and Etherscan API keys:
    ```env
    REACT_APP_ALCHEMY_API_KEY=your_alchemy_api_key
    REACT_APP_ETHERSCAN_API_KEY=your_etherscan_api_key
    ```

4. Start the development server:
    ```sh
    npm start
    ```

## Usage

### Home Page

The home page displays the ten most recent blocks and transactions. Clicking on a block number navigates to the block details page, and clicking on a transaction hash navigates to the transaction details page.

### Account Balance

Navigate to `/account-balance` to search for an Ethereum account balance. Enter an Ethereum address and click "Search" to retrieve the balance.

### Block Details

Navigate to `/block/:blockNumber` to view details of a specific block. The page displays information such as the block hash, gas limit, gas used, and a list of transactions in the block.

### Transaction Details

Navigate to `/transaction/:txHash` to view details of a specific transaction. The page displays information such as the block hash, from and to addresses, value, gas price, and more.

### Account Transactions

Navigate to `/transactions/:address` to view the transactions of a specific account. The page lists the transactions involving the specified address.

### NFT Metadata

Navigate to `/nft` to search for NFT metadata. Enter the contract address and token ID of the NFT to retrieve its metadata, including the image, collection name, floor price, and description.

## API Integration

### Alchemy SDK

The project uses the Alchemy SDK to interact with the Ethereum blockchain. The SDK is configured in [`src/services.js`](src/services.js):

```javascript
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

export const alchemy = new Alchemy(settings);
```

### Etherscan API
The project uses the Etherscan API to fetch account transactions. The API key is stored in the .env file and used in src/services.js

## Components

### Header

The [`Header`](src/components/Header.jsx) component contains the navigation links to different pages of the application.

### Search

The [`Search`](src/components/Search.jsx) component is a reusable search input used in various pages to search for account balances and NFT metadata.

### Blocks

The [`Blocks`](src/components/Blocks.jsx) component displays the ten most recent blocks.

### Block

The [`Block`](src/components/Block.jsx) component displays the details of a specific block.

### Transactions

The [`Transactions`](src/components/Transactions.jsx) component displays the ten most recent transactions.

### Transaction

The [`Transaction`](src/components/Transaction.jsx) component displays the details of a specific transaction.

### AccountBalance

The [`AccountBalance`](src/components/AccountBalance.jsx) component allows users to search for an Ethereum account balance.

### AccountTxs

The [`AccountTxs`](src/components/AccountTxs.jsx) component displays the transactions of a specific account.

### Nft

The [`Nft`](src/components/Nft.jsx) component allows users to search for NFT metadata.