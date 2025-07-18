function renderDebtTicker() {
  const container = document.createElement("div");
  container.id = "debt-ticker";
  container.style.marginTop = "2em";
  container.style.padding = "1em";
  container.style.border = "2px solid #c62828";
  container.style.borderRadius = "8px";
  container.style.backgroundColor = "#001e3c";
  container.style.color = "white";
  container.style.fontFamily = "Orbitron";
  container.style.maxWidth = "400px";
  container.style.marginLeft = "auto";
  container.style.marginRight = "auto";
  container.style.textAlign = "center";
  container.style.overflow = "hidden";

  const title = document.createElement("h3");
  title.innerText = "💸 Simulated Debt Clock";
  title.style.color = "#c62828";
  title.style.fontSize = "1em";
  title.style.marginBottom = "0.5em";
  container.appendChild(title);

  const ticker = document.createElement("p");
  ticker.id = "ticker-value";
  ticker.style.fontSize = "1.2em";
  ticker.style.marginTop = "0.2em";
  ticker.style.marginBottom = "0";
  ticker.style.wordBreak = "break-word";
  ticker.style.lineHeight = "1.2em";
  container.appendChild(ticker);

  document.body.appendChild(container);

  let currentDebt = 37112901379748; // Starting value
  const ratePerTick = 100000; // Increase per update
  const interval = 2000; // 2 seconds

  function updateTicker() {
    currentDebt += ratePerTick;
    ticker.innerText = `$${currentDebt.toLocaleString()}`;
  }

  setInterval(updateTicker, interval);
}

window.addEventListener("DOMContentLoaded", renderDebtTicker);
