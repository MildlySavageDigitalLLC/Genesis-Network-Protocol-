async function fetchLiveDebt() {
  try {
    const res = await fetch("https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&page[size]=1");
    const data = await res.json();
    const rawDebt = data.data[0].total_public_debt_outstanding;
    return parseInt(rawDebt.replace(/\D/g, ""));
  } catch (err) {
    console.error("Debt API error:", err);
    return parseInt(localStorage.getItem("simDebt")) || 37122978000000;
  }
}

async function renderDebtTicker() {
  const ticker = document.getElementById("ticker-value");
  let currentDebt = await fetchLiveDebt();
  localStorage.setItem("simDebt", currentDebt);

  const ratePerTick = 100000;
  const interval = 2000;

  function updateTicker() {
    currentDebt += ratePerTick;
    ticker.innerText = `$${currentDebt.toLocaleString()}`;
    localStorage.setItem("simDebt", currentDebt);
  }

  updateTicker();
  setInterval(updateTicker, interval);
}

window.addEventListener("DOMContentLoaded", renderDebtTicker);
