import expresss from 'express';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { createOrder, getAllOrders, newPayment, sendStripePublishableKey } from '../controllers/order_controller';
import { updateAccessToken } from '../controllers/user_controller';
const orderRouter=expresss.Router();

orderRouter.post("/create-order",updateAccessToken,isAuthenticated,createOrder);

orderRouter.get("/get-all-orders",updateAccessToken,isAuthenticated,authorizeRoles("admin"),getAllOrders);

//payment routes
orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post("/payment", isAuthenticated, newPayment);

export default orderRouter;
