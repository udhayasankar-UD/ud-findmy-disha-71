// src/lib/dateUtils.ts
import { formatDistanceToNow, parseISO } from 'date-fns';

export const formatPostedDate = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return 'Recently';
  }
  try {
    // Assuming the date is in a format parseISO can handle, like YYYY-MM-DD
    const date = parseISO(dateString);
    return `${formatDistanceToNow(date)} ago`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return 'Recently';
  }
};