<script lang="ts">
	import { onMount } from 'svelte';

	let isVisible = $state(false);
	let sectionElement: HTMLElement;
	let selectedFilter = $state('all');

	interface Project {
		title: string;
		description: string;
		tech: string[];
		github: string;
		demo?: string;
		category: string;
	}

	const projects: Project[] = [
		{
			title: 'Expense Tracker',
			description: 'A comprehensive web app to manage expenses and visualize spending habits. Tracks income, expenses, and balance with intuitive charts and data visualization.',
			tech: ['JavaScript', 'HTML', 'CSS', 'Chart.js'],
			github: 'https://github.com/techjay01/Expense-Tracker',
			category: 'web'
		},
		{
			title: 'Interactive Calculator',
			description: 'A modern calculator that performs arithmetic operations with result history saving. Features clean UI and error handling for seamless calculations.',
			tech: ['JavaScript', 'HTML', 'CSS'],
			github: 'https://github.com/techjay01/Calculator',
			category: 'web'
		},
		{
			title: 'Mini Todo List',
			description: 'Task management application for daily activities. Built to demonstrate JavaScript proficiency with CRUD operations and local storage.',
			tech: ['JavaScript', 'HTML', 'CSS', 'LocalStorage'],
			github: 'https://github.com/techjay01/Todo-List',
			category: 'web'
		},
		{
			title: 'Rock-Paper-Scissors Game',
			description: 'Interactive game implementation with computer AI. Features score tracking, smooth animations, and error-free gameplay experience.',
			tech: ['JavaScript', 'HTML', 'CSS'],
			github: 'https://github.com/techjay01/Rock-Paper-Scissors',
			category: 'game'
		},
		{
			title: 'Intermediate Form Project',
			description: 'Professional form template with validation and user feedback. Demonstrates mastery of HTML5 form elements and JavaScript validation.',
			tech: ['HTML5', 'CSS3', 'JavaScript'],
			github: 'https://github.com/techjay01/Intermediate-Form',
			category: 'web'
		},
		{
			title: 'Portfolio Hackathon',
			description: 'Award-winning portfolio design from PLP Academy hackathon. Showcases creative design skills and modern web development techniques.',
			tech: ['HTML', 'CSS', 'JavaScript'],
			github: 'https://github.com/techjay01/PLP-Portfolio-Hackathon',
			category: 'portfolio'
		}
	];

	const filters = [
		{ label: 'All Projects', value: 'all' },
		{ label: 'Web Apps', value: 'web' },
		{ label: 'Games', value: 'game' },
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
					class="{isVisible ? 'animate-slide-in' : 'opacity-0'} animation-delay-{(index % 3) * 200}
						   glass rounded-lg border border-cyan-500/30 overflow-hidden group hover:border-neon-blue transition-all duration-300 hover:scale-105">
					
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
