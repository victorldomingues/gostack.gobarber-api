import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticaated';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointments.repository';
import AppointmentsController from '../controllers/appointments.controller';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, resposne) => {
//     const appointmentsRepository = new AppointmentsRepository();
//     return resposne.json(await appointmentsRepository.find());
// });

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;