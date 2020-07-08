import { Router } from "express";
import AuthenticateUserService from "../services/authenticate-user.service";

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, resposne) => {

    const { email, password } = request.body;
    const service = new AuthenticateUserService();
    const { user, token } = await service.execute({ email, password });
    return resposne.json({ user, token });

});

export default sessionsRouter;