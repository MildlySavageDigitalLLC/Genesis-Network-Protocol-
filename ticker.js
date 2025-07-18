function renderDebtTicker() {
  const ticker = document.getElementById("ticker-value");

  // Start from latest debt value if no prior session
  let currentDebt = parseInt(localStorage.getItem("simDebt")) || 37120000000000;
  const ratePerTick = 100000; // $100K every 2 seconds
  const interval = 2000; // 2 seconds

  function updateTicker() {
    currentDebt += ratePerTick;
    ticker.innerText = `$${currentDebt.toLocaleString()}`;
    localStorage.setItem("simDebt", currentDebt);
  }

  updateTicker(); // initial render
  setInterval(updateTicker, interval);
}

window.addEventListener("DOMContentLoaded", renderDebtTicker);
