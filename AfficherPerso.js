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


//vérifier qu'un utilisateur de la collection Utilisateurs existe
const userExist = async (pseudo, motdepasse) => {
  const DocumentColRef = collection(db, "Utilisateurs");
  const q = query(DocumentColRef, where("pseudo", "==", pseudo), where("motdepasse", "==", motdepasse))
  const querySnapshot = await getDocs(q);
  const DocumentList = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
  return DocumentList;
};


// fonction pour créer une collection
const createDocument = async (collectionName, newObj) => {
  const DocumentColRef = collection(db, collectionName);
  const DocumentSnapshot = await addDoc(DocumentColRef, newObj);
}


//fonction pour afficher tous les utilisateurs qui existe
const afficherUtilisateurs = async () => {
  const utilisateurs = await getDocument("Utilisateurs");
  const utilisateursHTML = document.querySelector("#utilisateursHTML");
  utilisateurs.forEach((utilisateurs)=>{
    utilisateursHTML.innerHTML += //affiche le html
    `
    <div class="flex-col border border-[#008F11]] text-[#008F11] text-xl">
        <p>${utilisateurs.pseudo}</p>
        <p>${utilisateurs.email}</p>
        <p>${utilisateurs.motdepasse}</p>
      </div>
    `;
  })
}
// ne pas appeler car nous voyons toutes les données des gens afficherUtilisateurs();

//fonction pour inscrire un utilisateur
const Inscription = async (pseudo, email, motdepasse) => {
  const texteHTMLIns = document.querySelector("#texteHTMLIns"); // on lie le code à l'html avec l'id
  try {
    const utilisateurExists = await userExist(pseudo, motdepasse); //vérifie si un utilisateur possédant le même pseudo et mot de passe existe déjà
    if (utilisateurExists.length > 0) {
      texteHTMLIns.innerHTML ="" //vide le html
      texteHTMLIns.innerHTML += //affiche le hmtl
      `
      <div class="justify-center">
        <p class="text-[#008F11] text-xl">L'utilisateur existe déjà !</p>
      </div>
      `;
      alert("L'utilisateur existe déjà");
      return;
    }
    const nouvelUtilisateur = { //creer obj utilisateur
      pseudo,
      email,
      motdepasse,
    };
    texteHTMLIns.innerHTML ="" //vide le html
    texteHTMLIns.innerHTML += //affiche le hmtl
    `
    <div class="justify-center">
      <p class="text-[#008F11] text-xl">Inscription réussie !</p>
    </div>
    `;
    await createDocument("Utilisateurs", nouvelUtilisateur); //ajouter l'utilisateur à Firebase
  } catch (error) {
      texteHTMLIns.innerHTML ="" //vide le html
      texteHTMLIns.innerHTML += //affiche le hmtl
      `
      <div class="justify-center">
        <p class="text-[#008F11] text-xl">Une erreur est survenue lors de l'inscription de l'utilisateur !</p>
      </div>
      `;
  }
};



const Connexion = async (pseudo, motdepasse) => {
  const texteHTMLCon = document.querySelector("#texteHTMLCon"); // on lie le code à l'html avec l'id
  try {
    const q = query(collection(db, "Utilisateurs"), where("pseudo", "==", pseudo)); // récupère l'utilisateur avec le pseudo correspondant
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) { //si le document recherché n'existe pas / vide alors :
      texteHTMLCon.innerHTML=""  //vide le html
      texteHTMLCon.innerHTML += //affiche le hmtl
      `
      <div class="justify-center">
        <p class="text-[#008F11] text-xl">L'utilisateur n'existe pas !</p>
      </div>
      `;
    } else {
      const utilisateur = querySnapshot.docs[0].data(); // récupère les données de l'utilisateur
      if (utilisateur.motdepasse !== motdepasse) { // vérifie si le mot de passe est incorrect
        texteHTMLCon.innerHTML="" //affiche le hmtl
        texteHTMLCon.innerHTML += //affiche le hmtl
        `
        <div class="justify-center">
          <p class="text-[#008F11] text-xl">mot de passe incorrect !</p>
        </div>
        `;
      } else {
        texteHTMLCon.innerHTML="" //affiche le hmtl
        texteHTMLCon.innerHTML += //affiche le hmtl
        `
        <div class="justify-center">
          <p class="text-[#008F11] text-xl">Connexion réussie !</p>
        </div>
        `;
        const afficherUtilisateur = document.querySelector("#utilisateur-container"); // affiche les données de l'utilisateur
        afficherUtilisateur.innerHTML =""  //affiche le hmtl
        afficherUtilisateur.innerHTML +=  //affiche le hmtl
        `
        <div class="flex-col border rounded-xl border-[#008F11] py-1 px-2 text-[#008F11] text-xl">
          <p>Données du compte :</p>
          <p>${utilisateur.pseudo}</p>
          <p>${utilisateur.email}</p>
          <p>${utilisateur.motdepasse}</p>
        </div>
        `;
      }
    }
  } catch (error) {
      texteHTMLCon.innerHTML="" //affiche le hmtl
      texteHTMLCon.innerHTML += //affiche le hmtl
      `
      <div class="justify-center">
        <p class="text-[#008F11] text-xl">Une erreur est survenue lors de la connexion de l'utilisateur !</p>
      </div>
      `;
  }
};

