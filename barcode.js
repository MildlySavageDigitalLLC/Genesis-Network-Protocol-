// barcode.js

function renderBarcode(vaultId) {
  // Remove existing barcode if present
  const existing = document.getElementById("vault-barcode");
  if (existing) existing.remove();

  // Create SVG element
  const svg = document.createElement("svg");
  svg.id = "vault-barcode";
  svg.style.marginTop = "2em";
  svg.style.backgroundColor = "#001e3c";
  svg.style.padding = "12px";
  svg.style.border = "2px solid white";
  svg.style.borderRadius = "8px";
  document.body.appendChild(svg);

  // Generate barcode
  JsBarcode("#vault-barcode", vaultId, {
    format: "CODE128",
    lineColor: "#ffffff",
    width: 2,
    height: 80,
    displayValue: true,
    font: "Orbitron",
    fontSize: 16,
    background: "#001e3c"
  });
}

function attachBarcodeToVault() {
  const vault = JSON.parse(localStorage.getItem("genesisVault"));
  if (!vault || !vault.vault_id) return;
  renderBarcode(vault.vault_id);
}

window.addEventListener("load", attachBarcodeToVault);
