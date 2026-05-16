<script lang="ts">
	import { onMount } from 'svelte';
	
	interface Props {
		showCommandPalette?: boolean;
	}
	
	let { showCommandPalette = $bindable(false) }: Props = $props();
	
	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);
	let isLight = $state(false);

	function toggleTheme() {
		isLight = !isLight;
		document.documentElement.classList.toggle('light', isLight);
		localStorage.setItem('theme', isLight ? 'light' : 'dark');
	}

	const navItems = [
		{ label: 'Home', href: '#home' },
		{ label: 'About', href: '#about' },
		{ label: 'Skills', href: '#skills' },
		{ label: 'Projects', href: '#projects' },
		{ label: 'Contact', href: '#contact' }
	];

	onMount(() => {
		const saved = localStorage.getItem('theme');
		if (saved === 'light') {
			isLight = true;
			document.documentElement.classList.add('light');
		}
		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function smoothScroll(e: MouseEvent, href: string) {
		e.preventDefault();
		const target = document.querySelector(href);
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
			mobileMenuOpen = false;
		}
	}
</script>

<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {scrolled ? 'glass neon-border' : ''}">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="#home" onclick={(e) => smoothScroll(e, '#home')} class="flex items-center gap-2 group">
				<span class="text-neon-blue font-mono text-xl group-hover:animate-pulse">&lt;</span>
				<span class="font-display text-xl font-bold group-hover:text-neon-green transition-colors">Jay~Tech</span>
				<span class="text-neon-blue font-mono text-xl group-hover:animate-pulse">/&gt;</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden nav:flex items-center gap-8">
				{#each navItems as item}
					<a 
						href={item.href}
						onclick={(e) => smoothScroll(e, item.href)}
						class="text-sm font-mono hover:text-neon-blue transition-colors duration-300 relative group">
						<span class="text-neon-green opacity-0 group-hover:opacity-100 transition-opacity">// </span>
						{item.label}
						<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></span>
					</a>
				{/each}
				
				<button
					onclick={toggleTheme}
					aria-label="Toggle theme"
					class="flex items-center justify-center w-9 h-9 glass rounded-lg border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300">
					{#if isLight}
						<svg class="w-5 h-5" fill="black" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>
					{:else}
						<svg class="w-5 h-5" fill="white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path stroke="white" stroke-width="2" stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
					{/if}
				</button>

				<button
					onclick={() => showCommandPalette = !showCommandPalette}
					class="flex items-center gap-2 px-4 py-2 glass rounded-lg border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 group">
					<span class="text-xs font-mono text-gray-400 group-hover:text-neon-blue">CMD+K</span>
				</button>
			</div>

			<!-- Mobile: Theme toggle + Hamburger -->
			<div class="nav:hidden flex items-center gap-2">
				<button
					onclick={toggleTheme}
					aria-label="Toggle theme"
					class="flex items-center justify-center w-9 h-9 glass rounded-lg border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300">
					{#if isLight}
						<svg class="w-5 h-5" fill="black" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/></svg>
					{:else}
						<svg class="w-5 h-5" fill="white" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path stroke="white" stroke-width="2" stroke-linecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
					{/if}
				</button>
				<button
					onclick={() => mobileMenuOpen = !mobileMenuOpen}
					aria-label="Toggle menu"
					class="p-2 rounded-lg glass border border-cyan-500/30">
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if mobileMenuOpen}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						{:else}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
						{/if}
					</svg>
				</button>
			</div>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="nav:hidden py-4 glass mt-4 rounded-lg border border-cyan-500/30 animate-slide-in mb-4">
				{#each navItems as item}
					<a 
						href={item.href}
						onclick={(e) => smoothScroll(e, item.href)}
						class="block px-4 py-2 font-mono text-sm hover:bg-cyan-500/10 hover:text-neon-blue transition-colors">
						{item.label}
					</a>
				{/each}
				<button
					onclick={() => { showCommandPalette = !showCommandPalette; mobileMenuOpen = false; }}
					class="w-full text-left px-4 py-2 font-mono text-sm hover:bg-cyan-500/10 hover:text-neon-blue transition-colors">
					Command Palette (CMD+K)
				</button>
			</div>
		{/if}
	</div>
</nav>