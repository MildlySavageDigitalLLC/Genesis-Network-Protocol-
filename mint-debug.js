// mint-debug.js

const DEBT_API_URL = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/debt_to_the_penny?sort=-record_date&page[size]=1";

let lastDebt = null;
let mintInterval = null;

async function fetchDebt() {
  try {
    const response = await fetch(DEBT_API_URL);
    const data = await response.json();
    const latest = data.data[0];
    const rawDebt = parseFloat(latest.tot_pub_debt_out_amt.replace(/,/g, ""));
    console.log("Fetched Debt:", rawDebt);
    return rawDebt;
  } catch (error) {
    console.error("Debt fetch failed:", error);
    return null;
  }
}

function mintDCS(currentDebt) {
  const vault = JSON.parse(localStorage.getItem("genesisVault"));
  if (!vault) {
    console.warn("No Vault found.");
    return;
  }

  vault.dcs_count += 1;

  const link = {
    vault_id: vault.vault_id,
    minted_on: new Date().toISOString(),
    debt_value: currentDebt,
    link_id: `LINK-${vault.dcs_count}`
  };

  localStorage.setItem("genesisVault", JSON.stringify(vault));

  let archive = JSON.parse(localStorage.getItem("uclArchive")) || [];
  archive.push(link);
  localStorage.setItem("uclArchive", JSON.stringify(archive));

  const vaultStatus = document.getElementById("vault-status");
  if (vaultStatus) {
    vaultStatus.innerText = `Vault: ${vault.vault_id} | Seals: ${vault.dcs_count}`;
  }

  console.log("Minted DCS:", link);
}

async function checkDebtAndMint() {
  const currentDebt = await fetchDebt();
  if (!currentDebt) return;

  if (lastDebt === null) {
    lastDebt = currentDebt;
    const archive = JSON.parse(localStorage.getItem("uclArchive")) || [];
    if (archive.length === 0) {
      console.log("Force minting first Seal.");
      mintDCS(currentDebt);
    }
    return;
  }

  const delta = currentDebt - lastDebt;
  console.log("Debt Delta:", delta);

  if (delta >= 1_000_000) {
    mintDCS(currentDebt);
    lastDebt = currentDebt;
  }
}

function startMinting() {
  if (mintInterval) return;
  mintInterval = setInterval(checkDebtAndMint, 60000);
  console.log("Minting started.");
}

function stopMinting() {
  if (!mintInterval) return;
  clearInterval(mintInterval);
  mintInterval = null;
  console.log("Minting stopped.");
}

window.addEventListener("load", () => {
  checkDebtAndMint();
  startMinting();
});
