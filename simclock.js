let currentDebt = 37112901379748;
let sealCount = 0;
let lastMintDebt = currentDebt;
const ratePerSecond = 40000;
const sealLedger = [];

function updateDebt() {
  currentDebt += ratePerSecond;
  document.getElementById("debt-value").innerText = `$${currentDebt.toLocaleString()}`;

  const delta = currentDebt - lastMintDebt;
  if (delta >= 1_000_000) {
    mintSeal();
    lastMintDebt = currentDebt;
  }
}

function mintSeal() {
  sealCount += 1;
  document.getElementById("seal-count").innerText = `Seals Minted: ${sealCount}`;

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

setInterval(updateDebt, 1000);
