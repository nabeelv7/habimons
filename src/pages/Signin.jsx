import ButtonGoogle from "../components/signin/ButtonGoogle";
import ButtonGithub from "../components/signin/ButtonGithub";

export default function Signin() {
  return (
    <main className="flex">
      {/* SECTION LEFT */}
      <section
        id="left"
        className="md:w-1/2 md:flex hidden bg-teal-600 min-h-screen"
      ></section>

      {/* SECTION RIGHT */}
      <section
        id="right"
        className="md:w-1/2 w-full bg-base-100 flex justify-center items-center px-5 min-h-screen"
      >
        {/* sign in box */}
        <div className="rounded-2xl border border-base-content/20 p-5 bg-base-200 md:max-w-md w-full flex flex-col">
          <h1 className="text-3xl font-bold">🐫 HabitsZoo</h1>
          <h2 className="opacity-85 mt-1">
            Sign in to HabitsZoo to start building habits!
          </h2>
          <div className="space-y-2 mt-5 flex flex-col justify-center items-center">
            <ButtonGoogle />
            <ButtonGithub />
          </div>
        </div>
      </section>
    </main>
  );
}
