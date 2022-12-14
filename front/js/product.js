fetch("http://localhost:3000/api/products")
    //Récupère les valeurs de l'API et les retournent en json
    .then((res) => res.json())
    //Retourne les canapés
    .then(function(canapes) {
        console.log(canapes)


        
    })
    //Retourne une erreur dans la console
    .catch((error) => {
        console.log(error)
    }) 