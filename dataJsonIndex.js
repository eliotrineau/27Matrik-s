const getDataAct = async() => {
    const data = await fetch("https://datajsonact.glitch.me/data.json") //on récupère le json avec fetch
    const json = await data.json()
    console.log("Activites", json) // on vérifie qu'il marche
    const actContainer = document.querySelector("#act-container"); //on récupère l'id de l'html
    json.data.forEach((activite) => { //on parcout le fichier json
      actContainer.innerHTML += //on affiche dans l'html
      `
      <div class="flex justify-center h-[420px] w-[280px]  bg-zinc-500 rounded-xl border border-[#008F11] mx-auto mx-auto group overflow-hidden">
          <a target="_blank" href="${activite.lien}">
              <img class="w-full h-full transition duration-300 ease-in-out object-cover " src="${activite.img}">
              <a class="absolute self-end mb-12 text-center drop-shadow-2xl">${activite.intitule}</a>
              <p class="absolute text-xl self-end mb-2 text-center drop-shadow-2xl">${activite.date}</p>
          </a>                  
      </div>
      `;
    })
  }
  
  getDataAct(); //on appelle la fonction pour l'utiliser
  
  
  const getDataConcours = async() => {
    const data = await fetch("https://datajsonact.glitch.me/concours.json") //on récupère le json avec fetch
    const json = await data.json()
    console.log("Concours", json) // on vérifie qu'il marche
    const concContainer = document.querySelector("#conc-container"); //on récupère l'id de l'html
    json.data.forEach((concours) =>{ //on parcout le fichier json
      concContainer.innerHTML += //on affiche dans l'html
      `
      <a href="#">
        <div class="flex justify-center h-[420px] w-full bg-zinc-500 rounded-xl border border-[#008F11] group overflow-hidden">
            <img class="w-full h-full group-hover:scale-[1.1] transition duration-300 ease-in-out object-cover" src="${concours.img}">
            <p class="absolute self-center mb-12 text-white md:text-3xl drop-shadow-2xl">CONCOURS : ${concours.date}</p>
            <p class="absolute text-2xl self-end mb-12 text-white drop-shadow-2xl">Catégorie : ${concours.categorie}</p>
            <p class="absolute text-2xl self-end mb-2 text-white drop-shadow-2xl">Gagnant : ${concours.vainqueur}</p>
        </div>
      </a>
      `;
    })
  }
  
  getDataConcours(); //on appelle la fonction pour l'utiliser
  
  const getDataPoleTxt = async() => {
    const data = await fetch("https://datajsonact.glitch.me/poleTexte.json") //on récupère le json avec fetch
    const json = await data.json()
    console.log("PoleTxt", json) // on vérifie qu'il marche
    const poleTxtContainer = document.querySelector("#txtPoles"); //on récupère l'id de l'html
    json.data.forEach((poleTexte) =>{ //on parcout le fichier json
      poleTxtContainer.innerHTML += //on affiche dans l'html
      `
      <div>
        <h3 class="text-center mb-4 rounded-xl px-4 py-2 mx-4 text-4xl text-[#008F11]">${poleTexte.pole}</h3>
        <p class="text-center border mb-4 border-[#008F11] rounded-xl px-4 py-2 mx-4 text-xl text-[#008F11]">${poleTexte.texte}</p>
      </div>
      `;
    })
  }
  
  getDataPoleTxt(); //on appelle la fonction pour l'utiliser
