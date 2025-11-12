import { Todos } from './task.entity';

export const catsProviders = [
  {
    provide: 'TODOS',
    useValue: Todos,
  },
];
