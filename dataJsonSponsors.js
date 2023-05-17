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

const afficherConcours = async () => {
  const sponsors = await getDocument("Sponsors");
  const sponsorsContainer = document.querySelector("#sponsors-container"); //on récupère l'id de l'html
  sponsors.forEach((sponsors)=>{
    sponsorsContainer.innerHTML += //affiche le html
    `
    <div class="border border-[#008F11] rounded-xl group">
            <h2 class="text-2xl lg:text-5xl text-center text-[#008F11] mt-2 group-hover:text-[#00FF41]" style="font-family: 'Rum Raisin', cursive;">${sponsors.nom} nous soutient !</h2>
            <div class="flex-col">
                <a class="flex justify-center" target="_blank" href="${sponsors.lien}"><img class="my-4 w-24 h-24 lg:w-52 lg:h-52 group-hover:scale-125 transition duration-150 ease-in-out" src="${sponsors.img}"></a>
                <p class="text-sm lg:text-xl mb-4 text-center text-[#008F11] m-2">${sponsors.texte}</p>
            </div>
        </div>
    `;
  })
}
afficherConcours();

