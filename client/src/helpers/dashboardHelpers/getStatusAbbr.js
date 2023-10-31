export const getStatusAbbr = (status) => {
  const words = status.split(" ");
  const abbr = words.map((word) => word.slice(0, 1)).join("");
  return abbr.length > 1 ? abbr : words[0].slice(0, 3);
};
