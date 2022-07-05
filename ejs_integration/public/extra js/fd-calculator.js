calculateResult = () => {
  let amount = document.getElementById("fixed_deposit").value;
  let years = document.getElementById("tenure").value;
  let returnRate = document.getElementById("return_rate").value;
  let i = returnRate / 1200;

  let wealthGained = 0;
  total = 0;
  maturityValue = 0;
  console.log(years);

  wealthGained = Math.round(
    amount * (Math.pow(1 + returnRate / 100, years) - 1)
  );
  total = amount;
  totalValue = parseInt(total) + wealthGained;

  console.log(wealthGained);
  console.log(total);
  console.log(totalValue);

  document.getElementById("ansInvested").innerHTML = total;
  document.getElementById("ansReturns").innerHTML = wealthGained;
  document.getElementById("ansMaturity").innerHTML = totalValue;

  if (years > 1) document.getElementById("ym").innerHTML = "years";
  else {
    console.log(years);
    document.getElementById("ym").innerHTML = "year";
  }

  var xValues = ["Est. Returns", "Amount Invested"];
  var yValues = [wealthGained, total];
  var barColors = ["#5D3FD3", "#ADD8E6"];

  new Chart("myChart", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
          borderWidth: 0,
          hoverOffset: 0,
        },
      ],
    },
  });
};
