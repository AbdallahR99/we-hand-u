import { Catalog } from '@app/core/models/repository/catalog/catalog.model';
import { Guid } from 'guid-ts';
import { defineEventHandler } from 'h3';

const catalogs: Partial<Catalog>[] = [
  {
    id: Guid.newGuid(),
    name: 'خدمة تصليح',
    description: 'Catalog 1 Description',
  },
];

export default defineEventHandler(() => ({ message: 'Hello World' }));
