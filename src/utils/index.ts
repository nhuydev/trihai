// create function format number
export const currencyFormat = (number: any) => {
  return number?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};
