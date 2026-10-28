export type Nft = {
  id: string;
  name: string;
  collection: string;
  price: string; // ETH string
  image: string;
  edition: string; // "1/50"
  editions: number;
  available: number;
  rare?: boolean;
  attributes: string[];
  description: string;
  network: string;
};

export type CartItem = {
  nft: Nft;
  quantity: number;
  edition: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  ens?: string;
};

export type Wallet = {
  id: string;
  label: string;
  network: string;
  address: string;
  type: string;
  isPrimary: boolean;
};

export type Order = {
  id: string;
  txHash: string;
  date: string;
  total: string;
  network: string;
  wallet: string;
  items: { nft: Nft; quantity: number; price: string }[];
};