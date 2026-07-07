import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { QueryProductsDto } from './dto/query-products.dto';
import type { Product } from '../../interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  list(@Query() query: QueryProductsDto): Product[] {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  getById(@Param('id') id: string): Product {
    const product = this.productsService.findById(Number(id));
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
