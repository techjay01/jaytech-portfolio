<script lang="ts">
	import { onMount } from 'svelte';
	
	interface Props {
		showCommandPalette?: boolean;
	}
	
	let { showCommandPalette = $bindable(false) }: Props = $props();
	
	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	const navItems = [
		{ label: 'Home', href: '#home' },
		{ label: 'About', href: '#about' },
		{ label: 'Skills', href: '#skills' },
		{ label: 'Projects', href: '#projects' },
		{ label: 'Contact', href: '#contact' }
	];

	onMount(() => {
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
			<div class="hidden md:flex items-center gap-8">
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
					onclick={() => showCommandPalette = !showCommandPalette}
					class="flex items-center gap-2 px-4 py-2 glass rounded-lg border border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 group">
					<span class="text-xs font-mono text-gray-400 group-hover:text-neon-blue">CMD+K</span>
				</button>
			</div>

			<!-- Mobile Menu Button -->
			<button
				onclick={() => mobileMenuOpen = !mobileMenuOpen}
				class="md:hidden p-2 rounded-lg glass border border-cyan-500/30">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if mobileMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden py-4 glass mt-2 rounded-lg border border-cyan-500/30 animate-slide-in">
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
