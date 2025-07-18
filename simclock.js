let currentDebt = 37112901379748;
let sealCount = 0;
let lastMintDebt = currentDebt;
let minting = false;
let intervalID = null;
const totalSupply = 10000;
const sealLedger = [];

function updateDebt() {
  if (!minting || sealCount >= totalSupply) return;

  currentDebt += 40000;
  document.getElementById("debt-value").innerText = `$${currentDebt.toLocaleString()}`;

  const delta = currentDebt - lastMintDebt;
  if (delta >= 1_000_000) {
    mintSeal();
    lastMintDebt = currentDebt;
  }
}

function mintSeal() {
  if (sealCount >= totalSupply) return;

  sealCount += 1;
  document.getElementById("seal-count").innerText = `Seals Minted: ${sealCount}`;
  document.getElementById("remaining-supply").innerText = `Remaining: ${totalSupply - sealCount}`;

  const seal = {
    id: `DCS-${sealCount}`,
    timestamp: new Date().toLocaleString(),
    debt: `$${currentDebt.toLocaleString()}`,
    vault: "SIM-Vault-001"
  };

  sealLedger.push(seal);

  const li = document.createElement("li");
  li.innerText = `${seal.id} | ${seal.timestamp} | ${seal.debt}`;
  document.getElementById("seal-list").appendChild(li);
}

function startMinting() {
  if (!intervalID) {
    intervalID = setInterval(updateDebt, 1000);
    minting = true;
    document.getElementById("mint-status").innerText = "Minting Active";
  }
}

function stopMinting() {
  if (intervalID) {
    clearInterval(intervalID);
    intervalID = null;
    minting = false;
    document.getElementById("mint-status").innerText = "Minting Paused";
  }
}

function downloadLedger() {
  let content = `🪙 Genesis Seal Ledger\nVault: SIM-Vault-001\n\n`;
  sealLedger.forEach(seal => {
    content += `${seal.id} | ${seal.timestamp} | ${seal.debt}\n`;
  });

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "genesis_seal_ledger.txt";
  link.click();
}
