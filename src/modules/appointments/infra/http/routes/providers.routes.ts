import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticaated';
import ProvidersController from '../controllers/providers.controller';

const providersRouter = Router();
const appointmentsController = new ProvidersController();

providersRouter.use(ensureAuthenticated);
providersRouter.get('/', appointmentsController.index);

export default providersRouter;