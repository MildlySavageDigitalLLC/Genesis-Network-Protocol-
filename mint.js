// mint.js

const DEBT_API_URL = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/debt_to_the_penny?sort=-record_date&page[size]=1";

let lastDebt = null;

async function fetchDebt() {
  try {
    const response = await fetch(DEBT_API_URL);
    const data = await response.json();
    const latest = data.data[0];
    const rawDebt = parseFloat(latest.tot_pub_debt_out_amt.replace(/,/g, ""));
    return rawDebt;
  } catch (error) {
    console.error("Debt fetch failed:", error);
    return null;
  }
}

function mintDCS(currentDebt) {
  const vault = JSON.parse(localStorage.getItem("genesisVault"));
  if (!vault) return;

  vault.dcs_count += 1;

  const link = {
    vault_id: vault.vault_id,
    minted_on: new Date().toISOString(),
    debt_value: currentDebt,
    link_id: `LINK-${vault.dcs_count}`,
  };

  // Save updated vault
  localStorage.setItem("genesisVault", JSON.stringify(vault));

  // Save Link to UCL Archive
  let archive = JSON.parse(localStorage.getItem("uclArchive")) || [];
  archive.push(link);
  localStorage.setItem("uclArchive", JSON.stringify(archive));

  // Update UI
  const vaultStatus = document.getElementById("vault-status");
  vaultStatus.innerText = `Vault: ${vault.vault_id} | Seals: ${vault.dcs_count}`;

  console.log("Minted DCS:", link);
}

async function checkDebtAndMint() {
  const currentDebt = await fetchDebt();
  if (!currentDebt) return;

  if (lastDebt === null) {
    lastDebt = currentDebt;
    return;
  }

  const delta = currentDebt - lastDebt;
  if (delta >= 1_000_000) {
    mintDCS(currentDebt);
    lastDebt = currentDebt;
  }
}

// Run every 60 seconds
setInterval(checkDebtAndMint, 60000);
