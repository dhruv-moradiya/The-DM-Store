export function getDate(timeStamp) {
  console.log("timeStamp", timeStamp)
  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const milliseconds = timeStamp * 1000;
  const date = new Date(milliseconds).getDate();
  const month = monthsArray[new Date(milliseconds).getMonth()];
  const year = new Date(milliseconds).getFullYear();

  return `${month} ${date}, ${year}`;
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}