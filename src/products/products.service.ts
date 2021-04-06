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

    async updateProduct(
        prodId :string,
        name: string,
        desc : string,
        price : number
        ){
            const product  = await this.findProduct(prodId);
            // const updatedProduct = {...product};

            if(name){
                product.name = name;
            }
            if(desc){
                product.description = desc;
            }
            if(price){
                product.price = price;
            }
            product.save();

    }
    async deleteProduct(prodId: string){
        const product = await this.findProduct(prodId);
        product.remove();
    }

    private async findProduct(id:string): Promise<Product>{
        let product;
        try{
            product = await this.productModel.findById(id);
        }catch(error){
            throw new NotFoundException('ID not found!');
        }
         
        if(!product){
            throw new NotFoundException('Product Not found!');
        }
        return product;
    }
}