import { Link } from "react-router-dom";
import SectionFooter from "../components/SectionFooter";
import SectionHero from "../components/SectionHero";

export default function Home() {
  return (
    <main>
      <nav className="border-b border-b-base-content/20 flex items-center p-5 justify-between">
        <h1 className="text-3xl font-bold">HabitsZoo</h1>
        <Link to="/signin" className="btn">
          Sign in
        </Link>
      </nav>

      <SectionHero />
      <SectionFooter />
    </main>
  );
}
