import { Router } from "express";
import ForgotPasswordController from "../controllers/forgot-password.controller";
import ResetPasswordController from "../controllers/reset-passowrd.controller";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
passwordRouter.post('/forgot', forgotPasswordController.create);
const resetPasswordController = new ResetPasswordController();
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;