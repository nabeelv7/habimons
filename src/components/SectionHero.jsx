import { Link } from "react-router-dom";

export default function SectionHero() {
  return (
    <section id="hero" className="text-center py-20 space-y-13">
      {/* headings and CTA */}
      <div className="max-w-screen-md mx-auto px-5">
        {/* headline */}
        <h1 className="md:text-5xl text-4xl font-bold">
          Beat Procrastination with a{" "}
          <span className="text-primary">Gamified</span> Habit Tracker
        </h1>

        {/* subheadline */}
        <p className="md:text-xl opacity-85 mt-3">
          Complete habits, Earn gems, Buy habimons and{" "}
          <br className="max-md:hidden" /> stay motivated on your journey!
        </p>
        <Link to="/signin" className="btn btn-primary mt-5 shadow-inner">
          GET STARTED &rarr;
        </Link>
      </div>

      {/* image */}
      <div className="relative max-w-screen-xl mx-auto max-lg:px-2">
        <img
          className="w-full md:border-4 border-2 rounded-md"
          src="/hero-banner.png"
          alt="The hero section banner image of habitszoo"
        />
      </div>
    </section>
  );
}
