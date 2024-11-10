import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Root";
import Error from "./Error";
import Contact from "./Contact";
import { getContactLoader, getContactsLoader } from "./loaders/contactsLoader";
import {
  createContactAction,
  deleteContactAction,
  editContactAction,
  updateFavoriteAction,
} from "./actions/contactsAction";
import EditContact from "./EditContact";
import Index from "./Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: getContactsLoader,
    action: createContactAction,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: "/contacts/:contactId",
            element: <Contact />,
            loader: getContactLoader,
            action: updateFavoriteAction,
          },
          {
            path: "/contacts/:contactId/edit",
            element: <EditContact />,
            loader: getContactLoader,
            action: editContactAction,
          },
          {
            path: "/contacts/:contactId/destroy",
            action: deleteContactAction,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
