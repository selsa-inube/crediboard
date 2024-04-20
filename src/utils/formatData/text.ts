const truncateTextToMaxLength = (text: string, maxLength = 50) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

function capitalizeFirstLetter(text: string) {
  return text
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export { truncateTextToMaxLength, capitalizeFirstLetter };
