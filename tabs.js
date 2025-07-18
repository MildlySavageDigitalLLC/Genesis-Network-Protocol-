// tabs.js

function clearViews() {
  const components = ["ucl-archive", "documents-container", "vault-barcode", "vault-status"];
  components.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.style) el.style.display = "none";
  });
}

function activateTab(name) {
  clearViews();

  if (name === "vault") {
    const vaultStatus = document.getElementById("vault-status");
    if (vaultStatus) vaultStatus.style.display = "block";

    const barcode = document.getElementById("vault-barcode");
    if (barcode) barcode.style.display = "block";
  }

  if (name === "ucl") {
    const archive = document.getElementById("ucl-archive");
    if (archive) archive.style.display = "block";
  }

  if (name === "docs") {
    const docs = document.getElementById("documents-container");
    if (docs) docs.style.display = "block";
  }
}

document.querySelectorAll(".tab").forEach(button => {
  button.addEventListener("click", () => {
    const label = button.innerText.toLowerCase();
    if (label.includes("vault")) activateTab("vault");
    else if (label.includes("ucl")) activateTab("ucl");
    else if (label.includes("document")) activateTab("docs");
  });
});
