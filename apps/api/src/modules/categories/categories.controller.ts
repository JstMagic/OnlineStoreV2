import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import type { Category } from '../../interfaces';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  list(): Category[] {
    return this.categoriesService.findAll();
  }
}
