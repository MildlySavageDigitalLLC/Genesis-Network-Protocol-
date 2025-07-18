// documents.js

function createSection(title, content, fileName) {
  const section = document.createElement("div");
  section.className = "doc-section";
  section.style.marginTop = "2em";
  section.style.border = "2px solid #c62828";
  section.style.padding = "1em";
  section.style.borderRadius = "8px";
  section.style.backgroundColor = "#001e3c";
  section.style.color = "white";
  section.style.fontFamily = "Orbitron";

  const header = document.createElement("h3");
  header.innerText = title;
  header.style.color = "#c62828";
  section.appendChild(header);

  const text = document.createElement("pre");
  text.innerText = content;
  text.style.whiteSpace = "pre-wrap";
  text.style.fontSize = "0.85rem";
  section.appendChild(text);

  const downloadBtn = document.createElement("button");
  downloadBtn.innerText = "Download";
  downloadBtn.style.marginTop = "1em";
  downloadBtn.style.padding = "8px 16px";
  downloadBtn.style.backgroundColor = "#c62828";
  downloadBtn.style.color = "white";
  downloadBtn.style.border = "none";
  downloadBtn.style.fontFamily = "Orbitron";
  downloadBtn.style.cursor = "pointer";
  downloadBtn.onclick = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };
  section.appendChild(downloadBtn);

  return section;
}

function renderDocuments() {
  const container = document.createElement("div");
  container.id = "documents-container";
  container.style.marginTop = "4em";
  container.style.width = "90%";
  container.style.maxWidth = "800px";
  container.style.marginLeft = "auto";
  container.style.marginRight = "auto";

  const docs = [
    {
      title: "Disclaimer",
      fileName: "disclaimer.txt",
      content: `Genesis Digital Collector’s Seals (DCS) are symbolic digital artifacts minted in response to sovereign debt increases. They carry no monetary value, cannot be traded, sold, or exchanged, and are not recognized by any financial institution or government entity. Participation is ideological and voluntary. By using this protocol, you waive all financial expectations or claims.`
    },
    {
      title: "User Agreement",
      fileName: "user-agreement.txt",
      content: `By using Genesis, you agree: 1) Seals are symbolic, not financial. 2) Vaults are pseudonymous. 3) No trading or speculation allowed. 4) You uphold the protocol’s ideological intent. Misuse may result in Vault invalidation.`
    },
    {
      title: "Privacy Policy",
      fileName: "privacy-policy.txt",
      content: `Genesis collects no personal data. Vaults are stored locally. No IPs, emails, or identifiers are logged. No servers are used. Participation is private, symbolic, and free from surveillance.`
    },
    {
      title: "Genesis Protocol License (GPL)",
      fileName: "license.txt",
      content: `Permission granted for symbolic use only—never financial, speculative, or commercial. Conditions: 1) No trading. 2) Protocol must remain mint-only. 3) Forks must preserve ideological integrity. NO WARRANTY. NO VALUE. This is a monument, not a currency.`
    },
    {
      title: "Memorial Transfer Declaration",
      fileName: "memorial-transfer.txt",
      content: `Digital Collector’s Seals may be gifted ceremonially to heirs, family, or community members. No compensation, exchange, or valuation may occur. Seals represent ideological memory, not property. Each transfer must preserve its symbolic intent.`
    }
  ];

  docs.forEach(doc => {
    const section = createSection(doc.title, doc.content, doc.fileName);
    container.appendChild(section);
  });

  document.body.appendChild(container);
}

window.addEventListener("load", renderDocuments);
