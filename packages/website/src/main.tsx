import { App } from "@/App";
import { history } from "@/shared/routing";
import ReactDOM from "react-dom/client";
import { router } from "./app/routing";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

router.setHistory(history);
