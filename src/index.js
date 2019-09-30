const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
//const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      const characters = response.results;
      const next_fech = response.info.next;
      localStorage.setItem("next_fech", next_fech)
      let output = characters.map(character => {
        return ` 
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}
window.onunload = unloadPage;

function unloadPage() {
  localStorage.clear();
}
const loadData = async () => {
  let apiC = localStorage.getItem("next_fech");
  if (apiC !== null) {
    await getData(apiC);
    if (!apiC) {
      const h2 = ` 
          <h2>No existen mas personajes</h2>   
        `
      let newItem = document.createElement('section');
      newItem.innerHTML = h2;
      $app.appendChild(newItem);

    } else {
      await getData(apiC);
    }
  } else {
    await getData(API);
  }
}
const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    loadData();
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);