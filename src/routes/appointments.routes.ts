import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/appointments.repository';
import CreateAppointmentService from '../services/create-appointment.service';
import { getCustomRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticaated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, resposne) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    return resposne.json(await appointmentsRepository.find());
});

appointmentsRouter.post('/', async (request, resposne) => {

    const { providerId, date } = request.body;
    const parsedDate = (parseISO(date));
    const service = new CreateAppointmentService();
    const appointment = await service.execute({ providerId, date: parsedDate });
    return resposne.json(appointment);

});

export default appointmentsRouter;