// stamp.js

function generateStamp() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 600;
  canvas.height = 400;

  // Load Genesis Seal logo
  const logo = new Image();
  logo.src = "assets/genesis_seal.png";

  logo.onload = () => {
    // Background
    ctx.fillStyle = "#001e3c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Genesis Seal
    ctx.drawImage(logo, 200, 40, 200, 200);

    // Retrieve Vault
    const vault = JSON.parse(localStorage.getItem("genesisVault"));
    if (!vault) return alert("No Vault found.");

    const { vault_id, dcs_count, created_on } = vault;

    // Labels
    ctx.fillStyle = "#ffffff";
    ctx.font = "18px Orbitron";
    ctx.textAlign = "center";
    ctx.fillText(`Vault ID: ${vault_id}`, 300, 270);
    ctx.fillText(`DCS Count: ${dcs_count}`, 300, 300);
    ctx.fillText(`Created: ${new Date(created_on).toDateString()}`, 300, 330);

    // Barcode
    const barcodeCanvas = document.createElement("canvas");
    JsBarcode(barcodeCanvas, vault_id, {
      format: "CODE128",
      lineColor: "#ffffff",
      width: 2,
      height: 50,
      displayValue: false
    });

    ctx.drawImage(barcodeCanvas, 200, 340);

    // Export PNG
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `GenesisStamp_${vault_id}.png`;
    link.click();
  };
}

// Optional button logic
const exportBtn = document.createElement("button");
exportBtn.innerText = "Download Genesis Stamp";
exportBtn.style.marginTop = "2em";
exportBtn.style.padding = "10px 20px";
exportBtn.style.backgroundColor = "#c62828";
exportBtn.style.color = "white";
exportBtn.style.border = "none";
exportBtn.style.fontFamily = "Orbitron";
exportBtn.style.cursor = "pointer";
exportBtn.onclick = generateStamp;
document.body.appendChild(exportBtn);
