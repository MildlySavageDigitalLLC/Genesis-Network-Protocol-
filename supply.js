// supply.js

function renderSupplyStats() {
  const vault = JSON.parse(localStorage.getItem("genesisVault"));
  const archive = JSON.parse(localStorage.getItem("uclArchive")) || [];

  const container = document.createElement("div");
  container.id = "supply-stats";
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
  title.innerText = "📊 Supply Chain Stats";
  title.style.textAlign = "center";
  title.style.color = "#c62828";
  container.appendChild(title);

  const vaultSupply = vault?.dcs_count || 0;
  const totalSupply = archive.length;
  const currentSupply = archive.filter(link => link.vault_id === vault?.vault_id).length;

  const stats = [
    `Vault Supply: ${vaultSupply}`,
    `Current Session Supply: ${currentSupply}`,
    `Total Network Supply: ${totalSupply}`
  ];

  stats.forEach(text => {
    const p = document.createElement("p");
    p.innerText = text;
    p.style.margin = "0.5em 0";
    container.appendChild(p);
  });

  document.body.appendChild(container);
}

window.addEventListener("load", renderSupplyStats);
