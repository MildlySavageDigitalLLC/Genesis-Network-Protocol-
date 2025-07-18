let sealCount = parseInt(localStorage.getItem("sealCount")) || 0;
let lastMintDebt = parseInt(localStorage.getItem("simDebt")) || 37118978000000;
let minting = false;
let intervalID = null;

const supplyGoal = 27375000;
const sealLedger = [];

function updateMintEngine() {
  const currentDebt = parseInt(localStorage.getItem("simDebt")) || lastMintDebt;
  const delta = currentDebt - lastMintDebt;

  if (minting && delta >= 1_000_000 && sealCount < supplyGoal) {
    sealCount += 1;
    lastMintDebt = currentDebt;

    // ✅ Display minted count
    document.getElementById("total-supply").innerText = `Total Supply: ${sealCount.toLocaleString()}`;

    // ✅ Display remaining count
    document.getElementById("remaining-supply").innerText = `Remaining: ${(supplyGoal - sealCount).toLocaleString()}`;

    // ✅ Persist minted count
    localStorage.setItem("sealCount", sealCount);

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
}

function startMinting() {
  if (!intervalID) {
    intervalID = setInterval(updateMintEngine, 2000);
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
