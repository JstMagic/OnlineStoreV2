import { Injectable } from '@nestjs/common';
import { products } from '../../mock-data/products';
import { QueryProductsDto } from './dto/query-products.dto';
import type { Product } from '../../interfaces';

@Injectable()
export class ProductsService {
  findAll(query: QueryProductsDto): Product[] {
    let result = [...products];
    const categoryFilter = query.category;
    if (categoryFilter) {
      result = result.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
    }
    if (query.sort === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (query.sort === 'price') {
      result.sort((a, b) => a.price - b.price);
    }
    return result;
  }

  findById(id: number): Product | undefined {
    return products.find(p => p.id === id);
  }
}
