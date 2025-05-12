import { HomePage } from "@/pages/home";
import { routesMap } from "@/shared/routing";
import { createHistoryRouter } from "atomic-router";
import { createRoutesView } from "atomic-router-react";

export const routes = [{ path: "/", route: routesMap.home, view: HomePage }];

export const router = createHistoryRouter({
  routes,
});

export const RoutesView = createRoutesView({
  routes,
});
