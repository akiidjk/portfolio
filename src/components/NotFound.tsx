export function NotFound({ path, onNavigateHome }: { path: string; onNavigateHome: () => void }) {
  return (
    <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 text-center sm:px-10">
      {/* Background image, filtered + textured to match the rest of the site */}
      <img
        src="/assets/404_bg.jpg"
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-50 grayscale contrast-[1.3] brightness-[0.55]"
      />
      <div className="absolute inset-0 z-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,var(--scanline-strong)_2px,var(--scanline-strong)_4px)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(8,8,8,0.92)_100%)]" />

      <div className="relative z-[1]">
        <div className="mb-4 font-mono text-fs-9 tracking-[0.2em] text-dim-label uppercase sm:mb-6 sm:text-fs-10">
          [ ERR_ROUTE_NOT_FOUND ]
        </div>

        <h1 className="text-[clamp(2.375rem,9vw,6.5rem)] leading-[0.92] font-bold tracking-[-0.045em] text-phosphor-white">
          404<span className="text-signal-green">_</span>
        </h1>

        <p className="mt-4 mb-7 max-w-[420px] font-mono text-fs-12 tracking-[0.02em] text-muted-steel sm:mt-5 sm:mb-9 sm:text-fs-13">
          Whatever you were chasing already walked off-frame.
        </p>

        <div className="mb-7 inline-block max-w-[90vw] border border-hairline bg-panel-black px-[18px] py-4 text-left font-mono text-fs-10 leading-[2] break-words text-muted-steel sm:mb-9 sm:px-6 sm:py-[18px] sm:text-fs-11">
          <div>→ REQUESTED · {path}</div>
          <div>→ STATUS · 404 NOT FOUND</div>
        </div>

        <div>
          <button
            onClick={onNavigateHome}
            className="cursor-none border border-hairline bg-transparent px-[18px] py-3.5 font-mono text-fs-10 tracking-[0.1em] text-muted-steel transition-colors duration-200 hover:border-active-gray hover:text-phosphor-white sm:py-2.5"
          >
            ← BACK TO INDEX
          </button>
        </div>
      </div>
    </section>
  )
}
