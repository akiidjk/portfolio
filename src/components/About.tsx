import { SectionHeader } from './SectionHeader'

const FOCUS_AREAS = [
  { area: 'Systems Programming', tools: 'Zig · C · Rust' },
  { area: 'Binary Exploitation', tools: 'pwn · pwndbg · GEF' },
  { area: 'Reverse Engineering', tools: 'Ghidra · radare2' },
  { area: 'Network Security', tools: 'Wireshark · scapy' },
  { area: 'Web Security', tools: 'Burp Suite · SQLmap' },
  { area: 'RF / Hardware', tools: 'RTL-SDR · GNU Radio' },
]

export function About() {
  return (
    <section id="about" style={{ padding: '80px 40px', borderBottom: '1px solid #1a1a1a' }}>
      <SectionHeader index="04" title="ABOUT" />

      <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
        <div>
          <p
            style={{
              fontFamily: 'Inter',
              fontWeight: 300,
              fontSize: 21,
              color: '#E8E8E3',
              lineHeight: 1.5,
              letterSpacing: '-0.025em',
              margin: '0 0 28px',
            }}
          >
            Software engineer obsessed with the layers below the abstraction. I write systems software, dig into binary formats, and treat security research as a form of understanding.
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#666', lineHeight: 1.75, margin: '0 0 16px' }}>
            I started breaking things before I could properly build them. A buffer overflow on a CTF machine at 17 sent me down a path I haven't left. Now I split my time between writing low-level code in Zig and C, doing security research, and studying how protocols and systems actually work — not how the documentation says they work.
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: 14, color: '#666', lineHeight: 1.75, margin: 0 }}>
            When I'm not at a keyboard I'm usually reading about compilers, cryptography, or something that hasn't shipped yet.
          </p>
        </div>

        <div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: '#292929', letterSpacing: '0.18em', marginBottom: 24 }}>
            ── TECHNICAL FOCUS ──────────────
          </div>
          {FOCUS_AREAS.map((item) => (
            <div
              key={item.area}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 14,
                marginBottom: 14,
                borderBottom: '1px solid #111',
              }}
            >
              <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#E8E8E3', fontWeight: 500 }}>{item.area}</span>
              <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#3D3D3D' }}>{item.tools}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
