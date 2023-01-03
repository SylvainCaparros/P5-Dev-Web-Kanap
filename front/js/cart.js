let canapesAll = []

function setPanier() {
    document
        .getElementById("cart__items")
        .innerHTML = ``
    fetch("http://localhost:3000/api/products")
    //Récupère les valeurs de l'API et les retournent en json
    .then((res) => res.json())
    //Retourne les canapés
    .then(function(canapes) {
        canapesAll = canapes
        let cart = localStorage.getItem("cart")
        let cartParsed = JSON.parse(cart)
        for (const key in cartParsed) {
            let productFound = canapes.find((canape) => {
                return canape._id === cartParsed[key].itemId
            })

            document
                .getElementById("cart__items")
                .innerHTML += `<article class="cart__item" data-id="${cartParsed[key].itemId}" data-color="${cartParsed[key].itemColor}">
                                <div class="cart__item__img">
                                <img src="${productFound.imageUrl}" alt="${productFound.altTxt}">
                                </div>
                                <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                    <h2>${productFound.name}</h2>
                                    <p>${cartParsed[key].itemColor}</p>
                                    <p>${productFound.price}</p>
                                </div>
                                <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartParsed[key].itemQty}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                    </div>
                                </div>
                                </div>
                            </article>`
        }
        addEventBtnSupp(cartParsed)
        modification(cartParsed)
        calcul(cartParsed)
        
    })
    //Retourne une erreur dans la console
    .catch((error) => {
        console.log(error)
    })
}

function addEventBtnSupp(ls) {
    const buttonsSelect = document.getElementsByClassName("deleteItem")
        Array.from(buttonsSelect).forEach((button) => {
            button.addEventListener("click", (e) => {
                let id = e.target.closest("article").getAttribute("data-id")
                let color = e.target.closest("article").getAttribute("data-color")
                const key = id + "-" + color
                    if (ls[key] !== undefined) {
                        delete ls[key]
                        localStorage.setItem("cart", JSON.stringify(ls))
                        setPanier()
                    }
            })
        })
}

function modification (ls) {
    const buttonsSelect = document.getElementsByClassName("itemQuantity")
    Array.from(buttonsSelect).forEach((button) => {
        button.addEventListener("change", (e) => {
            let id = e.target.closest("article").getAttribute("data-id")
            let color = e.target.closest("article").getAttribute("data-color")
            const key = id + "-" + color
            if (ls[key] !== undefined) {
                ls[key].itemQty = parseInt(button.value)
            }
            localStorage.setItem("cart", JSON.stringify(ls))
        })
    })
}

function calcul (ls) {
    canapesAll.forEach(element => {
        
    })
    console.log(canapesAll)
}

setPanier()