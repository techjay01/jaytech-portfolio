<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let sectionElement: HTMLElement;
	let aboutHeader: HTMLElement;
	let aboutText: HTMLElement;
	let aboutCard: HTMLElement;
	let timelineItems: HTMLElement[] = [];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline({
			scrollTrigger: { trigger: sectionElement, start: 'top 80%', once: true },
			defaults: { ease: 'power3.out' }
		});

		tl.fromTo(aboutHeader, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.6 })
		  .fromTo(aboutText, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6 }, '-=0.2')
		  .fromTo(aboutCard, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.6 }, '-=0.4');

		// Animate timeline items on scroll
		timelineItems.forEach((item, i) => {
			gsap.fromTo(item,
				{ opacity: 0, x: i % 2 === 0 ? -40 : 40 },
				{
					opacity: 1, x: 0, duration: 0.6,
					scrollTrigger: { trigger: item, start: 'top 85%', once: true },
					delay: i * 0.1
				}
			);
		});

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
						Tech-Driven
					</span>
					<span class="px-4 py-2 glass rounded-lg border border-cyan-500/30 text-sm font-mono">
						Two Years of Working Experience
					</span>
					<span class="px-4 py-2 glass rounded-lg border border-cyan-500/30 text-sm font-mono">
						Leadership Skills
					</span>
					<span class="px-4 py-2 glass rounded-lg border border-cyan-500/30 text-sm font-mono">
						Reliable and Efficient
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

		<!-- Timeline -->
		<div class="mt-24">
			<h3 class="text-2xl font-display font-bold mb-12 text-center">
				<span class="text-neon-blue font-mono">&lt;</span>
				<span class="text-gradient">Journey</span>
				<span class="text-neon-blue font-mono">/&gt;</span>
			</h3>

			<div class="relative">
				<!-- Center line -->
				<div class="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-green to-neon-purple hidden md:block"></div>

				{#each [
					{ year: '2015–2016', title: 'Deputy Senior Prefect', org: 'Durable Foundation Schools', side: 'left', color: '#00d9ff' },
					{ year: '2021–2022', title: 'Senior Prefect Male', org: 'Durable Comprehensive High School', side: 'right', color: '#00ff9f' },
					{ year: '2022', title: 'Best Graduating Student', org: 'WAEC — 9 Distinctions · JAMB 317', side: 'left', color: '#b400ff' },
					{ year: '2022–2023', title: 'Computer Instructor', org: 'Durable Comprehensive High School', side: 'right', color: '#00d9ff' },
					{ year: '2022–2027', title: 'B.Tech Computer Science', org: 'Federal University of Technology, Owerri', side: 'left', color: '#00ff9f' },
					{ year: '2023', title: 'Member | ID: NCS/26/002580', org: 'Nigerian Association of Computing Students (NACOS)', side: 'right', color: '#b400ff' },
					{ year: '2023', title: 'Member, IEEE', org: 'IEEE ID NO: 100150500', side: 'left', color: '#00d9ff' },
					{ year: '2024', title: 'JavaScript Certifications', org: 'OpenEDG · CISCO Networking Academy', side: 'right', color: '#00ff9f' },
					{ year: '2025', title: 'Work Readiness Certification', org: 'Unified Human Resource Consulting', side: 'left', color: '#b400ff' },
					{ year: '2026', title: 'Nestle E-learning Completion Certification', org: 'Nestle', side: 'right', color: '#00d9ff' },
					{ year: '2026', title: 'Frontend Intern', org: 'HNG Tech', side: 'left', color: '#00ff9f' },
					{ year: '2026', title: 'Student Intern', org: 'DigitUp Solutions Limited', side: 'right', color: '#b400ff' },
				] as item, i}
					<div
						bind:this={timelineItems[i]}
						class="relative flex md:items-center mb-10 opacity-0
							{item.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'}"
					>
						<!-- Content -->
						<div class="md:w-5/12 w-full {item.side === 'left' ? 'md:pr-10' : 'md:pl-10'}">
							<div class="glass p-5 rounded-xl border transition-all duration-300 hover:scale-105"
								style="border-color: {item.color}40;">
								<div class="flex items-center gap-3 mb-2">
									<span class="font-mono text-xs px-2 py-0.5 rounded-full" style="color: {item.color}; border: 1px solid {item.color}40;">{item.year}</span>
								</div>
								<h4 class="font-display font-bold text-sm mb-1" style="color: {item.color}">{item.title}</h4>
								<p class="text-gray-400 text-xs font-mono">{item.org}</p>
							</div>
						</div>

						<!-- Center dot -->
						<div class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 items-center justify-center"
							style="background: {item.color}; border-color: {item.color}; box-shadow: 0 0 12px {item.color};">
						</div>

						<!-- Empty side -->
						<div class="hidden md:block md:w-5/12"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>