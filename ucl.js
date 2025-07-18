// ucl.js

function renderUCLArchive() {
  const archive = JSON.parse(localStorage.getItem("uclArchive")) || [];
  const container = document.createElement("div");
  container.id = "ucl-archive";
  container.style.marginTop = "3em";
  container.style.width = "90%";
  container.style.maxWidth = "800px";
  container.style.border = "2px solid #c62828";
  container.style.padding = "1em";
  container.style.borderRadius = "8px";
  container.style.backgroundColor = "#001e3c";
  container.style.color = "white";
  container.style.fontFamily = "Orbitron";

  const title = document.createElement("h3");
  title.innerText = "Universal Chain Link Archive";
  title.style.textAlign = "center";
  container.appendChild(title);

  if (archive.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.innerText = "No Seals minted yet.";
    emptyMsg.style.textAlign = "center";
    container.appendChild(emptyMsg);
  } else {
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    const headerRow = document.createElement("tr");
    ["Link ID", "Vault ID", "Debt Value", "Timestamp"].forEach(text => {
      const th = document.createElement("th");
      th.innerText = text;
      th.style.borderBottom = "1px solid #c62828";
      th.style.padding = "8px";
      th.style.textAlign = "left";
      table.appendChild(th);
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    archive.forEach(link => {
      const row = document.createElement("tr");
      [link.link_id, link.vault_id, `$${Number(link.debt_value).toLocaleString()}`, new Date(link.minted_on).toLocaleString()].forEach(text => {
        const td = document.createElement("td");
        td.innerText = text;
        td.style.padding = "6px";
        td.style.borderBottom = "1px solid #444";
        row.appendChild(td);
      });
      table.appendChild(row);
    });

    container.appendChild(table);
  }

  // Export button
  const exportBtn = document.createElement("button");
  exportBtn.innerText = "Export UCL Archive";
  exportBtn.style.marginTop = "1em";
  exportBtn.style.padding = "10px 20px";
  exportBtn.style.backgroundColor = "#c62828";
  exportBtn.style.color = "white";
  exportBtn.style.border = "none";
  exportBtn.style.fontFamily = "Orbitron";
  exportBtn.style.cursor = "pointer";
  exportBtn.onclick = () => {
    const blob = new Blob([JSON.stringify(archive, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ucl_archive.json";
    link.click();
  };
  container.appendChild(exportBtn);

  document.body.appendChild(container);
}

window.addEventListener("load", renderUCLArchive);
