import React, { useState } from "react";
import { joinClasses } from "../helper";
import { getNftMetadata } from "../services";
import Search from "./Search";

const Nft = () => {
    const [nftMetadata, setNftMetadata] = useState();
    const [inputValues, setInputValues] = useState({});
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!inputValues.nftAddress || !inputValues.tokenId) {
            alert("Both fields are required");
            return;
        }
        try {
            const _nftMetadata = await getNftMetadata(
                inputValues.nftAddress.toString(),
                inputValues.tokenId.toString()
            );
            setNftMetadata(_nftMetadata);
            setError(null);
        } catch (err) {
            setError("Failed to fetch NFT metadata. Please try again.");
            console.error(err);
        }
    };

    return (
        <div>
            <div className="text-center my-10 text-3xl">Search NFT</div>
            <p className="text-center">
                Note: Only NFTs listed on OpenSea are supported
            </p>
            <form
                onSubmit={handleSearch}
                className="flex flex-col gap-5 items-center"
            >
                <input
                    type="text"
                    placeholder="NFT Address"
                    name="nftAddress"
                    onChange={handleChange}
                    className={joinClasses(
                        "w-1/2",
                        "p-3",
                        "rounded",
                        "bg-gray-200",
                        "focus:outline-blue-500"
                    )}
                />
                <input
                    type="text"
                    placeholder="Token ID"
                    name="tokenId"
                    onChange={handleChange}
                    className={joinClasses(
                        "w-1/2",
                        "p-3",
                        "rounded",
                        "bg-gray-200",
                        "focus:outline-blue-500"
                    )}
                />
                <input
                    type="submit"
                    value="Search"
                    className={joinClasses(
                        "bg-blue-400",
                        "text-white",
                        "rounded-md",
                        "p-3"
                    )}
                />
            </form>
            {error && <div className="text-red-500 text-center">{error}</div>}
            {/* Display NFT */}
            {nftMetadata && (
                <div
                    className={joinClasses(
                        "flex",
                        "flex-col",
                        "items-center",
                        "gap-2",
                        "my-10"
                    )}
                >
                    <img
                        className="object-contain"
                        src={nftMetadata.openSea.imageUrl}
                        alt="NFT"
                    />
                    <div>
                        NFT Address:{" "}
                        <span className="text-blue-500">
                            {nftMetadata.address}
                        </span>
                    </div>
                    <div>
                        Collection Name:{" "}
                        <span className="text-blue-500">
                            {nftMetadata.name}
                        </span>
                    </div>
                    <div>
                        Floor Price:{" "}
                        <span className="text-blue-500">
                            {nftMetadata.openSea.floorPrice} ETH
                        </span>
                    </div>
                    <div>
                        Description:{" "}
                        <span className="text-gray-500">
                            {nftMetadata.openSea.description}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Nft;
