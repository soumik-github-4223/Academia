import expresss from 'express';
import { isAuthenticated } from '../middleware/auth';
import { createOrder } from '../controllers/order_controller';
const orderRouter=expresss.Router();

orderRouter.post("/create-order",isAuthenticated,createOrder);





export default orderRouter;
