export default function VideoHero() {
  return (
    <div className="bg-red-500 relative">
      <img
        className="w-full md:border-4 border-2 rounded-md"
        src="/hero-banner.png"
        alt="The hero section banner image of habitszoo"
      />

      {/* PLAY ICON */}
      <PlayIcon
        onClick={() => document.getElementById("yt_video_dialog").showModal()}
      />
      <dialog
        id="yt_video_dialog"
        className="modal flex justify-center items-center"
      >
        <VideoIframe />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export function PlayIcon({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-white flex justify-center items-center group rounded-full md:size-40 size-10 cursor-pointer hover:bg-black active:scale-95 transition-all duration-250"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50%"
        height="50%"
        viewBox="0 0 24 24"
        fill="white"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="group-hover:scale-105 transition-all duration-250"
      >
        <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
      </svg>
    </div>
  );
}

export function VideoIframe() {
  return (
    <iframe
      width="1120"
      height="630"
      src="https://www.youtube.com/embed/H3xmrc7EQPU?si=RFk5RI15mHeu0a1H"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>
  );
}
