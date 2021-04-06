import { Controller, Post, Body, Get, Param, Patch, Delete} from "@nestjs/common";
import {ProductService} from "./products.service"

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductService){}

    @Post()
    async addProduct(
        @Body('name') prodName:string,
        @Body('description') prodDesc:string,
        @Body('price') prodPrice:number
    ){

        const pId = await this.productService.insertProduct(prodName,prodDesc,prodPrice);
        return {id : pId};
    }

    @Get()
    async getAllproducts(){
        const products = await this.productService.fetchProducts();
        return products;
    }

    @Get(':id')
    async getSingleProduct(@Param('id') prodId:string){

        const product = await this.productService.getSingleProd(prodId);
        return product;
        
    }

    @Patch(':id')
    async updateProduct(@Param(
        'id') prodId: string,
        @Body('name') prodName: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ){
        const updatedProduct = await this.productService.updateProduct(prodId,prodName,prodDesc,prodPrice);
        return updatedProduct;
    }

    @Delete(':id')
    async deleteProduct(@Param('id') prodId : string){
        const product = await this.productService.deleteProduct(prodId);
        return product;
    }
}