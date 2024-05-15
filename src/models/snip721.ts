export type Nft721Attribute = {
    trait_type: string;
    value: string;
}

export type Nft721Meta = {
    name: string;
    description: string;
    attributes: Nft721Attribute[]; 
    image: string;
    is_listable: string;
    ipfsFile: string,
    price: string;
    token_subtype: string;
    id: string;
    private: Nft721Attribute[];
}

export type NftRoyalty = {
    recipient: string;
    rate: number;
}