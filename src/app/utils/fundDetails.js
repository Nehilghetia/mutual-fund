export const riskLevels = ['Low', 'Low to Moderate', 'Moderate', 'Moderately High', 'High', 'Very High'];

export const getEnhancedFundDetails = (schemeCode) => {
    // Use schemeCode as a seed for stable random values
    const seed = parseInt(schemeCode) || 0;

    // Risk Ratings
    const riskIndex = seed % riskLevels.length;

    // 1Y Return: Between -10% and +60%
    const returnVal = ((seed % 700) / 10) - 10;

    // Expense Ratio: Between 0.1% and 2.5%
    const expenseRatio = ((seed % 240) / 100) + 0.1;

    // NAV: Between 10 and 500 (just a fallback if not fetched)
    const navValue = ((seed % 4900) / 10) + 10;

    // Pro Fields (Moneycontrol style simulated)
    const aum = ((seed % 500000) / 10) + 500; // 500 Cr to 50,000 Cr
    const inceptionYear = 2000 + (seed % 24);
    const managers = ['Mahesh Patil', 'Sankaran Naren', 'Rajat Chandak', 'Hitesh Sethia', 'Anish Tawakley'];
    const manager = managers[seed % managers.length];

    // Multi-year returns
    const threeYear = ((seed % 1500) / 100) + 12; // 12% to 27%
    const fiveYear = ((seed % 1000) / 100) + 10; // 10% to 20%

    return {
        riskRating: riskLevels[riskIndex],
        riskScore: riskIndex,
        oneYearReturn: returnVal.toFixed(2),
        threeYearReturn: threeYear.toFixed(2),
        fiveYearReturn: fiveYear.toFixed(2),
        expenseRatio: expenseRatio.toFixed(2),
        nav: navValue.toFixed(4),
        aum: aum.toLocaleString('en-IN'),
        inception: `Jan ${inceptionYear}`,
        manager: manager,
        exitLoad: seed % 2 === 0 ? '1% if redeemed < 30 days' : 'None'
    };
};
