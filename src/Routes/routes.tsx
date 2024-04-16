import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/Home";
import DetailsPage from "../pages/details";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children:[
            {path: "", element: <HomePage/>},
            {path: "details/:id", element: <DetailsPage/>}

        ]
    }
])
