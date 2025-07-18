// genesisBlock.js

function renderGenesisBlock() {
  const container = document.createElement("div");
  container.id = "genesis-block";
  container.style.marginTop = "2em";
  container.style.padding = "1em";
  container.style.border = "2px solid #c62828";
  container.style.borderRadius = "8px";
  container.style.backgroundColor = "#001e3c";
  container.style.color = "white";
  container.style.fontFamily = "Orbitron";
  container.style.maxWidth = "800px";
  container.style.marginLeft = "auto";
  container.style.marginRight = "auto";

  const title = document.createElement("h3");
  title.innerText = "🧱 Genesis Block";
  title.style.textAlign = "center";
  title.style.color = "#c62828";
  container.appendChild(title);

  const vault = JSON.parse(localStorage.getItem("genesisVault"));
  const timestamp = vault?.created_on || new Date().toISOString();
  const message = "The Debt Shall Be Remembered";
  const blockID = "GENESIS-000";
  const hash = sha256(`${blockID}${timestamp}${message}`);

  const lines = [
    `Block ID: ${blockID}`,
    `Timestamp: ${new Date(timestamp).toLocaleString()}`,
    `Message: "${message}"`,
    `Hash: ${hash}`
  ];

  lines.forEach(text => {
    const p = document.createElement("p");
    p.innerText = text;
    p.style.margin = "0.5em 0";
    container.appendChild(p);
  });

  document.body.appendChild(container);
}

// Simple SHA256 hash
function sha256(str) {
  return CryptoJS.SHA256(str).toString();
}

window.addEventListener("load", renderGenesisBlock);
