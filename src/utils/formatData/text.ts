const truncateTextToMaxLength = (text: string, maxLength = 50) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

function capitalizeFirstLetter(text: string) {
  return text.toLowerCase().replace(/\b\w/g, (word) => word.toUpperCase());
}

export { truncateTextToMaxLength, capitalizeFirstLetter };
