import { createBrowserRouter } from "react-router-dom";
import Products from "./pages/Products/Products";
import AppLayout from "./App";
import Dashboard from "./pages/Home/Dashboard";
import ProductsDetails from "./pages/Products/ProductsDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: '/admin', element: <Dashboard /> },
            { path: '/', element: <Products /> },
            { path: '/produto/:id', element: <ProductsDetails /> },
        ],
    },
]);
