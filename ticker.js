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
  container.style.maxWidth = "800px";
  container.style.marginLeft = "auto";
  container.style.marginRight = "auto";
  container.style.textAlign = "center";
  container.style.overflow = "hidden"; // ensures clean fit

  const title = document.createElement("h3");
  title.innerText = "💸 Symbolic Debt Clock";
  title.style.color = "#c62828";
  title.style.marginBottom = "0.5em";
  container.appendChild(title);

  const ticker = document.createElement("p");
  ticker.id = "ticker-value";
  ticker.style.fontSize = "1.8em";
  ticker.style.marginTop = "0.5em";
  ticker.style.marginBottom = "0";
  ticker.style.wordBreak = "break-word"; // prevents overflow
  ticker.style.lineHeight = "1.4em";
  container.appendChild(ticker);

  document.body.appendChild(container);

  let currentDebt = 37118834059640; // Starting symbolic value
  const ratePerSecond = 25000; // Calibrated pulse

  function updateTicker() {
    currentDebt += ratePerSecond;
    ticker.innerText = `$${currentDebt.toLocaleString()}`;
  }

  setInterval(updateTicker, 10); // 1000ms = 1 second
}
window.addEventListener("DOMContentLoaded", renderDebtTicker);
