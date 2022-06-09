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

// Affichage de la couleur
body.className = window.localStorage.getItem("colorBG")

// Affichage des tâches
// window.localStorage.setItem("todo", "Vaiselle,course,faire le pain")
// window.localStorage.setItem("inProgress", "P5,Rapport d'optimisation")
// window.localStorage.setItem("ended", "P4,Audit")

for (let section of listSection){
    section_en_cours = document.getElementById(section)
    let tasks = window.localStorage.getItem(section);
    tasks = tasks.split(",");
    for (let task of tasks){
        if (task){
            let newArticle = document.createElement("article")
            newArticle.innerText = task
            section_en_cours.appendChild(newArticle)
        }
    }
}

let articles = document.querySelectorAll("article")

// fonction qui supprime un élément du storage
const removeChildStorage = (section, element) => {
    // Cibler la bonne section
    let listDataStorage = window.localStorage.getItem(section)
    // conversion en liste
    if (listDataStorage.includes(",")){
        listDataStorage = listDataStorage.split(",")
        // Suppression de l'élément ciblé
        indexDelete = listDataStorage.indexOf(element)
        listDataStorage.splice(indexDelete, indexDelete)
        // Enregistrement dans le localStorage
        window.localStorage.setItem(section, listDataStorage.toString())
    }
    else {
        window.localStorage.setItem(section, "")
    }
}

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

// Fonction qui retourne le nom de la section suivante
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

// Sélection d'un article stocké dans la variable tacheSelect + animation visuelle
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
        removeChildStorage(tacheSelect.parentNode.id, tacheSelect.innerText)
        tacheSelect.remove()
    }

    // Touche entrée pour sauvegarder
    else if(touch.key == "Enter"){
        if (document.querySelector("input").value){
            let articleNew = document.createElement("article")
            articleNew.innerText  = document.querySelector("input").value
            document.querySelector("input").parentNode.appendChild(articleNew)
            articles = document.querySelectorAll("article")
        }
    }
})

// Création d'une tâche
sections.forEach(sections =>{
    sections.addEventListener("mouseenter", (section)=>{
        let newInput = document.createElement("input")
        newInput.setAttribute("placeholder", "Faire...")
        section.target.appendChild(newInput)
    })

    sections.addEventListener("mouseleave", (section)=>{
        while(document.querySelector("input")){
            let input = document.querySelector("input")
            input.remove()
        }
    })
})