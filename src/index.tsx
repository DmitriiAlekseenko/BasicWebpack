import { createRoot } from "react-dom/client";
import { App } from "@/components/App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { LazyAbout } from "@/pages/about/About.lazy";
import { LazyShop } from "@/pages/shop/Shop.lazy";
import { Suspense } from "react";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Element with id=root not found");
}

const container = createRoot(root);

const fallback = <h3>Loading ...</h3>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={fallback}>
            <LazyAbout />
          </Suspense>
        ),
      },
      {
        path: "/shop",
        element: (
          <Suspense fallback={fallback}>
            <LazyShop />
          </Suspense>
        ),
      },
    ],
  },
]);

container.render(<RouterProvider router={router} />);
