// persistence.js

function offerVaultRestore() {
  const restoreSection = document.createElement("div");
  restoreSection.id = "restore-ui";
  restoreSection.style.marginTop = "2em";
  restoreSection.style.backgroundColor = "#001e3c";
  restoreSection.style.border = "2px solid #c62828";
  restoreSection.style.borderRadius = "8px";
  restoreSection.style.padding = "1em";
  restoreSection.style.maxWidth = "600px";
  restoreSection.style.marginLeft = "auto";
  restoreSection.style.marginRight = "auto";
  restoreSection.style.fontFamily = "Orbitron";
  restoreSection.style.color = "white";

  const label = document.createElement("h3");
  label.innerText = "🧬 Restore Previous Vault";
  label.style.color = "#c62828";
  label.style.textAlign = "center";

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = ".json";
  fileInput.style.marginTop = "1em";
  fileInput.style.width = "100%";

  fileInput.onchange = () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const vault = JSON.parse(e.target.result);
        if (!vault.vault_id || !vault.mnemonic || !vault.created_on) {
          alert("Invalid Vault file.");
          return;
        }
        localStorage.setItem("genesisVault", JSON.stringify(vault));
        location.reload();
      } catch (err) {
        alert("Restoration failed. Invalid JSON.");
      }
    };
    reader.readAsText(file);
  };

  restoreSection.appendChild(label);
  restoreSection.appendChild(fileInput);
  document.body.appendChild(restoreSection);
}

window.addEventListener("load", () => {
  const vault = localStorage.getItem("genesisVault");
  if (!vault) offerVaultRestore();
});
