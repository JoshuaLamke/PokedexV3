import {
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import PokemonInfo from "./pages/PokemonInfo";
import MoveInfo from "./pages/MoveInfo";
import TypesInfo from "./pages/TypesInfo";

export const routesArr: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "pokemon/:name",
        element: <PokemonInfo />,
      },
      {
        path: "moves/:name",
        element: <MoveInfo />,
      },
      {
        path: "types/:name",
        element: <TypesInfo />,
      },
    ],
  },
];

const Routes = () => {
  const router = createBrowserRouter(routesArr);

  return <RouterProvider router={router} />;
};

export default Routes;
