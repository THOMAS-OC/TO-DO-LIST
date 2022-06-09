// Elements d'affichage
const fleche = document.getElementsByClassName("arrow")[0]
const boxColor = document.getElementsByTagName("aside")[0]
const boxColorItem = document.querySelectorAll("aside div:not(.arrow)")
console.log(boxColorItem);
// éléments utilitaires
const body = document.querySelector("body")
const sections = document.querySelectorAll("section")
let posBoxcolor = true 
const listSection = ["todo", "inProgress", "ended"]
let tacheSelect = document.querySelector("article")
let indexTacheSelect = listSection.indexOf(tacheSelect.target)
let nextIndex = 0

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
    console.log(tasks);
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
        console.log(listDataStorage);
        // Enregistrement dans le localStorage
        window.localStorage.setItem(section, listDataStorage.toString())
    }
    else {
        window.localStorage.setItem(section, "")
    }
}


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
            console.log("Repli de la box de couleur");
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
    console.log(el.target);
    if (el.target == body){
        tacheSelect.target.className = ""
    }
})

// Sélection d'un article stocké dans la variable tacheSelect + animation visuelle
document.addEventListener("click",(el)=>{
    if(el.target.localName == "article"){
        if (document.querySelector(".activeArticle")){
            animation = document.querySelector(".activeArticle")
            console.log(animation);
            animation.className = ""
        }
        tacheSelect = el
        tacheSelect.target.className = "activeArticle"
    };
})


// Déplacement des tâches d'un groupe à l'autre
document.addEventListener("keydown", (touch)=>{

    // Touche pour déplacer la tâche à droite
    if(touch.key == "ArrowRight"){
        console.log("Déplacement vers la droite");
        console.log(tacheSelect.target.parentNode)
        indexTacheSelect = tacheSelect.target.parentNode.id
        indexTacheSelect = listSection.indexOf(indexTacheSelect)
        nextIndex = indexTacheSelect + 1
        console.log(indexTacheSelect);
        nextSection = document.getElementById(`${listSection[nextIndex]}`)
        console.log(nextSection);
        nextSection.appendChild(tacheSelect.target)
    }

    // Touche pour déplacer la tâche à gauche
    else if(touch.key == "ArrowLeft"){
        console.log("Déplacement vers la gauche");
        console.log(tacheSelect.target.parentNode)
        indexTacheSelect = tacheSelect.target.parentNode.id
        indexTacheSelect = listSection.indexOf(indexTacheSelect)
        console.log(indexTacheSelect)
        nextIndex = indexTacheSelect - 1
        console.log(indexTacheSelect);
        nextSection = document.getElementById(`${listSection[nextIndex]}`)
        console.log(nextSection);
        nextSection.appendChild(tacheSelect.target)
    }

    // Touche de suppression
    else if(touch.key == "Delete"){
        console.log(tacheSelect.target.innerText);
        removeChildStorage(tacheSelect.target.parentNode.id, tacheSelect.target.innerText)
        tacheSelect.target.remove()
    }

    // Touche entrée pour sauvegarder
    else if(touch.key == "Enter"){
        if (document.querySelector("input").value){
            console.log(document.querySelector("input"));
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