export default function Button({children}) {
  return (
    <button className="bg-emerald-400 hover:bg-emerald-500 px-4 py-2 rounded-xs shadow-[4px_4px_0_#000] relative active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all duration-250">{children}</button>
  )
}