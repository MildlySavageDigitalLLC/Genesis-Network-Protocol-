// controls.js

let mintInterval = null;

function startMinting() {
  if (mintInterval) return;
  mintInterval = setInterval(checkDebtAndMint, 60000);
  updateMintStatus("Minting Active");
}

function stopMinting() {
  if (!mintInterval) return;
  clearInterval(mintInterval);
  mintInterval = null;
  updateMintStatus("Minting Paused");
}

function updateMintStatus(status) {
  const statusEl = document.getElementById("mint-status");
  if (statusEl) statusEl.innerText = `⛓️ ${status}`;
}

function renderMintControls() {
  const container = document.createElement("div");
  container.id = "mint-controls";
  container.style.marginTop = "2em";
  container.style.textAlign = "center";

  const startBtn = document.createElement("button");
  startBtn.innerText = "▶️ Start Minting";
  startBtn.onclick = startMinting;
  startBtn.style.marginRight = "1em";

  const stopBtn = document.createElement("button");
  stopBtn.innerText = "⏹ Stop Minting";
  stopBtn.onclick = stopMinting;

  const status = document.createElement("p");
  status.id = "mint-status";
  status.innerText = "⛓️ Minting Paused";
  status.style.marginTop = "1em";
  status.style.color = "#c62828";
  status.style.fontFamily = "Orbitron";

  container.appendChild(startBtn);
  container.appendChild(stopBtn);
  container.appendChild(status);
  document.body.appendChild(container);
}

window.addEventListener("load", renderMintControls);
