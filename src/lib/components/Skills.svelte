<script lang="ts">
	import { onMount } from 'svelte';

	let isVisible = $state(false);
	let sectionElement: HTMLElement;

	const skillCategories = [
		{
			title: 'Frontend',
			skills: [
				{ name: 'HTML/CSS', level: 95 },
				{ name: 'JavaScript', level: 70 },
				{ name: 'Tailwind CSS', level: 70 },
				{ name: 'React', level: 50 },
				{ name: 'Next.js', level: 40 },
				{ name: 'Vue.js', level: 40 },
				{ name: 'Svelte', level: 35 },
				{ name: 'TypeScript', level: 60 }
			]
		},
		{
			title: 'Backend & Tools',
			skills: [
				{ name: 'Git/GitHub', level: 85 },
				{ name: 'Python', level: 40 },
				{ name: 'Java', level: 40 },
				{ name: 'Vitest', level: 50 },
				{ name: 'Three.js', level: 30 },
				{ name: 'Chart.js', level: 35 },
				{ name: 'APIs', level: 50 }
			]
		}
	];

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

<section id="skills" bind:this={sectionElement} class="py-20 px-4 sm:px-6 lg:px-8 relative">
	<div class="max-w-6xl mx-auto">
		<!-- Section Header -->
		<div class="mb-16 {isVisible ? 'animate-slide-in' : 'opacity-0'}">
			<h2 class="text-4xl sm:text-5xl font-display font-bold mb-4">
				<span class="text-neon-green font-mono"></span>
				<span class="text-gradient">Technical Skills</span>
			</h2>
			<div class="h-1 w-32 bg-gradient-to-r from-neon-blue to-neon-green"></div>
		</div>

		<!-- Skills Grid -->
		<div class="grid md:grid-cols-2 gap-8">
			{#each skillCategories as category, categoryIndex}
				<div class="{isVisible ? 'animate-slide-in' : 'opacity-0'} animation-delay-{(categoryIndex + 1) * 200}">
					<div class="glass p-6 rounded-lg border border-cyan-500/30 h-full">
						<h3 class="text-2xl font-display font-bold mb-6 text-neon-blue">
							{category.title}
						</h3>
						
						<div class="space-y-6">
							{#each category.skills as skill}
								<div class="group">
									<div class="flex justify-between mb-2">
										<span class="font-mono text-sm flex items-center gap-2">
											{skill.name}
										</span>
										<span class="font-mono text-sm text-neon-green">
											{skill.level}%
										</span>
									</div>
									
									<div class="h-2 bg-dark-700 rounded-full overflow-hidden">
										<div 
											class="h-full bg-gradient-to-r from-neon-blue to-neon-green transition-all duration-1000 ease-out rounded-full"
											style="width: {isVisible ? skill.level : 0}%"
										></div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Additional Skills Tags -->
		<div class="{isVisible ? 'animate-fade-in animation-delay-600' : 'opacity-0'} mt-12">
			<h3 class="text-xl font-display font-bold mb-6 text-center">
				<span class="text-neon-purple">Also Familiar With</span>
			</h3>
			<div class="flex flex-wrap justify-center gap-3">
				{#each ['Node.js', 'RESTful APIs', 'Responsive Design', 'UI/UX Design', 'Graphics Design', 'Adobe Photoshop', 'Microsoft Office', 'Meta Ads', 'Problem Solving'] as tech}
					<span class="px-4 py-2 glass rounded-lg border border-purple-500/30 text-sm font-mono hover:border-neon-purple hover:scale-105 transition-all duration-300 cursor-default">
						{tech}
					</span>
				{/each}
			</div>
		</div>
	</div>
</section>
