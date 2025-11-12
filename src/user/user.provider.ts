import { User } from './user.entity';

export const userProviders = [
  {
    provide: 'USER',
    useValue: User,
  },
];
