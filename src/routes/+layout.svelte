<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import ParticleBackground from '$lib/components/ParticleBackground.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
	let showCommandPalette = $state(false);

	onMount(() => {
		// Keyboard shortcut for command palette
		const handleKeydown = (e: KeyboardEvent) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				showCommandPalette = !showCommandPalette;
			}
		};

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});
</script>

<div class="min-h-screen bg-dark-900 text-gray-100 relative overflow-hidden">
	<!-- Particle Background -->
	<ParticleBackground />

	<!-- Cyber Grid Overlay -->
	<div class="fixed inset-0 cyber-grid pointer-events-none opacity-30"></div>

	<!-- Scan Line Effect -->
	<div class="fixed inset-0 pointer-events-none">
		<div class="scan-line absolute w-full h-1 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
	</div>

	<!-- Navigation -->
	<Navigation bind:showCommandPalette />

	<!-- Main Content -->
	<main class="relative z-10">
		{@render children()}
	</main>

	<!-- Command Palette -->
	{#if showCommandPalette}
		<CommandPalette bind:show={showCommandPalette} />
	{/if}

	<!-- Footer -->
	<footer class="relative z-10 border-t border-cyan-500/20 mt-20">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div class="flex flex-col md:flex-row justify-between items-center gap-6">
				<div class="flex items-center gap-2">
					<span class="text-neon-blue font-mono">&lt;</span>
					<span class="font-display text-xl">Jay~Tech</span>
					<span class="text-neon-blue font-mono">/&gt;</span>
				</div>
				
				<div class="flex gap-6">
					<a href="https://github.com/techjay01" target="_blank" rel="noopener" 
					   class="hover:text-neon-blue transition-colors duration-300">
						GitHub
					</a>
					<a href="https://www.linkedin.com/in/jaytech01" target="_blank" rel="noopener"
					   class="hover:text-neon-blue transition-colors duration-300">
						LinkedIn
					</a>
					<a href="https://x.com/techjay01" target="_blank" rel="noopener"
					   class="hover:text-neon-blue transition-colors duration-300">
						Twitter
					</a>
				</div>
				
				<div class="text-sm text-gray-400 font-mono">
					© 2026 <span class="text-neon-green">Joshua Mbamara</span>
				</div>
			</div>
		</div>
	</footer>
</div>