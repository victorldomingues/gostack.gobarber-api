import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/i-appointments.repository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointments.repository';

import IUsersRepository from '@modules/users/repositories/i-users.repository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/users.repository';

import UserTokensRepository from '@modules/users/infra/typeorm/repositories/user-tokens.repository';
import IUserTokensRepository from '@modules/users/repositories/i-user-tokens.repository';

import '@shared/providers';
import '@modules/users/providers';


container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);


container.registerSingleton<IUserTokensRepository>(
    'UserTokensRepository',
    UserTokensRepository
);