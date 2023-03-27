import { Router } from "express";
import ForgotPasswordController from "../controllers/ForgotPassword.controller";
import ResetPasswordController from "../controllers/ResetPassword.controller";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.forgot);
passwordRouter.post('/reset', resetPasswordController.reset);

export default passwordRouter;
