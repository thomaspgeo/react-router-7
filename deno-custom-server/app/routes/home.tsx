import type { LoaderFunctionArgs, MetaArgs } from "react-router";
import { useLoaderData } from "react-router";

import { Welcome } from "../welcome/welcome.tsx";

export function meta({}: MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: LoaderFunctionArgs) {
  return { message: context.VALUE_FROM_DENO };
}

export default function Home() {
  const loaderData = useLoaderData<typeof loader>();

  return <Welcome message={loaderData.message} />;
}
