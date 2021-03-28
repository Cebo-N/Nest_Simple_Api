import { Controller, Post, Body, Get, Param, Patch, Delete} from "@nestjs/common";
import {ProductService} from "./products.service"

@Controller('products')
export class ProductsController {

    constructor(private readonly productService: ProductService){}

    @Post()
    addProduct(
        @Body('name') prodName:string,
        @Body('description') prodDesc:string,
        @Body('price') prodPrice:number
    ): any{

        const pId = this.productService.insertProduct(prodName,prodDesc,prodPrice);
        return {id : pId};
    }

    @Get()
    getAllproducts(){
        return this.productService.fetchProducts();
    }

    @Get(':id')
    getSingleProduct(@Param('id') prodId:string){
        return this.productService.getSingleProd(prodId);
    }

    @Patch(':id')
    updateProduct(@Param(
        'id') prodId: string,
        @Body('name') prodName: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ){
        this.productService.updateProduct(prodId,prodName,prodDesc,prodPrice);
        return null;
    }

    @Delete(':id')
    deleteProduct(@Param('id') prodId : string){
        this.productService.deleteProduct(prodId);
        return null;
    }
}