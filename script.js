// Elements d'affichage
const fleche = document.getElementsByClassName("arrow")[0]
const boxColor = document.getElementsByTagName("aside")[0]
const boxColorItem = document.querySelectorAll("aside div:not(.arrow)")
// éléments utilitaires
const body = document.querySelector("body")
const sections = document.querySelectorAll("section")
let posBoxcolor = true 
const listSection = ["todo", "inProgress", "ended"]
let tacheSelect = document.querySelector("article")
let nextIndex = 0
let nextSection = ""
let previousSection = ""
const button = document.querySelector("button.save")
const buttonDelete = document.querySelector("button.delete")

const buttonSaveArticle = document.querySelector(".saveArticle")
const buttonAnnuleArticle = document.querySelector(".deleteArticle")

// Affichage de la couleur
if (window.localStorage.getItem("colorBG")){
    body.className = window.localStorage.getItem("colorBG")
}
else {
    body.className = "blueGradient"
}

// Affichage des tâches
// window.localStorage.setItem("todo", "Vaiselle,course,faire le pain")
// window.localStorage.setItem("inProgress", "P5,Rapport d'optimisation")
// window.localStorage.setItem("ended", "P4,Audit")

for (let section of listSection){
    section_en_cours = document.getElementById(section)
    let tasks = window.localStorage.getItem(section);
    if (tasks){
        tasks = tasks.split(",");
        for (let task of tasks){
            if (task){
                let newArticle = document.createElement("article")
                newArticle.innerText = task
                section_en_cours.appendChild(newArticle)
            }
        }
    }
}

let articles = document.querySelectorAll("article")

// Fonction qui retourne la section suivante
const nextSectionUpdate = () =>{

    parentTaskSelect = tacheSelect.parentNode.id
    if (parentTaskSelect == "todo"){
        nextSection = "inProgress"
    }
    else if (parentTaskSelect == "inProgress") {
        nextSection = "ended"
    }
    else {
        nextSection = ""
    }
    console.log("Section suivante : " + nextSection);

}

// Fonction qui retourne le nom de la section précédente
const previousSectionUpdate = () =>{

    parentTaskSelect = tacheSelect.parentNode.id
    if (parentTaskSelect == "inProgress"){
        previousSection = "todo"
    }
    else if (parentTaskSelect == "ended") {
        previousSection = "inProgress"
    }
    else {
        previousSection = ""
    }
    console.log("Section précédante : " + previousSection);
}


// Show/Hide sur la boite de couleur en bas à droite
fleche.addEventListener("click", ()=>{

    if (posBoxcolor){
        boxColor.style.transform = "translateX(270px)"
        posBoxcolor = false
        fleche.style.transform = "rotate(0.5turn)"
    }

    else{
        boxColor.style.transform = "translateX(-20px)"
        posBoxcolor = true
        fleche.style.transform = "rotate(1turn)"
    }

})


boxColorItem.forEach(colorItem =>{
    colorItem.addEventListener("click", (item)=>{
        // Bouton de repli de la boite de couleurs
        if(item.target.className == "arrow"){
        }

        // Sauvegarde de la couleur favorite dans le storage
        else {
            body.classList = item.target.classList
            window.localStorage.setItem("colorBG", item.target.className)
        }
    })
})

// Déselectionner
document.addEventListener("click",(el)=>{
    if (el.target == body){
        tacheSelect.className = ""
    }
})

// Sélection d'un article avec stockage dans la variable tacheSelect + animation visuelle
document.addEventListener("click",(el)=>{
    if(el.target.localName == "article"){
        tacheSelect = el.target
        nextSectionUpdate()
        previousSectionUpdate()
        if (document.querySelector(".activeArticle")){
            animation = document.querySelector(".activeArticle")
            animation.className = ""
        }
        tacheSelect.className = "activeArticle"
    };
})

// Gestion du clic droit
document.addEventListener("dblclick", (el) => {
    if(el.target.localName == "article"){
        // Ouverture de la modale
        document.querySelector(".updateTask").className = "updateTask on"
        console.log(document.querySelector("div input"));
        document.querySelector("div input").value = el.target.innerText
        tacheSelect = el.target
        nextSectionUpdate()
        previousSectionUpdate()

        if (document.querySelector(".activeArticle")){
            animation = document.querySelector(".activeArticle")
            animation.className = ""
        }
        tacheSelect.className = "activeArticle"
    };


})

