let url = document.location.href
let idurl = new URL(url)
let id = idurl.searchParams.get("id")
console.log(id)

fetch(`http://localhost:3000/api/products/${id}`)
    //Récupère les valeurs de l'API et les retournent en json
    .then((res) => res.json())
    //Retourne les canapés
    .then(function(canape) {
        console.log(canape)
            //Récupère le prix du canapé
            document
                .getElementById("price")
                .innerHTML = `${canape.price}`
            //Récupère le nom du canapé
            document
                .getElementById("title")
                .innerHTML = `${canape.name}`
            //Récupère la description du canapé
            document
                .getElementById("description")
                .innerHTML = `${canape.description}`
            //Récupère l'image du canapé
            let photos = document.getElementsByClassName("item__img")
            for (const key in photos) {
                if (Object.hasOwnProperty.call(photos, key)) {
                    const photo = photos[key];
                    photo.innerHTML = `<img src="${canape.imageUrl}" alt="${canape.altTxt}">`
                }
            }
            //Récupère le tableau de couleurs des canapés
            let colorSelect = document.getElementById("colors")
            for (const key in canape.colors) {
                if (Object.hasOwnProperty.call(canape.colors, key)) {
                    const color = canape.colors[key];
                    //Créé un élément de type option en HTML
                    let colorType = document.createElement("option")
                    //Insère la variable color dans les options
                    colorType.innerText = color
                    //Défini la value de mes options pour l'envoi de mon formulaire
                    colorType.value = key
                    //Créé un ligne dans ma liste déroulante
                    colorSelect.appendChild(colorType)             
                }
            }
            

            

    })
    //Retourne une erreur dans la console
    .catch((error) => {
        console.log(error)
    }) 