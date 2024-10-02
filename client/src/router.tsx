import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Repos from "./pages/Repos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Repos />,
        loader: () => fetch('http://localhost:3000/api/repos')
      },
      {
        path: "languages",
        element: <h1>Hi from languages</h1>,
      },
    ],
  },
]);

export default router;
