calculateResult = () => {
  let amount = document.getElementById("investment").value;
  let years = document.getElementById("tenure").value / 12;
  let returnRate = document.getElementById("return_rate").value;
  let i = returnRate / 1200;

  let wealthGained = 0;
  total = 0;
  maturityValue = 0;

  wealthGained = Math.round(
    amount * ((Math.pow(1 + i, years * 12) - 1) / i) * (1 + i)
  );
  total = amount * 12 * years;

  maturityValue = wealthGained - total;

  console.log(wealthGained);
  console.log(total);
  console.log(maturityValue);

  document.getElementById("ansInvested").innerHTML = total;
  document.getElementById("ansReturns").innerHTML = maturityValue;

  var xValues = ["Est. Returns", "Amount Invested"];
  var yValues = [maturityValue, total];
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
