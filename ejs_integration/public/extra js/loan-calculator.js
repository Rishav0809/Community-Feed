calculateResult = () => {
  let amount = document.getElementById("fixed_deposit").value;
  let years = document.getElementById("tenure").value;
  let returnRate = document.getElementById("return_rate").value;

  let principal = amount;
  let interest = returnRate / 100 / 12;
  let payments = years * 12;

  console.log(principal);

  let x = Math.pow(1 + interest, payments);
  let monthly = (principal * x * interest) / (x - 1);

  let total = monthly * 12 * years;

  document.getElementById("ansLoan").innerHTML = principal;
  document.getElementById("ansEMI").innerHTML = monthly.toFixed(0);
  document.getElementById("ansInt").innerHTML = total.toFixed(0);

  if (years > 1) document.getElementById("ym").innerHTML = "years";
  else {
    console.log(years);
    document.getElementById("ym").innerHTML = "year";
  }

  var xValues = ["Interest", "Loan Amount"];
  var yValues = [(total - principal).toFixed(0), principal];
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
