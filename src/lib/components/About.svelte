<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let sectionElement: HTMLElement;
	let aboutHeader: HTMLElement;
	let aboutText: HTMLElement;
	let aboutCard: HTMLElement;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionElement,
				start: 'top 80%',
				once: true
			},
			defaults: { ease: 'power3.out' }
		});

		tl.fromTo(aboutHeader, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.6 })
		  .fromTo(aboutText, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6 }, '-=0.2')
		  .fromTo(aboutCard, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6 }, '-=0.4');

		return () => ScrollTrigger.getAll().forEach(t => t.kill());
	});
</script>

<section id="about" bind:this={sectionElement} class="py-20 px-4 sm:px-6 lg:px-8 relative">
	<div class="max-w-4xl mx-auto">
		<!-- Section Header -->
		<div bind:this={aboutHeader} class="mb-16 opacity-0">
			<h2 class="text-4xl sm:text-5xl font-display font-bold mb-4">
				<span class="text-neon-green font-mono"></span>
				<span class="text-gradient">About Me</span>
			</h2>
			<div class="h-1 w-32 bg-gradient-to-r from-neon-blue to-neon-green"></div>
		</div>

		<!-- Content Grid -->
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<!-- Text Content -->
			<div bind:this={aboutText} class="opacity-0">
				<p class="text-gray-300 leading-relaxed mb-6">
					Hello! I'm <span class="text-neon-blue font-semibold">Mbamara Joshua</span>, 
					a passionate developer with a love for building creative solutions and exploring new technologies.
				</p>
				
				<p class="text-gray-300 leading-relaxed mb-6">
					Currently pursuing <span class="text-neon-green font-semibold">BTech in Computer Science</span> at 
					Federal University of Technology, Owerri, I thrive on challenges and enjoy turning ideas into reality through code.
				</p>

				<p class="text-gray-300 leading-relaxed mb-6">
					My journey in tech is driven by <span class="text-neon-purple font-semibold">curiosity</span>, 
					<span class="text-neon-blue font-semibold">collaboration</span>, and a desire to make a positive impact 
					through innovative web experiences.
				</p>

				<div class="flex flex-wrap gap-3 mt-8">
					<span class="px-4 py-2 glass rounded-lg border border-cyan-500/30 text-sm font-mono">
						Best Graduating Student
					</span>
					<span class="px-4 py-2 glass rounded-lg border border-cyan-500/30 text-sm font-mono">
						317 JAMB Score - 2022
					</span>
					<span class="px-4 py-2 glass rounded-lg border border-cyan-500/30 text-sm font-mono">
						9 Distinctions WAEC
					</span>
				</div>
			</div>

			<!-- Visual Element -->
			<div bind:this={aboutCard} class="opacity-0">
				<div class="relative">
					<div class="glass p-8 rounded-lg border border-cyan-500/30">
						<div class="space-y-4 font-mono text-sm">
							<div class="flex items-start gap-2">
								<span class="text-neon-green">const</span>
								<span class="text-neon-blue">developer</span>
								<span class="text-gray-400">=</span>
								<span class="text-neon-purple">{'{'}</span>
							</div>
							
							<div class="pl-6 space-y-2">
								<div>
									<span class="text-cyan-400">name:</span>
									<span class="text-neon-yellow">'Joshua Mbamara'</span>,
								</div>
								<div>
									<span class="text-cyan-400">role:</span>
									<span class="text-neon-yellow">'Frontend Developer'</span>,
								</div>
								<div>
									<span class="text-cyan-400">location:</span>
									<span class="text-neon-yellow">'Nigeria'</span>,
								</div>
								<div>
									<span class="text-cyan-400">focus:</span>
									<span class="text-neon-yellow">'Web Innovation'</span>,
								</div>
								<div>
									<span class="text-cyan-400">passion:</span>
									<span class="text-neon-yellow">'Building Solutions'</span>
								</div>
							</div>
							
							<div class="flex items-start gap-2">
								<span class="text-neon-purple">{'}'}</span>
								<span class="text-gray-400">;</span>
							</div>
						</div>
					</div>
					
					<!-- Decorative Glow -->
					<div class="absolute -inset-1 bg-gradient-to-r from-neon-blue to-neon-green opacity-20 blur-xl -z-10"></div>
				</div>
			</div>
		</div>
	</div>
</section>