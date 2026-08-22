import { ARCHIVE_ENTRIES } from '../data/archive-entries'

const STATS = [
  { label: 'CTF PARTICIPATIONS', value: '100+' },
  { label: 'PROJECT SHIPPED', value: '10+' },
  { label: 'YEARS ACTIVE', value: '04' },
  { label: 'COFFEE', value: 'A lot' },
]

export function Experience() {
  return (
    <section id="experience">
      <div className="px-5 pt-10 pb-14 sm:px-10 sm:pt-14 sm:pb-20">
        <div className="mb-6 font-mono text-fs-10 tracking-[0.15em] text-dim-label sm:mb-8">[ CHRONOLOGICAL ]</div>
        <div className="grid gap-10 sm:grid-cols-[1fr_260px] sm:gap-15">
          {/* Timeline */}
          <div className="group/timeline border-l border-hairline pl-6 sm:pl-9">
            {ARCHIVE_ENTRIES.map((entry, i) => (
              <div
                key={i}
                className={`relative flex gap-5 opacity-100 transition-opacity duration-200 group-hover/timeline:not-hover:opacity-40 sm:gap-9 ${i < ARCHIVE_ENTRIES.length - 1 ? 'pb-9' : 'pb-0'}`}
              >
                <div className="absolute top-[5px] left-[-29px] h-[7px] w-[7px] border border-active-gray bg-void-black sm:left-[-41px]" />
                <div className="min-w-10 pt-px font-mono text-fs-13 text-dim-label">{entry.year}</div>
                <div>
                  <div className="text-fs-15 font-medium tracking-[-0.01em] text-phosphor-white">{entry.event}</div>
                  <div className="mt-[5px] flex items-center gap-3">
                    <span className="font-mono text-fs-10 text-dim-label">{entry.org}</span>
                    <span className="border border-hairline px-1.5 py-px font-mono text-fs-8 tracking-[0.1em] text-dim-label">
                      {entry.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-10">
            {STATS.map((s) => (
              <div key={s.label} className="border-b border-hairline pb-7">
                <div className="mb-2.5 font-mono text-fs-9 tracking-[0.18em] text-dim-label">{s.label}</div>
                <div className="text-fs-56 leading-none font-bold tracking-[-0.05em] text-phosphor-white">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
