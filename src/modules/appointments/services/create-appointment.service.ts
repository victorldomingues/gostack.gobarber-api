import { startOfHour } from 'date-fns';
import Appointment from '../infra/typeorm/entities/appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/i-appointments.repository';
import { injectable, inject } from 'tsyringe';


interface IRequest {
    providerId: string,
    date: Date
}

@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository) {
    }

    async execute({ date, providerId }: IRequest): Promise<Appointment> {

        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate)
            throw new AppError('This appointment is already booked', 401);

        const appointment = await this.appointmentsRepository.create({ date, providerId });

        return appointment;
    }
}


export default CreateAppointmentService;