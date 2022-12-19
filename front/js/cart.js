fetch("http://localhost:3000/api/products")
    //Récupère les valeurs de l'API et les retournent en json
    .then((res) => res.json())
    //Retourne les canapés
    .then(function(canapes) {
        console.log(canapes)

        
        let cart = localStorage.getItem("cart")
        let cartParsed = JSON.parse(cart)
        for (const key in cartParsed) {
            let productFound = canapes.find((canape) => {
                canape._id === cartParsed[key].itemId
            })
            console.log(productFound)
            console.log(typeof cartParsed[key].itemId)
            console.log(typeof canapes[0]._id)
            document
            .getElementById("cart__items")
            .innerHTML += `<article class="cart__item" data-id="${cartParsed[key].itemId}" data-color="${cartParsed[key].itemColor}">
                            <div class="cart__item__img">
                            <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                            </div>
                            <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>Nom du produit</h2>
                                <p>${cartParsed[key].itemColor}</p>
                                <p>42,00 €</p>
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
        

        
        
        
        



    })
    //Retourne une erreur dans la console
    .catch((error) => {
        console.log(error)
    })
