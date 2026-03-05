function formatDate(date) {
  if (!date) return "";
  
  const dateObj = new Date(date);
  
  const options = { year: "numeric", month: "short", day: "numeric" };
  return dateObj.toLocaleDateString("en-US", options);
}

export default formatDate;
