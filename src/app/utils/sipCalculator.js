export function calculateSIP(navs, amount, from, to) {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  let totalUnits = 0;
  let totalInvested = 0;
  navs.forEach(navObj => {
    const navDate = new Date(navObj.date);
    if (navDate >= fromDate && navDate <= toDate) {
      const units = amount / parseFloat(navObj.nav);
      totalUnits += units;
      totalInvested += amount;
    }
  });
  const latestNAV = parseFloat(navs[0].nav);
  const currentValue = totalUnits * latestNAV;
  const absoluteReturn = ((currentValue - totalInvested) / totalInvested) * 100;
  const years = (toDate - fromDate) / (1000 * 60 * 60 * 24 * 365);
  const annualizedReturn = Math.pow(currentValue / totalInvested, 1 / years) - 1;
  return { totalInvested, currentValue, absoluteReturn, annualizedReturn };
}