import type { Activity, Asset } from "./types";

export const assets: Asset[] = [
  { symbol: "BTC", name: "Bitcoin", price: "$67,842.16", change: "+2.84%", holding: "0.8421 BTC", value: "$57,120.34", positive: true },
  { symbol: "ETH", name: "Ethereum", price: "$3,421.78", change: "+1.92%", holding: "4.810 ETH", value: "$16,458.75", positive: true },
  { symbol: "SOL", name: "Solana", price: "$181.42", change: "+4.18%", holding: "28.40 SOL", value: "$5,152.33", positive: true },
  { symbol: "USDT", name: "Tether", price: "$1.00", change: "+0.01%", holding: "12,460.00 USDT", value: "$12,460.00", positive: true },
  { symbol: "BNB", name: "BNB", price: "$612.39", change: "-0.64%", holding: "8.42 BNB", value: "$5,154.32", positive: false }
];

export const activities: Activity[] = [
  { type: "Deposit", asset: "USDT", amount: "+ 4,500.00 USDT", time: "Today, 14:32", status: "Completed" },
  { type: "Trade", asset: "BTC / USDT", amount: "0.0842 BTC", time: "Today, 11:18", status: "Completed" },
  { type: "Transfer", asset: "ETH", amount: "− 1.20 ETH", time: "Yesterday, 19:44", status: "Processing" },
  { type: "Deposit", asset: "BTC", amount: "+ 0.1200 BTC", time: "Sep 29, 08:12", status: "Completed" }
];

export const marketRows = [
  ["BTC/USDT", "$67,842.16", "+2.84%", "$42.8B"],
  ["ETH/USDT", "$3,421.78", "+1.92%", "$18.4B"],
  ["SOL/USDT", "$181.42", "+4.18%", "$6.7B"],
  ["BNB/USDT", "$612.39", "-0.64%", "$2.8B"],
  ["XRP/USDT", "$0.6124", "+1.18%", "$1.9B"],
  ["ADA/USDT", "$0.4821", "-0.21%", "$744M"]
];