const supprimerUtilisateur = async (pseudo, motdepasse) => {
  const texteHTMLSup = document.querySelector("#texteHTMLSup"); // on lie le code à l'html avec l'id
  try {
    // Vérifie si l'utilisateur existe et récupère ses données
    const q = query(collection(db, "Utilisateurs"), where("pseudo", "==", pseudo));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) { //si le document recherché n'existe pas / vide alors :
      texteHTMLSup.innerHTML="" //affiche le hmtl
      texteHTMLSup.innerHTML += //affiche le hmtl
      `
      <div class="justify-center">
        <p class="text-[#008F11] text-xl">L'utilisateur n'existe pas !</p>
      </div>
      `;
      return;
    }
    const utilisateur = querySnapshot.docs[0].data();

    // Vérifie si le mot de passe est correct
    if (utilisateur.motdepasse !== motdepasse) {
      texteHTMLSup.innerHTML="" //affiche le hmtl
      texteHTMLSup.innerHTML += //affiche le hmtl
      `
      <div class="justify-center">
        <p class="text-[#008F11] text-xl">Mot de passe incorrect !</p>
      </div>
      `;
      return;
    }

    // Supprime l'utilisateur
    const utilisateurRef = doc(db, "Utilisateurs", querySnapshot.docs[0].id); //cherche l'id de l'utilisateur
    await deleteDoc(utilisateurRef); //supprime le document correspondant de la BDD firebase
    texteHTMLSup.innerHTML="" //affiche le hmtl
    texteHTMLSup.innerHTML += //affiche le hmtl
    `
    <div class="justify-center">
      <p class="text-[#008F11] text-xl">L'utilisateur a été supprimé avec succès !</p>
    </div>
    `;
  } catch (error) {
    texteHTMLSup.innerHTML="" //affiche le hmtl
    texteHTMLSup.innerHTML += //affiche le hmtl
    `
    <div class="justify-center">
      <p class="text-[#008F11] text-xl">Une erreur est survenue lors de la suppression de l'utilisateur !</p>
    </div>
    `;
  }
};

const faireGagner = async () => {
  const gagnantHTML = document.querySelector("#gagnantHTML"); // lie le code à l'html avec l'id
  try {
    const nbDoc = await getDocument("Utilisateurs"); // récupère la collection Utilisateurs
    const utilisateurAleatoire = Math.floor(Math.random() * nbDoc.length); //récupère la taille de la collection 
    const utilisateurAAfficher = nbDoc[utilisateurAleatoire]; // assigne le nombre aléatoire 
    gagnantHTML.innerHTML = "";
    gagnantHTML.innerHTML += 
    gagnantHTML.innerHTML = // Affiche le html du 4ème document uniquement
      `
      <div class="flex justify-center">
        <div>
          <p class="text-[#008F11] text-xl">Gagnant(e) : ${utilisateurAAfficher.pseudo} !</p> 
          <p class="text-[#008F11] text-xl">Email : ${utilisateurAAfficher.email}</p> 
        </div>
      </div>
      `;
  } catch (error) { // en cas d'erreur alors il affiche cela :
    gagnantHTML.innerHTML = "";
    gagnantHTML.innerHTML += 
    `
    <div class="justify-center">
      <p class="text-[#008F11] text-xl">Un problème est survenu !</p>
    </div>
    `;
  }
}

const EcouterInscription = async (event) => {
  event.preventDefault(); // permet d'éviter de recharger la page en continu
  const pseudo = document.querySelector("#pseudoIns").value; //lier le js à l'html pour le pseudo
  const email = document.querySelector("#emailIns").value; //lier le js à l'html pour l'email
  const motdepasse = document.querySelector("#mdpIns").value;//lier le js à l'html pour le mot de passe
  await Inscription(pseudo, email, motdepasse);
};

const EcouterConnexion = async (event) => {
  event.preventDefault(); // permet d'éviter de recharger la page en continu
  const pseudo = document.querySelector("#pseudoCon").value;//lier le js à l'html pour le pseudo
  const motdepasse = document.querySelector("#mdpCon").value;//lier le js à l'html pour le mot de passe
  await Connexion(pseudo, motdepasse);
};

const EcouterSupprimer = async (event) => {
  event.preventDefault(); // permet d'éviter de recharger la page en continu
  const pseudo = document.querySelector("#pseudoSup").value;//lier le js à l'html pour le pseudo
  const motdepasse = document.querySelector("#mdpSup").value;//lier le js à l'html pour le mot de passe
  await supprimerUtilisateur(pseudo, motdepasse);
};

// Ajout des écoutes pour les boutons d'inscription et de connexion
const btnInscription = document.querySelector("#btnInscription")
btnInscription.addEventListener("click", EcouterInscription);
const btnConnexion = document.querySelector("#btnConnexion")
btnConnexion.addEventListener("click", EcouterConnexion);
const btnSupprimer = document.querySelector("#btnSupprimer");
btnSupprimer.addEventListener("click", EcouterSupprimer);


const btnFaireGagner = document.querySelector("#btnFaireGagner");
btnFaireGagner.addEventListener("click", faireGagner);
