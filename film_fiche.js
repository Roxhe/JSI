function displayFilmCarroussel(id, cat, group) {
    fetch(`http://localhost:8000/api/v1/titles/${id}`).then((response) => response.json())
    .then((film) => {

      const imageElement = document.createElement("img");
      imageElement.src = film.image_url;
  
      const titleElement = document.createElement("p");
      titleElement.classList.add("film-title");
      titleElement.innerText = film.title;
    
      const descriptionElement = document.createElement("p");
      descriptionElement.classList.add("film-desc");
      descriptionElement.innerText = film.description;
  
      const filminfoDiv = document.createElement("div");
      filminfoDiv.classList.add("film-info");
      filminfoDiv.appendChild(titleElement);
  
      const filmDiv = document.createElement("div");
      filmDiv.classList.add("film");
      filmDiv.onclick = function() {
        displayModal(id);
      };

      filmDiv.appendChild(imageElement);
      filmDiv.appendChild(filminfoDiv);
  
      const filmFiche = document.createElement("li");
      filmFiche.classList.add("list-item");
      filmFiche.classList.add(`group-${group}`);
      filmFiche.appendChild(filmDiv);
  
      const filmsListe = document.getElementById(`${cat}`);
      filmsListe.appendChild(filmFiche);  
  
      
      const imageListItems = document.querySelectorAll('.image-list li');
      for (let i = 0; i < imageListItems.length; i++) {
        const listItem = imageListItems[i];
        
        if (listItem.classList.contains('group-1')) {
  
          listItem.classList.add("list-item-display");
        } else {

          listItem.classList.remove("list-item-display");
        }
      }  
  
      let currentGroup = 1; 
      const maxGroup = 3;
  
      document.getElementById(`btn-next-${cat}`).addEventListener("click", () => {
        currentGroup = currentGroup < maxGroup ? currentGroup + 1 : 1;
        const imageListItems = document.querySelectorAll(`#${cat} li`);
        for (let i = 0; i < imageListItems.length; i++) {
          const listItem = imageListItems[i];
          if (listItem.classList.contains(`group-${currentGroup}`)) {
             listItem.classList.add("list-item-display");
          } else {
            listItem.classList.remove("list-item-display");
          }
        }
      });
  
      document.getElementById(`btn-previous-${cat}`).addEventListener("click", () => {
        currentGroup = currentGroup > 1 ? currentGroup - 1 : maxGroup;
        const imageListItems = document.querySelectorAll(`#${cat} li`);
        for (let i = 0; i < imageListItems.length; i++) {
          const listItem = imageListItems[i];
          if (listItem.classList.contains(`group-${currentGroup}`)) {
            listItem.classList.add("list-item-display");
          } else {
            listItem.classList.remove("list-item-display");
          }
        }
      });

    });
}

function displayBestFilm() {
  fetch("http://localhost:8000/api/v1/titles/2562232").then((response) => response.json())
  .then((film) => {

    const imageElement = document.createElement("img");
    imageElement.src = film.image_url;

    const titleElement = document.createElement("p");
    titleElement.classList.add("bestfilm-title");
    titleElement.innerText = film.title;
  
    const descriptionElement = document.createElement("p");
    descriptionElement.classList.add("bestfilm-desc");
    descriptionElement.innerText = film.description;

    const bestfilminfoDiv = document.createElement("div");
    bestfilminfoDiv.classList.add("bestfilm-info");
    bestfilminfoDiv.appendChild(titleElement);
    bestfilminfoDiv.appendChild(descriptionElement);

   

    const bestfilmDiv = document.createElement("div");
    bestfilmDiv.classList.add("bestfilm");
    bestfilmDiv.appendChild(imageElement);
    bestfilmDiv.appendChild(bestfilminfoDiv);

    imageElement.onclick = function() {
          displayModal(2562232);
        };
    const filmsListe = document.getElementById("best-film");
    filmsListe.appendChild(bestfilmDiv);  
  });
}

