import expresss from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { createOrder, getAllOrders } from '../controllers/order_controller';
const orderRouter=expresss.Router();

orderRouter.post("/create-order",isAuthenticated,createOrder);

orderRouter.get("/get-all-orders",isAuthenticated,authorizeRoles("admin"),getAllOrders);



export default orderRouter;
