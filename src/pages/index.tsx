import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import ChekoutFinal from "./ChekoutFinal";
import MIcarrito from "./MIcarrito";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/checkout", element: <ChekoutFinal /> },
  { path: "/mi-carrito", element: <MIcarrito /> },
]);

export default router;
