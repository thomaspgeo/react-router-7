import {
  type RouteConfig,
  layout,
  route,
  index,
} from "@react-router/dev/routes";

export default [
  layout("components/Layout.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
  ]),
] satisfies RouteConfig;
