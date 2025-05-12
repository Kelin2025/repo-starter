import { createRoute } from "atomic-router";
import { createBrowserHistory } from "history";

export const routesMap = {
  home: createRoute(),
};

export const history = createBrowserHistory();
