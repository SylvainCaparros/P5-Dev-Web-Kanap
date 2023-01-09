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
    calcul(ls)
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
            calcul(ls)
        })
    })
}

function calcul (ls) {
    let price = 0
    let nombreCanapes = 0
    canapesAll.forEach(canape => {
        for (const canapeLs in ls) {
            if(ls[canapeLs].itemId == canape._id) {
                price += canape.price * ls[canapeLs].itemQty
                nombreCanapes += ls[canapeLs].itemQty
            }
        }
    })
    document
        .getElementById("totalQuantity")
        .innerText = nombreCanapes
    document
        .getElementById("totalPrice")
        .innerText = price
}

setPanier()

function formulaire() {
    const formulaires = document.getElementsByClassName("cart__order__form")
    Array.from(formulaires).forEach((formulaire) => {
        formulaire.addEventListener("submit", (e) => {
            e.preventDefault()
            //Validation regex firstname
            const champsFirstName = document.getElementById("firstName")
            const regex1 = /^[a-zA-Z\- ]{3,20}$/
            if (regex1.exec(champsFirstName.value)) {
                document.getElementById("firstNameErrorMsg")
                    .innerText = ''
            }
            else {
                document.getElementById("firstNameErrorMsg")
                    .innerText = 'Prenom non conforme'
            }
            //Validation regex lastname
            const champsLastName = document.getElementById("lastName")
            if (regex1.exec(champsLastName.value)) {
                document.getElementById("lastNameErrorMsg")
                    .innerText = ''
            }
            else {
                document.getElementById("lastNameErrorMsg")
                    .innerText = 'Nom non conforme'
            }
            //Validation regex adresse
            const champsAdresse = document.getElementById("address")
            const regex2 = /^[a-zA-Z\- 0-9]{3,100}$/
            if (regex2.exec(champsAdresse.value)) {
                document.getElementById("addressErrorMsg")
                    .innerText = ''
            }
            else {
                document.getElementById("addressErrorMsg")
                    .innerText = 'Adresse non conforme'
            }
            //Validation regex ville
            const champsVille = document.getElementById("city")
            if (regex1.exec(champsVille.value)) {
                document.getElementById("cityErrorMsg")
                    .innerText = ''
            }
            else {
                document.getElementById("cityErrorMsg")
                    .innerText = 'Ville non conforme'
            }
            //Validation regex email
            const champsEmail = document.getElementById("email")
            const regex3 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            if (regex3.exec(champsEmail.value)) {
                document.getElementById("emailErrorMsg")
                    .innerText = ''
            }
            else {
                document.getElementById("emailErrorMsg")
                    .innerText = 'Email non conforme'
            }
            if (regex1.exec(champsFirstName.value) 
            && regex1.exec(champsLastName.value) 
            && regex2.exec(champsAdresse.value) 
            && regex1.exec(champsVille.value) 
            && regex3.exec(champsEmail.value)) {
                let contact = {
                    firstName: champsFirstName.value,
                    lastName: champsLastName.value,
                    address: champsAdresse.value,
                    city: champsVille.value,
                    email: champsEmail.value
                }
                submit(contact)
            }
        })
    })
}
formulaire()

function submit(contact) {
    let cart = localStorage.getItem("cart")
    let cartParsed = JSON.parse(cart)
    let products = []
    for (const key in cartParsed) {
        products.push(cartParsed[key].itemId)
    }
    fetch("http://localhost:3000/api/products/order", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({contact, products})
             })
        .then((res) => res.json())
        .then(function(order) {
            console.log(order)
            window.location = `confirmation.html?orderId=${order.orderId}`;
        })
        .catch((error) => {
            console.log(error)
        })
}