import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// USD to INR conversion (1 USD = 83 INR)
const USD_TO_INR_RATE = 83;

export function convertToINR(usdAmount: number): number {
  return Math.round(usdAmount * USD_TO_INR_RATE);
}

export function formatINRPrice(usdAmount: number): string {
  const inrAmount = convertToINR(usdAmount);
  return `₹${inrAmount.toLocaleString('en-IN')}`;
}
