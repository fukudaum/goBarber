import { Request, Response, Router } from "express";
import ensureAuthenticated from "shared/infra/http/middleware/ensureAuthenticated";
import ProfileController from "../controllers/Profile.controller";

export interface CreatedUser {
    id: string | undefined
    name: string
    email: string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
}

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
