// JavaScript function for registering a new user
const Inscription = async (pseudo, email, motdepasse) => { //fonction qui prend 3 arguments
  try {
    const data = await fetch("https://datajsonact.glitch.me/Utilisateurs.json"); //on récupère le json avec fetch
    const json = await data.json();
    console.log("json", json); // on vérifie qu'il marche
    const utilisateurExists = json.data.find((utilisateur) => utilisateur.pseudo === pseudo); // chercher l'utilisateur dans le fichier JSON
    if (utilisateurExists) {
      alert("L'utilisateur existe déjà"); //montrer que le pseudo est déjà pris
    }
    const nouvelUtilisateur = { //créer un nouvel obj utilisateur
      pseudo,
      email,
      motdepasse,
    };
    json.data.push(nouvelUtilisateur); //push dans la liste du JSON
    await fetch("https://datajsonact.glitch.me/Utilisateurs.json", { // récupérer la donnée en ligne du JSON
      method: "PUT", //la push
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json), //remettre le fichier en JSON
    });
  } catch (error) { //détecte et affiche le message d'erreur
    console.error("Erreur lors de l'inscription de l'utilisateur", error);
    alert("Une erreur est survenue lors de l'inscription de l'utilisateur");
  }
};

// JavaScript function for logging in a user
const Connexion = async (pseudo, motdepasse) => { //fonction qui prend 2 arguments
  try {
    const data = await fetch("https://datajsonact.glitch.me/Utilisateurs.json"); //récupère le fichier JSON
    const json = await data.json();
    const utilisateurExistant = json.data.find( (utilisateur) => utilisateur.pseudo === pseudo); //vérifie si l'utilisateur existe dans le JSON
    if (!utilisateurExistant) {
      alert("L'utilisateur n'existe pas"); //affiche message d'erreur si ce n'est pas le cas
    }
    if (utilisateurExistant.motdepasse !== motdepasse) { //vérifie si le mot de passe est faux
      alert("Mot de passe incorrect");
    }
    alert("Connexion réussie !"); //affiche si le mot de passe est correct
    const afficherUtilisateur = document.querySelector("#utilisateur-container"); //affiche les données de l'utilisateur
    afficherUtilisateur.innerHTML += 
    `
    <div class="flex-col border border-[#008F11]] text-[#008F11] text-xl">
      <p>${utilisateurExistant.pseudo}</p>
      <p>${utilisateurExistant.email}</p>
    </div>
    
    `;
  } catch (error) { //si erreur alors un message est envoyé pour indiquer que la connexion a échoué
    console.error("Erreur lors de la connexion de l'utilisateur", error);
    alert("Une erreur est survenue lors de la connexion de l'utilisateur");
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

// Ajout des écoutes pour les boutons d'inscription et de connexion
const btnInscription = document.querySelector("#btnInscription")
btnInscription.addEventListener("click", EcouterInscription);
const btnConnexion = document.querySelector("#btnConnexion")
btnConnexion.addEventListener("click", EcouterConnexion);

