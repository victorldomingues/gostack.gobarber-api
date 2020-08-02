import { getRepository, Repository } from "typeorm";
import Appointment from "../entities/appointment";
import IAppointmentsRepository from "@modules/appointments/repositories/i-appointments.repository";
import ICreateAppointmentDto from "@modules/appointments/dtos/ICreateAppointmentDto";

class AppointmentsRepository implements IAppointmentsRepository {

    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    async save(data: Appointment): Promise<Appointment> {
        return await this.ormRepository.save(data);
    }

    async create(data: ICreateAppointmentDto): Promise<Appointment> {
        const appointment = await this.ormRepository.create(data);
        return await this.save(appointment);
    };

    async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date }
        });
        return findAppointment;
    }
}

export default AppointmentsRepository;