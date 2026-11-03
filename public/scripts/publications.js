(() => {
  const form = document.getElementById("publication-filters");
  const records = Array.from(document.querySelectorAll(".publication-record"));
  const count = document.getElementById("publication-count");
  const empty = document.getElementById("publication-empty");
  if (!form || !count || !empty || records.length === 0) return;

  const search = form.querySelector('[name="query"]');
  const year = form.querySelector('[name="year"]');
  const venue = form.querySelector('[name="venue"]');
  const topic = form.querySelector('[name="topic"]');

  const applyFilters = () => {
    const query = search.value.trim().toLowerCase();
    const selectedYear = year.value;
    const selectedVenue = venue.value.toLowerCase();
    const selectedTopic = topic.value.toLowerCase();
    let visible = 0;

    records.forEach((record) => {
      const matches =
        (!query || record.dataset.search.includes(query)) &&
        (!selectedYear || record.dataset.year === selectedYear) &&
        (!selectedVenue || record.dataset.venue === selectedVenue) &&
        (!selectedTopic || record.dataset.topics.split(" ").includes(selectedTopic));
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
