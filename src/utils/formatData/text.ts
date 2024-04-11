const truncateTextToMaxLength = (text: string, maxLength = 50) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export { truncateTextToMaxLength };
