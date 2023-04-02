import { Request, Response, Router } from "express";
import ensureAuthenticated from "shared/infra/http/middleware/ensureAuthenticated";
import ProvidersController from "../controllers/Providers.controller";

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
