// vault.js

function generateMnemonic() {
  const wordList = [ // minimal word pool for testing
    "truth", "pulse", "chain", "echo", "debt", "link", "seal",
    "vault", "data", "time", "protest", "memory", "symbol", "signal"
  ];
  let mnemonic = [];
  for (let i = 0; i < 12; i++) {
    let index = Math.floor(Math.random() * wordList.length);
    mnemonic.push(wordList[index]);
  }
  return mnemonic;
}

function generateUUID() {
  return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function forgeVault() {
  const mnemonic = generateMnemonic();
  const uuid = generateUUID();
  const timestamp = new Date().toISOString();
  const vault = {
    vault_id: uuid,
    mnemonic: mnemonic,
    dcs_count: 0,
    created_on: timestamp,
    genesis_seal: `${uuid}_seal.svg`
  };

  localStorage.setItem("genesisVault", JSON.stringify(vault));
  updateVaultUI(vault);
}

function updateVaultUI(vault) {
  const vaultStatus = document.getElementById("vault-status");
  vaultStatus.innerText = `Vault forged: ${vault.vault_id}
  Seals: ${vault.dcs_count}`;
}

function exportVault() {
  const vault = localStorage.getItem("genesisVault");
  if (!vault) return alert("No Vault found.");
  const blob = new Blob([vault], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "GenesisVault.json";
  link.click();
}

document.getElementById("create-vault").addEventListener("click", forgeVault);
