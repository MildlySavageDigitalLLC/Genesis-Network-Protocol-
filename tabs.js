document.querySelectorAll(".tab").forEach(button => {
  button.addEventListener("click", () => {
    const tabName = button.getAttribute("data-tab");
    document.querySelectorAll(".tab-content").forEach(section => {
      section.style.display = "none";
    });
    document.getElementById(tabName).style.display = "block";
  });
});
