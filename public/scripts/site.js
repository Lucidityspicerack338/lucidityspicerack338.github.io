(() => {
  const menuButton = document.querySelector(".menu");
  const navigation = document.getElementById("navigation");

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "Menu +";
  };

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const open = navigation.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.textContent = open ? "Close −" : "Menu +";
    });
    navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  }

  const code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let progress = 0;
  let returnFocus = null;
  const panel = document.getElementById("secret-stage");
  const closeEgg = () => {
    if (!panel || panel.hidden) return;
    panel.hidden = true;
    if (returnFocus instanceof HTMLElement) returnFocus.focus();
  };

  if (panel) {
    panel.querySelector(".secret-close")?.addEventListener("click", closeEgg);
    panel.addEventListener("click", (event) => {
      if (event.target === panel) closeEgg();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeEgg();
      return;
    }
    const target = event.target;
    if (!panel || event.ctrlKey || event.metaKey || event.altKey || (target instanceof Element && target.closest("input,textarea,[contenteditable]"))) return;
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (key === code[progress]) {
      progress += 1;
      if (progress === code.length) {
        progress = 0;
        returnFocus = document.activeElement;
        panel.hidden = false;
        panel.querySelector(".secret-close")?.focus();
      }
    } else {
      progress = key === code[0] ? 1 : 0;
    }
  });

  const tabs = Array.from(document.querySelectorAll('[role="tablist"] [role="tab"]'));
  const activateTab = (tab, moveFocus = false) => {
    tabs.forEach((candidate) => {
      const active = candidate === tab;
      candidate.setAttribute("aria-selected", String(active));
      candidate.tabIndex = active ? 0 : -1;
      const panelId = candidate.getAttribute("aria-controls");
      const tabPanel = panelId ? document.getElementById(panelId) : null;
      if (tabPanel) tabPanel.hidden = !active;
    });
    if (moveFocus) tab.focus();
  };

  if (tabs.length) activateTab(tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0]);

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index + tabs.length - 1) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      activateTab(tabs[next], true);
    });
  });
})();
