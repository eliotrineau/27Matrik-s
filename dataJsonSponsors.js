

const getDataSponsors = async() => {
    const data = await fetch("https://datajsonact.glitch.me/sponsors.json")
    const json = await data.json()
    console.log("Sponsors", json)
    const sponsorsContainer = document.querySelector("#sponsors-container");
    json.data.forEach((sponsors) =>{
        sponsorsContainer.innerHTML +=
        `
        <div class="border border-[#008F11] rounded-xl group">
            <h2 class="text-2xl lg:text-5xl text-center text-[#008F11] mt-2 group-hover:text-[#00FF41]" style="font-family: 'Rum Raisin', cursive;">${sponsors.nom} nous soutient !</h2>
            <div class="flex-col">
                <a class="flex justify-center" target="_blank" href="${sponsors.lien}"><img class="my-4 w-24 h-24 lg:w-52 lg:h-52 group-hover:scale-125 transition duration-150 ease-in-out" srcset="${sponsors.img} 1x, ${sponsors.img} 2x" src="${sponsors.img}"></a>
                <p class="text-sm lg:text-xl mb-4 text-center text-[#008F11] m-2">${sponsors.texte}</p>
            </div>
        </div>
        `;
    })
  }

  getDataSponsors();