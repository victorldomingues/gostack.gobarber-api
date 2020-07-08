import { Repository, EntityRepository } from "typeorm";
import Appointment from "../models/appointment";

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date }
        });
        return findAppointment || null;
    }
}

export default AppointmentsRepository;