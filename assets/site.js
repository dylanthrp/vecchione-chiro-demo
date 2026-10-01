/* Progressive enhancement only: articles and navigation work without JavaScript. */
'use strict';
(() => {
  const library = document.querySelector('[data-library]');
  if (!library) return;
  const search = library.querySelector('#library-search');
  const topic = library.querySelector('#library-topic');
  const cards = Array.from(library.querySelectorAll('.lib-card'));
  const results = library.querySelector('[data-results]');
  const empty = library.querySelector('[data-empty]');
  const update = () => {
    const query = search.value.trim().toLocaleLowerCase();
    let count = 0;
    cards.forEach(card => {
      const matchesTopic = topic.value === 'all' || card.dataset.category === topic.value;
      const matchesQuery = card.textContent.toLocaleLowerCase().includes(query);
      card.hidden = !(matchesTopic && matchesQuery);
      if (!card.hidden) count += 1;
    });
    results.textContent = `${count} of ${cards.length} articles`;
    empty.hidden = count !== 0;
  };
  search.addEventListener('input', update);
  topic.addEventListener('change', update);
  library.querySelector('[data-reset]').addEventListener('click', () => {
    search.value = '';
    topic.value = 'all';
    update();
    search.focus();
  });
  library.querySelector('[data-library-tools]').hidden = false;
  update();
})();
