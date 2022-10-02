// create function format number
export const currencyFormat = (number: any) => {
  return number?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};
export const downloadFile = (fileLink: string) => {
  // Create blob link to download
  const url = window.URL.createObjectURL(new Blob([fileLink]));
  const link: any = document.createElement("a");
  link.href = url;
  // console.log("🚀 downloadFile ~ url", url);
  link.setAttribute("download", fileLink);

  // Append to html link element page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up and remove the link
  link.parentNode.removeChild(link);
};
