import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateUserService from '../services/create-user.service';
import UsersRepository from '../repositories/users.repository';
import ensureAuthenticated from '../middlewares/ensureAuthenticaated';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvartarService from '../services/update-user-avatar.service';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.get('/', async (request, resposne) => {
    const usersReposiutory = getCustomRepository(UsersRepository);
    return resposne.json(await usersReposiutory.find());
});

usersRouter.post('/', async (request, resposne) => {
    try {
        const { name, email, password } = request.body;
        const crateUserService = new CreateUserService();
        const user = await crateUserService.execute({ name, email, password });
        return resposne.json(user);
    } catch (err) {
        return resposne.status(400).json({ error: err.message })
    }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvartarService();
    const user = await updateUserAvatarService.execute({ userId: request.user.id, avatarFilename: request.file.filename });
    delete user.password;
    return response.json(user);
});

export default usersRouter;