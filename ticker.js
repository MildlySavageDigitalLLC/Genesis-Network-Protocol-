function renderDebtTicker() {
  const container = document.createElement("div");
  container.id = "debt-ticker";
  container.style = `
    margin-top: 2em;
    padding: 1em;
    border: 2px solid #c62828;
    border-radius: 8px;
    background-color: #001e3c;
    color: white;
    font-family: Orbitron;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    overflow: hidden;
  `;

  const title = document.createElement("h3");
  title.innerText = "💸 Simulated Debt Clock";
  title.style = "color: #c62828; font-size: 1em; margin-bottom: 0.5em;";
  container.appendChild(title);

  const ticker = document.createElement("p");
  ticker.id = "ticker-value";
  ticker.style = "font-size: 1.2em; margin-top: 0.2em; word-break: break-word;";
  container.appendChild(ticker);

  const resetBtn = document.createElement("button");
    localStorage.removeItem("simDebt");
    location.reload();
  };
  container.appendChild(resetBtn);

  document.body.appendChild(container);

  let currentDebt = parseInt(localStorage.getItem("simDebt")) || 37118960379748;
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