// Modification d'une tâche
buttonSaveArticle.addEventListener("click", () => {
    // Modification de la tâche
    let inputSetArticle = document.querySelector("div input")
    tacheSelect.innerText = inputSetArticle.value.trim()
    // Fermeture de la modale
    document.querySelector(".updateTask").className = "updateTask"
})

// Annulation de la modification d'une tâche
buttonAnnuleArticle.addEventListener("click", () => {
    // Fermeture de la modale
    document.querySelector(".updateTask").className = "updateTask"
})


// Déplacement des tâches d'un groupe à l'autre
document.addEventListener("keydown", (touch)=>{

    // Touche pour déplacer la tâche à droite
    if(touch.key == "ArrowRight"){
        if (nextSection){
            console.log("Déplacement vers la droite");
            console.log(document.getElementById(nextSection));
            document.getElementById(nextSection).appendChild(tacheSelect)
            nextSectionUpdate()
            previousSectionUpdate()
        }
    }

    // Touche pour déplacer la tâche à gauche
    else if(touch.key == "ArrowLeft"){
        if (previousSection){
            console.log("Déplacement vers la gauche");
            console.log(document.getElementById(previousSection));
            document.getElementById(previousSection).appendChild(tacheSelect)
            nextSectionUpdate()
            previousSectionUpdate()
        }
    }

    // Touche de suppression
    else if(touch.key == "Delete"){
        tacheSelect.remove()
    }

    // Touche entrée pour sauvegarder
    else if(touch.key == "Enter"){
        if (document.querySelector(".inputArticle").value){
            let articleNew = document.createElement("article")
            articleNew.innerText  = document.querySelector(".inputArticle").value
            document.querySelector(".inputArticle").parentNode.appendChild(articleNew)
            articles = document.querySelectorAll("article")
        }
    }
})

// Création d'une tâche
sections.forEach(sections =>{
    sections.addEventListener("mouseenter", (section)=>{
        let newInput = document.createElement("input")
        newInput.setAttribute("placeholder", "Faire...")
        newInput.className = "inputArticle"
        section.target.appendChild(newInput)
    })

    sections.addEventListener("mouseleave", (section)=>{
        while(document.querySelector(".inputArticle")){
            let input = document.querySelector(".inputArticle")
            input.remove()
        }
    })
})

// Boucle de sauvegarde

// parcourir toutes les sections
    // pour la section x
    // parcourir tous les articles --> document.querySelectorAll(`${section} article`)
    // Récupérer le texte de chaque article et les séparer par des virgules
    // enregistrement dans le storage --> window.localStorage.setItem(section, string)

function updateStorage(){
    for (let section of listSection){
        let dataStorageList = []
        let dataStorageStr = ""
        // Selectionner tous les articles d'une section
        articlesInSection = document.querySelectorAll(`#${section} article`)
        // Boucle dans ces articles
        for (let article of articlesInSection){
            dataStorageList.push(article.innerText.trim())
            dataStorageStr = dataStorageList.toString()
            console.log("Chaine finale " + dataStorageStr);
        }
        // Enregistrement final dans le storage
        window.localStorage.setItem(section, dataStorageStr)
    }
}

button.addEventListener("click", ()=>{

    for (let section of listSection){
        let dataStorageList = []
        let dataStorageStr = ""
        // Selectionner tous les articles d'une section
        articlesInSection = document.querySelectorAll(`#${section} article`)
        // Boucle dans ces articles
        for (let article of articlesInSection){
            dataStorageList.push(article.innerText.trim())
            dataStorageStr = dataStorageList.toString()
            console.log("Chaine finale " + dataStorageStr);
        }
        // Enregistrement final dans le storage
        window.localStorage.setItem(section, dataStorageStr)
    }
    
})

// Formatage des tâches
buttonDelete.addEventListener("click", ()=>{

    let allArticles = document.querySelectorAll("article")
    console.log(allArticles);

    allArticles.forEach((article) => {
        article.remove()
    })

    window.localStorage.clear()
    
})