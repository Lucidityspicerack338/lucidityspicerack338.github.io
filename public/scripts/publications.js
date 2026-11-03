(() => {
  const form = document.getElementById("publication-filters");
  const records = Array.from(document.querySelectorAll(".publication-record"));
  const count = document.getElementById("publication-count");
  const empty = document.getElementById("publication-empty");
  if (!form || !count || !empty || records.length === 0) return;

  const search = form.querySelector('[name="query"]');
  const year = form.querySelector('[name="year"]');
  const venue = form.querySelector('[name="venue"]');

  // Lowercase, drop accents, and treat curly quotes and dashes like plain ones, so "Gui" or "children's" always match.
  const normalize = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\u2018\u2019\u201c\u201d"']/g, "")
      .replace(/[\u2010-\u2015-]/g, " ");
  records.forEach((record) => {
    record.dataset.searchNorm = normalize(record.dataset.search || "");
  });

  const applyFilters = () => {
    const words = normalize(search.value).split(/\s+/).filter(Boolean);
    const selectedYear = year.value;
    const selectedVenue = venue.value.toLowerCase();
    let visible = 0;

    records.forEach((record) => {
      const matches =
        words.every((word) => record.dataset.searchNorm.includes(word)) &&
        (!selectedYear || record.dataset.year === selectedYear) &&
        (!selectedVenue || record.dataset.venue === selectedVenue);
      record.hidden = !matches;
      if (matches) visible += 1;
    });

    count.textContent = `${visible} publication${visible === 1 ? "" : "s"}`;
    empty.hidden = visible !== 0;
  };

  form.addEventListener("input", applyFilters);
  form.addEventListener("change", applyFilters);
  form.addEventListener("reset", () => requestAnimationFrame(applyFilters));
  form.addEventListener("submit", (event) => event.preventDefault());
})();
