// ticker.js

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

  const title = document.createElement("h3");
  title.innerText = "💸 Symbolic Debt Clock";
  title.style.color = "#c62828";
  container.appendChild(title);

  const ticker = document.createElement("p");
  ticker.id = "ticker-value";
  ticker.style.fontSize = "1.5em";
  ticker.style.marginTop = "1em";
  container.appendChild(ticker);

  document.body.appendChild(container);

  let currentDebt = 37_118_834_059_640; // Starting symbolic value
  const ratePerSecond = 100_000; // Approximate increase per second

  function updateTicker() {
    currentDebt += ratePerSecond;
    ticker.innerText = `$${currentDebt.toLocaleString()}`;
  }

  updateTicker();
  setInterval(updateTicker, 0001);
}

window.addEventListener("load", renderDebtTicker);
