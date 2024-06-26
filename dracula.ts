import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const dracula: CustomThemeConfig = {
	name: 'dracula',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `Jetbrains_Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		'--theme-font-family-heading': `Montserrat, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '12px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '2px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '255 255 255',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #bd93f9
		'--color-primary-50': '245 239 254', // #f5effe
		'--color-primary-100': '242 233 254', // #f2e9fe
		'--color-primary-200': '239 228 254', // #efe4fe
		'--color-primary-300': '229 212 253', // #e5d4fd
		'--color-primary-400': '209 179 251', // #d1b3fb
		'--color-primary-500': '189 147 249', // #bd93f9
		'--color-primary-600': '170 132 224', // #aa84e0
		'--color-primary-700': '142 110 187', // #8e6ebb
		'--color-primary-800': '113 88 149', // #715895
		'--color-primary-900': '93 72 122', // #5d487a
		// secondary | #ff79c6
		'--color-secondary-50': '255 235 246', // #ffebf6
		'--color-secondary-100': '255 228 244', // #ffe4f4
		'--color-secondary-200': '255 222 241', // #ffdef1
		'--color-secondary-300': '255 201 232', // #ffc9e8
		'--color-secondary-400': '255 161 215', // #ffa1d7
		'--color-secondary-500': '255 121 198', // #ff79c6
		'--color-secondary-600': '230 109 178', // #e66db2
		'--color-secondary-700': '191 91 149', // #bf5b95
		'--color-secondary-800': '153 73 119', // #994977
		'--color-secondary-900': '125 59 97', // #7d3b61
		// tertiary | #6272a4
		'--color-tertiary-50': '231 234 241', // #e7eaf1
		'--color-tertiary-100': '224 227 237', // #e0e3ed
		'--color-tertiary-200': '216 220 232', // #d8dce8
		'--color-tertiary-300': '192 199 219', // #c0c7db
		'--color-tertiary-400': '145 156 191', // #919cbf
		'--color-tertiary-500': '98 114 164', // #6272a4
		'--color-tertiary-600': '88 103 148', // #586794
		'--color-tertiary-700': '74 86 123', // #4a567b
		'--color-tertiary-800': '59 68 98', // #3b4462
		'--color-tertiary-900': '48 56 80', // #303850
		// success | #50fa7b
		'--color-success-50': '229 254 235', // #e5feeb
		'--color-success-100': '220 254 229', // #dcfee5
		'--color-success-200': '211 254 222', // #d3fede
		'--color-success-300': '185 253 202', // #b9fdca
		'--color-success-400': '133 252 163', // #85fca3
		'--color-success-500': '80 250 123', // #50fa7b
		'--color-success-600': '72 225 111', // #48e16f
		'--color-success-700': '60 188 92', // #3cbc5c
		'--color-success-800': '48 150 74', // #30964a
		'--color-success-900': '39 123 60', // #277b3c
		// warning | #f1fa8c
		'--color-warning-50': '253 254 238', // #fdfeee
		'--color-warning-100': '252 254 232', // #fcfee8
		'--color-warning-200': '252 254 226', // #fcfee2
		'--color-warning-300': '249 253 209', // #f9fdd1
		'--color-warning-400': '245 252 175', // #f5fcaf
		'--color-warning-500': '241 250 140', // #f1fa8c
		'--color-warning-600': '217 225 126', // #d9e17e
		'--color-warning-700': '181 188 105', // #b5bc69
		'--color-warning-800': '145 150 84', // #919654
		'--color-warning-900': '118 123 69', // #767b45
		// error | #ff5555
		'--color-error-50': '255 230 230', // #ffe6e6
		'--color-error-100': '255 221 221', // #ffdddd
		'--color-error-200': '255 213 213', // #ffd5d5
		'--color-error-300': '255 187 187', // #ffbbbb
		'--color-error-400': '255 136 136', // #ff8888
		'--color-error-500': '255 85 85', // #ff5555
		'--color-error-600': '230 77 77', // #e64d4d
		'--color-error-700': '191 64 64', // #bf4040
		'--color-error-800': '153 51 51', // #993333
		'--color-error-900': '125 42 42', // #7d2a2a
		// surface | #282a36
		'--color-surface-50': '223 223 225', // #dfdfe1
		'--color-surface-100': '212 212 215', // #d4d4d7
		'--color-surface-200': '201 202 205', // #c9cacd
		'--color-surface-300': '169 170 175', // #a9aaaf
		'--color-surface-400': '105 106 114', // #696a72
		'--color-surface-500': '40 42 54', // #282a36
		'--color-surface-600': '36 38 49', // #242631
		'--color-surface-700': '30 32 41', // #1e2029
		'--color-surface-800': '24 25 32', // #181920
		'--color-surface-900': '20 21 26' // #14151a

	}
};