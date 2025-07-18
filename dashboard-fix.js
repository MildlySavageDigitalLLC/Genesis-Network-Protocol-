// dashboard-fix.js

async function fetchDebtSnapshot() {
  const url = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/debt_to_the_penny?sort=-record_date&page[size]=1";
  try {
    const res = await fetch(url);
    const data = await res.json();
    const latest = data.data[0];
    const debt = parseFloat(latest.tot_pub_debt_out_amt.replace(/,/g, ""));
    const date = latest.record_date;
    return { debt, date };
  } catch (err) {
    console.error("Debt snapshot failed:", err);
    return { debt: null, date: null };
  }
}

function renderDashboard(debtData) {
  const vault = JSON.parse(localStorage.getItem("genesisVault"));
  const archive = JSON.parse(localStorage.getItem("uclArchive")) || [];

  const container = document.createElement("div");
  container.id = "genesis-dashboard";
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
  title.innerText = "📡 Genesis Network Dashboard";
  title.style.textAlign = "center";
  title.style.color = "#c62828";
  container.appendChild(title);

  const stats = [
    `Vault ID: ${vault?.vault_id || "—"}`,
    `Your DCS Count: ${vault?.dcs_count || 0}`,
    `Total Seals Minted: ${archive.length}`,
    `Latest Debt: ${debtData.debt ? `$${debtData.debt.toLocaleString()}` : "—"}`,
    `Last Treasury Update: ${debtData.date ? new Date(debtData.date).toDateString() : "—"}`
  ];

  stats.forEach(stat => {
    const p = document.createElement("p");
    p.innerText = stat;
    p.style.margin = "0.5em 0";
    container.appendChild(p);
  });

  document.body.appendChild(container);
}

window.addEventListener("load", async () => {
  const debtData = await fetchDebtSnapshot();
  renderDashboard(debtData);
});
