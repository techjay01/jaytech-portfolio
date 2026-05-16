/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				'nav': '900px'
			},
			colors: {
				cyber: {
					50: '#e0f7ff',
					100: '#b0e9ff',
					200: '#7dd9ff',
					300: '#4ac9ff',
					400: '#17baff',
					500: '#00a8ff',
					600: '#0091e6',
					700: '#0077cc',
					800: '#005db3',
					900: '#004a99'
				},
				neon: {
					green: '#00ff9f',
					blue: '#00d9ff',
					purple: '#b400ff',
					pink: '#ff00ff',
					yellow: '#ffff00'
				},
				dark: {
					900: '#0a0a0f',
					800: '#12121a',
					700: '#1a1a26',
					600: '#222233',
					500: '#2a2a40'
				}
			},
			fontFamily: {
				mono: ['JetBrains Mono', 'Courier New', 'monospace'],
				display: ['Orbitron', 'sans-serif'],
				sans: ['Inter Variable', 'system-ui', 'sans-serif']
			},
			animation: {
				'float': 'float 6s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'slide-in': 'slideIn 0.5s ease-out',
				'fade-in': 'fadeIn 0.5s ease-out',
				'terminal': 'terminal 1s steps(20) infinite'
			},
			keyframes: {
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				glow: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				slideIn: {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				terminal: {
					'0%': { opacity: '0' },
					'50%': { opacity: '1' },
					'100%': { opacity: '0' }
				}
			}
		}
	},
	plugins: []
}