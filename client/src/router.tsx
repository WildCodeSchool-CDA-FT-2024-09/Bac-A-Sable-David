import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Repos from "./pages/Repos";
import RepoPage from "./pages/RepoPage";
import api from "./services/apiConnexion";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Repos />,
        loader: async () => {
          const response = await api.get(`/repos`);
          return response.data;
        },
      },
      {
        path: "/repo/:id",
        element: <RepoPage />,
        loader: async ({ params }) => {
          const response = await api.get(`/repos/${params.id}`);
          return response.data;
        },
      },
      {
        path: "languages",
        element: <h1>Hi from languages</h1>,
      },
    ],
  },
]);

export default router;
