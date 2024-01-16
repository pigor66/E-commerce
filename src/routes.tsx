import { createBrowserRouter } from "react-router-dom";
import Products from "./pages/Products/Products";
import AppLayout from "./App";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductsDetails from "./pages/Products/ProductsDetails";
import ProductForm from "./pages/Dashboard/ProductForm";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: '/admin', element: <Dashboard /> },
            { path: '/', element: <Products /> },
            { path: '/produto/novo', element: <ProductForm /> },
            { path: '/produto/:id', element: <ProductForm /> },
            { path: '/produto/detalhes/:id', element: <ProductsDetails /> },
        ],
    },
]);
