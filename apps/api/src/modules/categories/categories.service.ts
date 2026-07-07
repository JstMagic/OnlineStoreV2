import { Injectable } from '@nestjs/common';
import { categories } from '../../mock-data/categories';
import type { Category } from '../../interfaces';

@Injectable()
export class CategoriesService {
  findAll(): Category[] {
    return categories;
  }
}
