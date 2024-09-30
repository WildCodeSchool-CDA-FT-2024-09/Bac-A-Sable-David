import App from "./App";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "repo",
          element: <h1>Hi from repos</h1>,
        },
        {
          path: "languages",
          element: <h1>Hi from languages</h1>,
        }]}])

export default router