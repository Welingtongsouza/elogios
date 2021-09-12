import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ComplimentsController } from "./controllers/ComplimentsController";

const router = Router();

const controllerUser = new CreateUserController();
const controllerTag = new CreateTagController();
const controllerLogin = new AuthenticateUserController();
const controllerCompliments = new ComplimentsController();

// ele ja consegue identificar que precisa passar o request e response nesse meio de declaração
// dá pra add middle na tag daquela maneira ou pra um grupo de pessoas. Tudo que tiver abaixo do router.use, vai ser aplicado a regra. Se for especifico, adicionar diretamente na rota.

router.post("/users", controllerUser.handle)
router.post("/tags", ensureAuthenticated, ensureAdmin, controllerTag.handle)
router.post("/login", controllerLogin.handle)
router.post("/compliments", ensureAuthenticated, controllerCompliments.handle)

export { router }