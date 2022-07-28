calculateResult = () => {
  let amount = document.getElementById("fixed_deposit").value;

  let emi = document.getElementById("emi").value;
  let years = amount / (12 * emi);

  console.log(Math.ceil((years - Math.floor(years)) * 12));

  let string = Math.floor(years);
  if (years > 1) string += " years ";
  else string += " year ";

  string += Math.ceil((years - Math.floor(years)) * 12) + " months";

  document.getElementById("ansTime").innerHTML = string;
};
