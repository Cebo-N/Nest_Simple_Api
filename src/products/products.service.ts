import { Injectable, NotFoundException } from "@nestjs/common";
import {InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";

import {Product} from "./product.model"


@Injectable()
export class ProductService {
    private products: Product[]  = [];
  
    constructor(
        @InjectModel('Product') private readonly productModel: Model<any,Product>){}

    async insertProduct(name: string, desc: string, price: number){
        
        const newProduct = new this.productModel (
            { name:name, 
              description:desc, 
              price:price});

        const result  = await newProduct.save();
        return result.id as string;
    }

    async fetchProducts(){
        const products = await this.productModel.find().exec();
        return products.map((prod) => ({
            id:prod.id, 
            name:prod.name,
            description: prod.description,
            price: prod.price }));
        
    }

    async getSingleProd(prodId : string){
        const product = await this.findProduct(prodId);
        return product;
    }

    updateProduct(
        prodId :string,
        name: string,
        desc : string,
        price : number
        ){
            // const [index, product] = this.findProduct(prodId);
            // const updatedProduct = {...product};

            // if(name){
            //     updatedProduct.name = name;
            // }
            // if(desc){
            //     updatedProduct.description = desc;
            // }
            // if(price){
            //     updatedProduct.price = price;
            // }
            // this.products[index] = updatedProduct;


    }
    deleteProduct(prodId: string){
        // const [index, _] = this.findProduct(prodId);
        // this.products.splice(index,1);
    }

    private async findProduct(id:string): Promise<Product>{
        
        const product = await this.productModel.findById(id);

        if(!product){
            throw new NotFoundException('Product Not found!');
        }
        return {
            id:product.id,
            name:product.name,
            description: product.description,
            price: product.price
        };
    }
}