export type Asset = {
  symbol: string;
  name: string;
  price: string;
  change: string;
  holding: string;
  value: string;
  positive: boolean;
};

export type Activity = {
  type: string;
  asset: string;
  amount: string;
  time: string;
  status: "Completed" | "Processing" | "Pending";
};