<script lang="ts">
	import { onMount } from 'svelte';

	let isVisible = $state(false);
	let sectionElement: HTMLElement;
	let selectedFilter = $state('all');
	let selectedProject = $state<Project | null>(null);

	interface Project {
		title: string;
		description: string;
		tech: string[];
		github: string;
		demo?: string;
		category: string;
		icon: string;
		accent: string;
		image?: string;
	}

	const projects: Project[] = [
		{
			title: 'WhisperBox',
			description: 'A secure real-time messaging app with true end-to-end encryption. RSA-OAEP + AES-GCM hybrid encryption via the Web Crypto API — the server never sees plaintext. Ever.',
			tech: ['JavaScript', 'Web Crypto API', 'WebSockets', 'IndexedDB'],
			github: 'https://github.com/techjay01/whisperbox',
			demo: 'https://whisperbox-omega.vercel.app',
			category: 'web',
			icon: '🔐',
			accent: '#7c6af7',
			image: '/whisperbox.png'
		},
		{
			title: 'Nexus Terminal',
			description: 'A real-time market analytics dashboard simulating live financial data streams with interactive charts, connection monitoring, event tracking, and terminal-style visualizations.',
			tech: ['Vue', 'TypeScript', 'Pinia', 'Recharts'],
			github: 'https://github.com/techjay01/nexus-terminal',
			demo: 'https://nexus-terminal-pi.vercel.app/',
			category: 'web',
			icon: '📡',
			accent: '#38bdf8',
			image: '/nexus-terminal.png'
		},
		{
			title: 'Invoice Management App',
			description: 'A fully responsive invoice management app with complete CRUD functionality, draft and payment flow, multi-status filtering, dark/light mode and data persistence via LocalStorage.',
			tech: ['React', 'Vite', 'JavaScript', 'CSS Variables'],
			github: 'https://github.com/techjay01/invoice-management-app',
			demo: 'https://invoice-mgt.netlify.app',
			category: 'web',
			icon: '🧾',
			accent: '#7C5DFA',
			image: '/invoice-mgt-app.jpg'
		},
		{
			title: 'Habit Tracker PWA',
			description: 'A mobile-first Progressive Web App for building daily habits. Features local auth, streak tracking, offline support via service worker, and a full automated test suite with 100% line coverage.',
			tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vitest', 'Playwright'],
			github: 'https://github.com/techjay01/Habit-Tracker-PWA',
			demo: 'https://jay-habit-tracker.vercel.app',
			category: 'web',
			icon: '✅',
			accent: '#f09118',
			image: '/habit-tracker-pwa.png'
		},
		{
			title: 'Summari — AI Page Summarizer',
			description: 'A Chrome Extension (Manifest V3) that extracts and summarizes any webpage using Groq\'s Llama 3.3 70B. Delivers bullet points, key insights, reading time, word count, and in-page highlights instantly.',
			tech: ['JavaScript', 'Chrome Extension', 'Manifest V3', 'Groq API', 'HTML', 'CSS'],
			github: 'https://github.com/techjay01/ai-page-summarizer',
			demo: 'https://www.loom.com/share/238f15c22b254a2290fcc4c3c4a51b8b',
			category: 'extension',
			icon: '🧠',
			accent: '#F59E0B',
			image: '/summari-extension.png'
		},
		{
			title: 'Boogies Seafood',
			description: 'A modern seafood restaurant website featuring an elegant UI, responsive layouts, smooth navigation, and visually rich sections designed to showcase meals, services, and brand identity.',
			tech: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
			github: 'https://github.com/techjay01/boogies-seafood',
			demo: 'https://boogies-seafood-gules.vercel.app/',
			category: 'web',
			icon: '🦞',
			accent: '#ff6b35',
			image: '/boogies-seafood.png'
		},
		{
			title: 'Portfolio Hackathon',
			description: 'Award-winning portfolio design from PLP Academy hackathon. Showcases creative design skills and modern web development techniques.',
			tech: ['HTML', 'CSS', 'JavaScript'],
			github: 'https://github.com/techjay01/PLP-Portfolio-Hackathon',
			demo: 'https://jaytech-portfolio.vercel.app/',
			category: 'portfolio',
			icon: '🏆',
			accent: '#00ff9f',
			image: '/portfolio-hackathon.png'
		}
	];

	const filters = [
		{ label: 'All Projects', value: 'all' },
		{ label: 'Web Apps', value: 'web' },
		{ label: 'Extensions', value: 'extension' },
		{ label: 'Portfolio', value: 'portfolio' }
	];

	let filteredProjects = $derived(
		selectedFilter === 'all' 
			? projects 
			: projects.filter(p => p.category === selectedFilter)
	);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (sectionElement) {
			observer.observe(sectionElement);
		}

		return () => observer.disconnect();
	});
