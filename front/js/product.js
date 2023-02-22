let url = document.location.href
let idurl = new URL(url)
let id = idurl.searchParams.get("id")

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
            
            let bouton = document
                    .getElementById("addToCart")
                    .addEventListener("click", () => {
                        const quantity = document.getElementById("quantity").value
                        const colorSelected = document.getElementById("colors").options[document.getElementById("colors").selectedIndex].text
                        console.log(colorSelected)
                        
                        if ((quantity < 1 || quantity > 100) || (colorSelected == "--SVP, choisissez une couleur --")) {
                            alert("Choisissez une quantité comprise entre 1 et 100 et selectionnez une couleur")
                        }
                        else {
                            //Récupérer ma donnée du local storage
                            let cart = localStorage.getItem("cart")
                            //Création de mon objet cart
                            //si local storage vide création d'un panier vide
                            if (cart === null) {
                                cart = {}
                            }
                            //si local storage n'est pas vide, récupération de l'ancien panier
                            else {
                                cart = JSON.parse(cart)
                            }
                            //si l'objet n'existe pas dans mon panier je le créer
                            let key = id + "-" + colorSelected
                            if (cart[key] === undefined) {
                                let myItemInfo = { itemId : id, itemQty : parseInt(quantity), itemColor : colorSelected }
                                cart[key] = myItemInfo
                                alert(`${canape.name} a bien été ajouté à votre panier`)
                            }
                            //si il existe j'ajoute la quantité à celle existante
                            else {
                                if ((cart[key].itemQty + parseInt(quantity)) > 100) {
                                    alert(`Vous ne pouvez pas avoir plus de 100 exemplaires du même produit dans votre panier et vous en avez déjà ${cart[key].itemQty}`)
                                }
                                else {
                                    cart[key].itemQty += parseInt(quantity)
                                    alert(`${canape.name} a bien été ajouté à votre panier`)
                                }
                            }
                            //sauvegarde de mon panier dans mon local storage
                            localStorage.setItem("cart", JSON.stringify(cart))
                        }
                    })
    })
    //Retourne une erreur dans la console
    .catch((error) => {
        console.log(error)
    })