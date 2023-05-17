//import de firebase 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, setDoc, getDoc, where, writeBatch, query, orderBy, doc, limit, getDocs } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";


//mon api BDD
const firebaseConfig = {
  apiKey: "AIzaSyCJHQlxEfS_1rbnX-5OLA8B7QGEz28FKRM",
  authDomain: "fir-27matrik-s.firebaseapp.com",
  projectId: "fir-27matrik-s",
  storageBucket: "fir-27matrik-s.appspot.com",
  messagingSenderId: "407433059580",
  appId: "1:407433059580:web:0dc8ff8164dcb657fbcb79"
};

//initialiser firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


//récuperer un document sur firebase
const getDocument = async (collectionName) => {
  const DocumentColRef = collection(db, collectionName);
  const DocumentSnapshot = await getDocs(DocumentColRef);
  const DocumentList = DocumentSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
  return DocumentList
}

const getDocumentASC = async (collectionName) => {
  const DocumentColRef = query(collection(db, collectionName), orderBy("ordre", "asc"));
  const DocumentSnapshot = await getDocs(DocumentColRef);
  const DocumentList = DocumentSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
  return DocumentList
}

const afficherConcours = async () => {
  const concours = await getDocument("Concours");
  const concContainer = document.querySelector("#conc-container"); //on récupère l'id de l'html
  concours.forEach((concours)=>{
    concContainer.innerHTML += //affiche le html
    `
    <a href="#">
        <div class="flex justify-center h-[420px] w-full bg-zinc-500 rounded-xl border border-[#008F11] group overflow-hidden">
            <img class="w-full h-full group-hover:scale-[1.1] transition duration-300 ease-in-out object-cover" src="${concours.img}"/>
            <p class="absolute self-center mb-12 text-white md:text-3xl drop-shadow-2xl">CONCOURS : ${concours.date}</p>
            <p class="absolute text-2xl self-end mb-12 text-white drop-shadow-2xl">Catégorie : ${concours.categorie}</p>
            <p class="absolute text-2xl self-end mb-2 text-white drop-shadow-2xl">Gagnant : ${concours.vainqueur}</p>
        </div>
      </a>
    `;
  })
}
afficherConcours();

const afficherPoleTxt = async () => {
  const poleTexte = await getDocumentASC("poleTexte");
  const poleTxtContainer = document.querySelector("#txtPoles"); //on récupère l'id de l'html
  poleTexte.forEach((poleTexte)=>{
    poleTxtContainer.innerHTML += //affiche le html
    `
    <div>
        <h3 class="text-center mb-4 rounded-xl px-4 py-2 mx-4 text-4xl text-[#008F11]">${poleTexte.pole}</h3>
        <p class="text-center border mb-4 border-[#008F11] rounded-xl px-4 py-2 mx-4 text-xl text-[#008F11]">${poleTexte.texte}</p>
      </div>
    `;
  })
}
afficherPoleTxt();

const afficherActivite = async () => {
  const event = await getDocumentASC("Event");
  const actContainer = document.querySelector("#act-container"); //on récupère l'id de l'html
  event.forEach((activite)=>{
    actContainer.innerHTML += //affiche le html
    `
    <div class="flex justify-center h-[420px] w-[280px]  bg-zinc-500 rounded-xl border border-[#008F11] mx-auto mx-auto group overflow-hidden">
    <a target="_blank" href="${activite.lien}">
        <img class="w-full h-full transition duration-300 ease-in-out object-cover " src="${activite.img}"/>
        <a class="absolute self-end mb-12 text-center drop-shadow-2xl">${activite.intitule}</a>
        <p class="absolute text-xl self-end mb-2 text-center drop-shadow-2xl">${activite.date}</p>
    </a>                  
</div>
    `;
  })
}
afficherActivite();

/*
const getDataAct = async() => {
    const data = await fetch("https://datajsonact.glitch.me/data.json") //on récupère le json avec fetch
    const json = await data.json()
    const actContainer = document.querySelector("#act-container"); //on récupère l'id de l'html
    json.data.forEach((activite) => { //on parcout le fichier json
      actContainer.innerHTML += //on affiche dans l'html
      `
      <div class="flex justify-center h-[420px] w-[280px]  bg-zinc-500 rounded-xl border border-[#008F11] mx-auto mx-auto group overflow-hidden">
          <a target="_blank" href="${activite.lien}">
              <img class="w-full h-full transition duration-300 ease-in-out object-cover " src="${activite.img}"/>
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
    const concContainer = document.querySelector("#conc-container"); //on récupère l'id de l'html
    json.data.forEach((concours) =>{ //on parcout le fichier json
      concContainer.innerHTML += //on affiche dans l'html
      `
      <a href="#">
        <div class="flex justify-center h-[420px] w-full bg-zinc-500 rounded-xl border border-[#008F11] group overflow-hidden">
            <img class="w-full h-full group-hover:scale-[1.1] transition duration-300 ease-in-out object-cover" src="${concours.img}"/>
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
*/