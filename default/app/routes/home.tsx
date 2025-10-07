import type { Route } from "./+types/home";
import Card from "../components/Card";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const items = [
  { title: "Card One", description: "This is the first card." },
  { title: "Card Two", description: "This is the second card." },
  { title: "Card Three", description: "This is the third card." },
  { title: "Card Four", description: "This is the fourth card." },
];

export default function Home() {
  return (
    <section className="pt-20">
      <h1 className="text-2xl font-bold mb-6">Welcome</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Card
            key={it.title}
            title={it.title}
            description={it.description}
            onClick={() => alert(`${it.title} clicked`)}
          />
        ))}
      </div>
    </section>
  );
}
