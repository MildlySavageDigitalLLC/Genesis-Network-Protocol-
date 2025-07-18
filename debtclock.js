// debtClock.js

async function renderDebtClock() {
  const url = "https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/debt_to_the_penny?sort=-record_date&page[size]=1";
  const container = document.createElement("div");
  container.id = "official-debt";
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
  container.style.textAlign = "center";

  const title = document.createElement("h3");
  title.innerText = "📡 Official Debt Snapshot";
  title.style.color = "#c62828";
  container.appendChild(title);

  const value = document.createElement("p");
  value.id = "official-debt-value";
  value.style.fontSize = "1.5em";
  value.style.marginTop = "1em";

  try {
    const res = await fetch(url);
    const data = await res.json();
    const latest = data.data[0];
    const debt = parseFloat(latest.tot_pub_debt_out_amt.replace(/,/g, ""));
    const date = new Date(latest.record_date).toDateString();
    value.innerText = `$${debt.toLocaleString()} (as of ${date})`;
  } catch (err) {
    value.innerText = "Unable to fetch Treasury data.";
  }

  container.appendChild(value);
  document.body.appendChild(container);
}

window.addEventListener("load", renderDebtClock);
