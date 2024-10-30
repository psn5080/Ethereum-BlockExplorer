import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";

// Lazy load components
const Blocks = lazy(() => import("./components/Blocks"));
const Transactions = lazy(() => import("./components/Transactions"));
const Block = lazy(() => import("./components/Block"));
const Transaction = lazy(() => import("./components/Transaction"));
const AccountTxs = lazy(() => import("./components/AccountTxs"));
const AccountBalance = lazy(() => import("./components/AccountBalance"));
const Nft = lazy(() => import("./components/Nft"));

function App() {
    return (
        <div>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="flex justify-evenly my-10">
                                <Blocks />
                                <Transactions />
                            </div>
                        }
                    />
                    <Route path="/account-balance" element={<AccountBalance />} />
                    <Route path="/block/:blockNumber" element={<Block />} />
                    <Route path="/transaction/:txHash" element={<Transaction />} />
                    <Route path="/transactions/:address" element={<AccountTxs />} />
                    <Route path="/nft" element={<Nft />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;