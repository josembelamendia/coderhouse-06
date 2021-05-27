const fileSystem = require('fs');

class Archivo {
    constructor(name) {
        this.name = name;
    }    

    async products() {
        let products = await fileSystem.promises.readFile('./' + this.name, 'utf-8')
        .then(content => {
            return JSON.parse(content)
        })
        .catch(error => {
            return "Error while reading products"
        }) 
        return products;
    }

    async leer() {
        let products = await this.products();
        console.log(products);
    }

    async guardar(title, price, url) {
        let products = await this.products();
        let id = products.length + 1;

        let product = generateProduct(title, price, url, id);

        products.push(product);
        await fileSystem.promises.writeFile('./' + this.name, JSON.stringify(products, null, 4));
    }
    
    borrar() {
        fileSystem.unlink('./' + this.name, error => {
            if(error) {
                console.log(error);
                return;
            }
            console.log("File deleted!");
        })
    }
}

module.exports.Archivo = Archivo;