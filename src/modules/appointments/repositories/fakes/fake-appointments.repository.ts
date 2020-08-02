import IAppointmentsRepository from "@modules/appointments/repositories/i-appointments.repository";
import ICreateAppointmentDto from "@modules/appointments/dtos/ICreateAppointmentDto";
import Appointment from "@modules/appointments/infra/typeorm/entities/appointment";
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns'
class FakeAppointmentsRepository implements IAppointmentsRepository {

    private appointments: Appointment[] = [];

    constructor() {
    }

    async save(data: Appointment): Promise<Appointment> {
        const index = this.appointments.findIndex(x => x.id === data.id);
        if (index > -1)
            this.appointments[index] = data;
        else
            this.appointments.push(data);
        return data;
    }

    async create({ date, providerId }: ICreateAppointmentDto): Promise<Appointment> {
        const appointment = { date, providerId, id: uuid() } as Appointment;
        return await this.save(appointment);
    };

    async findByDate(date: Date): Promise<Appointment | undefined> {
        return this.appointments.find(x => isEqual(x.date, date));
    }
}

export default FakeAppointmentsRepository;