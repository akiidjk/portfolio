import tailwind from 'bun-plugin-tailwind'

// The CLI `bun build` doesn't read [serve.static].plugins (that section is
// Bun.serve()-only), so it silently skips Tailwind's class-scanning step and
// ships only the raw @theme reset. Bun.build()'s JS API lets us pass the
// plugin explicitly instead.
const result = await Bun.build({
  entrypoints: ['./src/index.tsx'],
  outdir: './dist',
  target: 'bun',
  splitting: true,
  minify: true,
  plugins: [tailwind],
})

if (!result.success) {
  for (const log of result.logs) console.error(log)
  process.exit(1)
}

console.log(`Built ${result.outputs.length} file${result.outputs.length === 1 ? '' : 's'}`)
