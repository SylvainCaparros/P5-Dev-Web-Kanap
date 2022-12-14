fetch("http://localhost:3000/api/products")
    //Récupère les valeurs de l'API et les retournent en json
    .then((res) => res.json())
    //Retourne les canapés
    .then(function(canapes) {
        console.log(canapes)

        canapes.forEach(function(canape) {
            document
                .getElementById("items")
                .innerHTML += `<a href="./product.html?id=${canape._id}">
                                <article>
                                <img src="${canape.imageUrl}" alt="${canape.altTxt}">
                                <h3 class="productName">${canape.name}</h3>
                                <p class="productDescription">${canape.description}</p>
                                </article>
                            </a>`
        });

    })
    //Retourne une erreur dans la console
    .catch((error) => {
        console.log(error)
    }) 
