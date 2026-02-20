import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import Store from "./redux/store.js";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={Store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);