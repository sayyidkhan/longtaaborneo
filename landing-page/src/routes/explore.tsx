import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/explore")({
  component: ExplorePage,
});

function ExplorePage() {
  return (
    <main className="interior-page dark-page">
      <p className="eyebrow">Explore Long Taa</p>
      <h1>Follow the Dapui River inland.</h1>
      <p className="lead">
        River journeys, rainforest, the Tagang conservation area, Acin Salt
        Spring, and natural rock formations beyond the usual tourist trail.
      </p>
      <div className="chapter-list">
        <span>Dapui River</span>
        <span>Rainforest & wildlife</span>
        <span>Acin Salt Spring</span>
        <span>Batu Ukat · Batu Nginan · Batu Tatip · Batu Belacek</span>
      </div>
      <Link className="text-link light" to="/heritage">
        Meet the living heritage →
      </Link>
    </main>
  );
}
