import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routesArr from "./utils/routeConfig";

const Routes = () => {
  const router = createBrowserRouter(routesArr);

  return <RouterProvider router={router} />;
};

export default Routes;
