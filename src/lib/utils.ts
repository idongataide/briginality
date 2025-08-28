import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatChatTimestamp(timestamp: string): { dateCategory: string, time: string } {
  const messageDate = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const time = messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  let dateCategory: string;

  if (messageDate.toDateString() === today.toDateString()) {
    dateCategory = "Today";
  } else if (messageDate.toDateString() === yesterday.toDateString()) {
    dateCategory = "Yesterday";
  } else {
    dateCategory = messageDate.toLocaleDateString('en-US');
  }

  return { dateCategory, time };
} 