function displayModal(id) {
  fetch(`http://localhost:8000/api/v1/titles/${id}`).then((response) => response.json())
    .then((film) => {

      const modalContent = `
      <div class="modal-content">
        <div class = "movie-poster">
            <img src = "${film.image_url}" alt = "poster du film :${film.title}">
            <h3 class = "movie-title modal-text">${film.title}</h3>
            <p class = "duration modal-text"><b>Durée:</b> ${film.duration} minutes</p>
        </div>
        <div class = "movie-info">
        <span class="close-modal" id="cross">&times;</span>
            <ul class = "movie-misc-info">
                <li class = "imdb_score modal-text">IMDB Score:<b> ${film.imdb_score}&#x2605;</b></li>
                <li class = "released modal-text">Publication: ${film.date_published}</li>
                <li class = "countries modal-text">Pays d'origine: ${film.countries}</li>
            </ul>
            <p class = "genres modal-text"><b>Genre(s):</b> ${film.genres}</p>
            <p class = "writers modal-text"><b>Réalisateur.ice(s):</b> ${film.writers}</p>
            <p class = "actors modal-text"><b>Acteur.ice(s): </b>${film.actors}</p>
            <p class = "long-description modal-text"><b>Description:</b> ${film.long_description}</p>
            <p class = "languages modal-text"><b>Langage(s):</b> ${film.languages}</p>
            <p class = "box-office modal-text"><b>BoxOffice Mondial :</b> ${film.worldwide_gross_income}$</p>
        </div>
      </div>
    `;

    const modalBox = document.getElementById("mymodal");
    document.getElementById("mymodal").innerHTML = modalContent;  

    modalBox.style.display = "block";

    const modalCross = document.getElementById("cross")
      
    modalCross.onclick = function() {
    modalBox.style.display = "none";
}

  });
}

window.onclick = function(event) {
  if (event.target == document.getElementById("mymodal")) {
    document.getElementById("mymodal").style.display = "none";
  }
} 
displayBestFilm();


fetch('http://localhost:8000/api/v1/titles/?sort_by=-votes%2C-imdb_score&page_size=21')
  .then(response => response.json())
  .then(data => {
    const idsCat1 = data.results.map(film => film.id);
    const groupInd = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3]
    console.log(idsCat1)
    for (let i = 0; i < idsCat1.length; i++) {
      const id = idsCat1[i];
      const group = groupInd[i];
      displayFilmCarroussel(id, "cat-1", group);
    }
  })

  fetch('http://localhost:8000/api/v1/titles/?sort_by=-votes%2C-imdb_score&genre=comedy&page_size=21')
  .then(response => response.json())
  .then(data => {
    const idsCat2 = data.results.map(film => film.id);
    const groupInd = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3]
    console.log(idsCat2)
    for (let i = 0; i < idsCat2.length; i++) {
      const id = idsCat2[i];
      const group = groupInd[i];
      displayFilmCarroussel(id, "cat-2", group);
    }
  })

fetch('http://localhost:8000/api/v1/titles/?sort_by=-votes%2C-imdb_score&genre=history&page_size=21')
.then(response => response.json())
.then(data => {
  const idsCat3 = data.results.map(film => film.id);
  const groupInd = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3]
  console.log(idsCat3)
  for (let i = 0; i < idsCat3.length; i++) {
    const id = idsCat3[i];
    const group = groupInd[i];
    displayFilmCarroussel(id, "cat-3", group);
  }
})

fetch('http://localhost:8000/api/v1/titles/?sort_by=-votes%2C-imdb_score&actor=Tom+Hanks&page_size=21')
.then(response => response.json())
.then(data => {
  const idsCat4 = data.results.map(film => film.id);
  const groupInd = [1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3]
  console.log(idsCat4)
  for (let i = 0; i < idsCat4.length; i++) {
    const id = idsCat4[i];
    const group = groupInd[i];
    displayFilmCarroussel(id, "cat-4", group);
  }
})
