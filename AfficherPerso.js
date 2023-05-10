import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, setDoc, getDoc, where, writeBatch, query, orderBy, doc, limit, getDocs } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCJHQlxEfS_1rbnX-5OLA8B7QGEz28FKRM",
  authDomain: "fir-27matrik-s.firebaseapp.com",
  projectId: "fir-27matrik-s",
  storageBucket: "fir-27matrik-s.appspot.com",
  messagingSenderId: "407433059580",
  appId: "1:407433059580:web:0dc8ff8164dcb657fbcb79"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



const getDocument = async (collectionName) => {
  const DocumentColRef = collection(db, collectionName);
  const DocumentSnapshot = await getDocs(DocumentColRef);
  const DocumentList = DocumentSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
  return DocumentList
}



const userExist = async (name, password) => {

  const DocumentColRef = collection(db, "users");
  const q = await query(DocumentColRef, where("name", "==", name), where("password", "==", password))
  const querySnapshot = await getDocs(q);
  console.log("querySnapshot docs", querySnapshot.docs)
  const DocumentList = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
  console.log('test user already exists', name, password, DocumentList);
  return DocumentList;
};

// userExist("enzo", "1234")
// userExist("enzo", "test")
// fonction pour créer une collection (CREATE)
const createDocument = async (collectionName, newObj) => {
  console.log('createDocument', newObj)
  const DocumentColRef = collection(db, collectionName);
  const DocumentSnapshot = await addDoc(DocumentColRef, newObj);
}
// createDocument("burgers", {name: "cheeseburger"})

// fonction pour mettre à jour une collection (UPDATE)
const updateDocument = async (collectionName, newObj) => {
  console.log('updateDocument', newObj)
  const DocumentColRef = doc(db, collectionName, newObj.id)
  const DocumentSnapshot = await updateDoc(DocumentColRef, newObj);
}
// fonction pour supprimer une collection (DELETE)
const deleteDocument = async (collectionName, id) => {
  console.log('deleteDocument', id)
  const DocumentColRef = doc(db, collectionName, id)
  console.log('DocumentColRef', DocumentColRef)
  await deleteDoc(DocumentColRef, id);
}


const afficherUtilisateurs = async () => {
  const utilisateurs = await getDocument("Utilisateurs");
  console.log(utilisateurs);
  const utilisateursHTML = document.querySelector("#utilisateursHTML");
  utilisateurs.forEach((utilisateurs)=>{
    utilisateursHTML.innerHTML +=
    `
    <div class="flex-col border border-[#008F11]] text-[#008F11] text-xl">
        <p>${utilisateurs.pseudo}</p>
        <p>${utilisateurs.email}</p>
        <p>${utilisateurs.motdepasse}</p>
      </div>
    `;
  })
}
afficherUtilisateurs();


const Inscription = async (pseudo, email, motdepasse) => {
  try {
    const utilisateurExists = await userExist(pseudo, motdepasse);
    if (utilisateurExists.length > 0) {
      alert("L'utilisateur existe déjà");
      return;
    }
    const nouvelUtilisateur = {
      pseudo,
      email,
      motdepasse,
    };
    await createDocument("Utilisateurs", nouvelUtilisateur); //ajouter l'utilisateur à Firebase
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur", error);
    alert("Une erreur est survenue lors de l'inscription de l'utilisateur");
  }
};


const Connexion = async (pseudo, motdepasse) => {
  try {
    const q = query(collection(db, "Utilisateurs"), where("pseudo", "==", pseudo)); // récupère l'utilisateur avec le pseudo correspondant
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("L'utilisateur n'existe pas"); // affiche un message d'erreur si l'utilisateur n'existe pas
    } else {
      const utilisateur = querySnapshot.docs[0].data(); // récupère les données de l'utilisateur
      if (utilisateur.motdepasse !== motdepasse) { // vérifie si le mot de passe est incorrect
        alert("Mot de passe incorrect");
      } else {
        alert("Connexion réussie !");
        const afficherUtilisateur = document.querySelector("#utilisateur-container"); // affiche les données de l'utilisateur
        afficherUtilisateur.innerHTML += 
        `
        <div class="flex-col border border-[#008F11]] text-[#008F11] text-xl">
          <p>${utilisateur.pseudo}</p>
          <p>${utilisateur.email}</p>
        </div>
        `;
      }
    }
  } catch (error) {
    console.error("Erreur lors de la connexion de l'utilisateur", error);
    alert("Une erreur est survenue lors de la connexion de l'utilisateur");
  }
};

const supprimerUtilisateur = async (pseudo, motdepasse) => {
  try {
    // Vérifie si l'utilisateur existe et récupère ses données
    const q = query(collection(db, "Utilisateurs"), where("pseudo", "==", pseudo));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      alert("L'utilisateur n'existe pas");
      return;
    }
    const utilisateur = querySnapshot.docs[0].data();

    // Vérifie si le mot de passe est correct
    if (utilisateur.motdepasse !== motdepasse) {
      alert("Mot de passe incorrect");
      return;
    }

    // Supprime l'utilisateur
    const utilisateurRef = doc(db, "Utilisateurs", querySnapshot.docs[0].id);
    await deleteDoc(utilisateurRef);
    alert("L'utilisateur a été supprimé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur", error);
    alert("Une erreur est survenue lors de la suppression de l'utilisateur");
  }
};

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

