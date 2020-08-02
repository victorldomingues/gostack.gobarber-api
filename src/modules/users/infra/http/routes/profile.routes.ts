import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticaated';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/user-avatar.controller';
import ProfileController from '../controllers/profile.controller';

const profileRouter = Router();
const upload = multer(uploadConfig);
const usersController = new ProfileController();

profileRouter.put('/', ensureAuthenticated, usersController.update);

profileRouter.get('/', ensureAuthenticated, usersController.show);

export default profileRouter;