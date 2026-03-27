// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Format percentage
export const formatPercentage = (value) => {
  return `${value.toFixed(2)}%`;
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

// Get initials from name
export const getInitials = (name) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default {
  formatCurrency,
  formatDate,
  formatPercentage,
  truncateText,
  getInitials,
};
