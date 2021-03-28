import { Injectable, NotFoundException } from "@nestjs/common";
import { title } from "node:process";
import {Product} from "./product.model"


@Injectable()
export class ProductService {
    private products: Product[]  = [];

    insertProduct(name: string, desc: string, price: number){
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, name, desc, price);
        this.products.push(newProduct);
        return prodId;
    }

    fetchProducts(){
        return [...this.products];
    }

    getSingleProd(prodId : string){
        const product = this.findProduct(prodId)[1];
        return {...product};
    }

    updateProduct(
        prodId :string,
        name: string,
        desc : string,
        price : number
        ){
            const [index, product] = this.findProduct(prodId);
            const updatedProduct = {...product};

            if(name){
                updatedProduct.name = name;
            }
            if(desc){
                updatedProduct.description = desc;
            }
            if(price){
                updatedProduct.price = price;
            }
            this.products[index] = updatedProduct;


    }
    deleteProduct(prodId: string){
        const [index, _] = this.findProduct(prodId);
        this.products.splice(index,1);
    }

    private findProduct(id:string): [number, Product]{
        const productINdex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productINdex];

        if(!product){
            throw new NotFoundException('Product Not found!');
        }
        return [productINdex,product];
    }
}