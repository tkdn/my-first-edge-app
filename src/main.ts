import "./style.css";
import { counterApp } from "./lib/counter";
import { bbsApp, messageApp } from "./lib/bbs";

(async () => {
  await Promise.allSettled([counterApp(), bbsApp(), messageApp()])
})();