</script>

<section id="projects" bind:this={sectionElement} class="py-20 px-4 sm:px-6 lg:px-8 relative">
	<div class="max-w-7xl mx-auto">
		<!-- Section Header -->
		<div class="mb-16 {isVisible ? 'animate-slide-in' : 'opacity-0'}">
			<h2 class="text-4xl sm:text-5xl font-display font-bold mb-4">
				<span class="text-neon-green font-mono"></span>
				<span class="text-gradient">Featured Projects</span>
			</h2>
			<div class="h-1 w-32 bg-gradient-to-r from-neon-blue to-neon-green"></div>
		</div>

		<!-- Filter Buttons -->
		<div class="{isVisible ? 'animate-fade-in animation-delay-200' : 'opacity-0'} flex flex-wrap gap-3 mb-12 justify-center">
			{#each filters as filter}
				<button
					onclick={() => selectedFilter = filter.value}
					class="px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300
						   {selectedFilter === filter.value 
							? 'bg-neon-blue text-dark-900 border-2 border-neon-blue' 
							: 'glass border border-cyan-500/30 hover:border-cyan-500'}"
				>
					{filter.label}
				</button>
			{/each}
		</div>

		<!-- Projects Grid -->
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredProjects as project, index}
				<div 
					class="{isVisible ? 'animate-slide-in' : 'opacity-0'} animation-delay-{(index % 3) * 200} glass rounded-lg border border-cyan-500/30 overflow-hidden group hover:border-neon-blue transition-all duration-300 hover:scale-105 cursor-pointer"
					onclick={() => selectedProject = project}
					onkeydown={(e) => e.key === 'Enter' && (selectedProject = project)}
					role="button"
					tabindex="0"
					aria-label="View {project.title} details">
					
				<!-- Project Thumbnail -->
				{#if project.image}
					<img src={project.image} alt={project.title} class="w-full h-40 object-cover" loading="lazy" width="400" height="160" />
				{:else}
					<div class="relative h-40 overflow-hidden flex items-center justify-center"
						style="background: linear-gradient(135deg, #0a0a12 0%, #0d1117 100%);">
						<svg class="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
							<defs>
								<pattern id="grid-{index}" width="20" height="20" patternUnits="userSpaceOnUse">
									<path d="M 20 0 L 0 0 0 20" fill="none" stroke="{project.accent}" stroke-width="0.5"/>
								</pattern>
							</defs>
							<rect width="100%" height="100%" fill="url(#grid-{index})"/>
						</svg>
						<div class="absolute w-24 h-24 rounded-full opacity-20 blur-2xl"
							style="background: {project.accent}"></div>
						<span class="relative text-5xl z-10 drop-shadow-lg">{project.icon}</span>
						<div class="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 opacity-60" style="border-color: {project.accent}"></div>
						<div class="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 opacity-60" style="border-color: {project.accent}"></div>
						<div class="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 opacity-60" style="border-color: {project.accent}"></div>
						<div class="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 opacity-60" style="border-color: {project.accent}"></div>
						<div class="absolute inset-x-0 h-px opacity-40 animate-pulse" style="background: {project.accent}; top: 50%"></div>
					</div>
				{/if}

				<!-- Project Header -->
					<div class="p-6 border-b border-cyan-500/20">
						<div class="flex items-start justify-between mb-4">
							<h3 class="text-xl font-display font-bold group-hover:text-neon-blue transition-colors">
								{project.title}
							</h3>
							<svg class="w-6 h-6 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
							</svg>
						</div>
						
						<p class="text-gray-400 text-sm leading-relaxed">
							{project.description}
						</p>
					</div>

					<!-- Tech Stack -->
					<div class="p-6">
						<div class="flex flex-wrap gap-2 mb-4">
							{#each project.tech as tech}
								<span class="px-3 py-1 bg-dark-700/50 rounded-full text-xs font-mono text-neon-green border border-neon-green/20">
									{tech}
								</span>
							{/each}
						</div>

						<!-- Links -->
						<div class="flex gap-4">
							<a 
								href={project.github}
								target="_blank"
								rel="noopener"
								class="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-neon-blue transition-colors">
								<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
								</svg>
								Code
							</a>
							
							{#if project.demo}
								<a 
									href={project.demo}
									target="_blank"
									rel="noopener"
									class="flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-neon-green transition-colors">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
									</svg>
									Demo
								</a>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- View More -->
		<div class="{isVisible ? 'animate-fade-in animation-delay-800' : 'opacity-0'} text-center mt-12">
			<a 
				href="https://github.com/techjay01?tab=repositories"
				target="_blank"
				rel="noopener"
				class="inline-flex items-center gap-2 px-8 py-4 glass rounded-lg border border-cyan-500/30 font-mono hover:border-neon-green hover:scale-105 transition-all duration-300">
				View All on GitHub
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
				</svg>
			</a>
		</div>
	</div>
</section>

<!-- Project Modal -->
{#if selectedProject}
	<dialog
		class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm m-0 max-w-none max-h-none w-full h-full border-0"
		onclick={() => selectedProject = null}
		onkeydown={(e) => e.key === 'Escape' && (selectedProject = null)}
		aria-label={selectedProject.title}
		open
	>
		<div
			class="relative w-full max-w-2xl glass border border-cyan-500/50 rounded-2xl overflow-hidden shadow-2xl animate-slide-in"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="presentation"
		>
			<!-- Image -->
			{#if selectedProject.image}
				<img src={selectedProject.image} alt={selectedProject.title} class="w-full h-56 object-cover" />
			{:else}
				<div class="h-56 flex items-center justify-center relative" style="background: linear-gradient(135deg, #0a0a12, #0d1117);">
					<div class="absolute w-32 h-32 rounded-full blur-3xl opacity-20" style="background: {selectedProject.accent}"></div>
					<span class="text-7xl relative z-10">{selectedProject.icon}</span>
				</div>
			{/if}

			<!-- Close button -->
			<button
				onclick={() => selectedProject = null}
				aria-label="Close modal"
				class="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/80 transition-colors"
			>
				<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
				</svg>
			</button>

			<!-- Content -->
			<div class="p-6">
				<h3 class="text-2xl font-display font-bold text-neon-blue mb-3">{selectedProject.title}</h3>
				<p class="text-gray-300 leading-relaxed mb-6">{selectedProject.description}</p>

				<!-- Tech -->
				<div class="flex flex-wrap gap-2 mb-6">
					{#each selectedProject.tech as tech}
						<span class="px-3 py-1 bg-dark-700/50 rounded-full text-xs font-mono text-neon-green border border-neon-green/20">{tech}</span>
					{/each}
				</div>

				<!-- Links -->
				<div class="flex gap-4">
					<a href={selectedProject.github} target="_blank" rel="noopener"
						class="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm border border-cyan-500/40 text-gray-200 hover:border-neon-blue hover:text-neon-blue transition-all">
						<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
						</svg>
						View Code
					</a>
					{#if selectedProject.demo}
						<a href={selectedProject.demo} target="_blank" rel="noopener"
							class="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm bg-neon-blue text-dark-900 font-bold hover:bg-neon-green transition-all">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
							</svg>
							Live Demo
						</a>
					{/if}
				</div>
			</div>
		</div>
	</dialog>
{/if}