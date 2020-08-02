import { container } from 'tsyringe';
import IHashProvider from './HashProvider/models/hash-provider.model';
import BCryptHashProvider from './HashProvider/implementations/bcrypt-hash.provider';


container.registerSingleton<IHashProvider>(
    'HashProvider',
    BCryptHashProvider
);