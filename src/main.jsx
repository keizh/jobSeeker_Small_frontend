import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JobPostings from "./components/JobPostings.jsx";
import PostAJob from "./components/PostAJob.jsx";
import store from "./App/store.js";
import { Provider } from "react-redux";
import { fetchJob } from "./features/JobSlice.js";
import Details from "./components/Details.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <JobPostings />,
        loader: () => {
          console.log(`fetching jobs`);
          store.dispatch(fetchJob());
          return null;
        },
      },
      {
        path: "/postAJob",
        element: <PostAJob />,
      },
      {
        path: "/details",
        element: <Details />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
