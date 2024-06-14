/**
 * 
 * @param {Number} uptimeInSeconds number of seconds 
 * @returns fomatted readable string
 */
const formatUptime = (uptimeInSeconds) => {
  const days = Math.floor(uptimeInSeconds / (3600 * 24));
  const hours = Math.floor((uptimeInSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeInSeconds % 60);

  const uptimeString = [];
  if (days > 0) uptimeString.push(`${days} days`);
  if (hours > 0) uptimeString.push(`${hours} hours`);
  if (minutes > 0) uptimeString.push(`${minutes} minutes`);
  uptimeString.push(`${seconds} seconds`);

  return uptimeString.join(", ");
};

module.exports = {
  formatUptime,
};
