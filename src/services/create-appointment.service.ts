import { startOfHour } from 'date-fns';
import AppointmentsRepository from '../repositories/appointments.repository';
import Appointment from '../models/appointment';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

interface Request {
    providerId: string,
    date: Date
}

class CreateAppointmentService {
    async execute({ date, providerId }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate)
            throw new AppError('This appointment is already booked', 401);

        const appointment = await appointmentsRepository.create({ providerId, date: appointmentDate });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}


export default CreateAppointmentService;