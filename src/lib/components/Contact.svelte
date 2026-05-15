<script lang="ts">
	import { onMount } from 'svelte';

	let isVisible = $state(false);
	let sectionElement: HTMLElement;
	let formState = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');

	interface FormData {
		name: string;
		email: string;
		message: string;
	}

	let formData = $state<FormData>({
		name: '',
		email: '',
		message: ''
	});

	let errors = $state({ name: '', email: '', message: '' });

	function validate(): boolean {
		errors = { name: '', email: '', message: '' };
		if (!formData.name.trim()) errors.name = 'Name is required';
		if (!formData.email.trim()) errors.email = 'Email is required';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email address';
		if (!formData.message.trim()) errors.message = 'Message is required';
		else if (formData.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
		return !errors.name && !errors.email && !errors.message;
	}

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

	import { PUBLIC_EMAILJS_SERVICE_ID, PUBLIC_EMAILJS_TEMPLATE_ID, PUBLIC_EMAILJS_PUBLIC_KEY } from '$env/static/public';
	import emailjs from '@emailjs/browser';

	function sanitize(str: string): string {
		return str.trim().replace(/[<>]/g, '');
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!validate()) return;
		formState = 'submitting';

		try {
			await emailjs.send(
				PUBLIC_EMAILJS_SERVICE_ID,
				PUBLIC_EMAILJS_TEMPLATE_ID,
				{
					from_name: sanitize(formData.name),
					email: sanitize(formData.email),
					subject: 'Portfolio Contact Form',
					message: sanitize(formData.message)
				},
				PUBLIC_EMAILJS_PUBLIC_KEY
			);
			formState = 'success';
			formData = { name: '', email: '', message: '' };
			setTimeout(() => formState = 'idle', 3000);
		} catch {
			formState = 'error';
		}
	}

	const contactMethods = [
		{
			icon: '📧',
			label: 'Email',
			value: 'techjay2023@gmail.com',
			link: 'mailto:techjay2023@gmail.com'
		},
		{
			icon: '💼',
			label: 'LinkedIn',
			value: 'jaytech01',
			link: 'https://www.linkedin.com/in/jaytech01'
		},
		{
			icon: '🐙',
			label: 'GitHub',
			value: 'techjay01',
			link: 'https://github.com/techjay01'
		},
		{
			icon: '🐦',
			label: 'Twitter',
			value: '@techjay01',
			link: 'https://x.com/techjay01'
		}
	];
</script>

<section id="contact" bind:this={sectionElement} class="py-20 px-4 sm:px-6 lg:px-8 relative">
	<div class="max-w-5xl mx-auto">
		<!-- Section Header -->
		<div class="mb-16 text-center {isVisible ? 'animate-slide-in' : 'opacity-0'}">
			<h2 class="text-4xl sm:text-5xl font-display font-bold mb-4">
				<span class="text-neon-green font-mono"></span>
				<span class="text-gradient">Get In Touch</span>
			</h2>
			<div class="h-1 w-32 bg-gradient-to-r from-neon-blue to-neon-green mx-auto mb-6"></div>
			<p class="text-gray-400 max-w-2xl mx-auto text-lg">
				I'm currently open to new opportunities and collaborations. 
				Whether you have a question or just want to say hi, feel free to reach out!
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-12">
			<!-- Contact Methods -->
			<div class="{isVisible ? 'animate-slide-in animation-delay-200' : 'opacity-0'}">
				<h3 class="text-2xl font-display font-bold mb-6 text-neon-blue">
					Contact Methods
				</h3>
				
				<div class="space-y-4">
					{#each contactMethods as method}
						<a 
							href={method.link}
							target="_blank"
							rel="noopener"
							class="flex items-center gap-4 p-4 glass rounded-lg border border-cyan-500/30 hover:border-neon-blue transition-all duration-300 group">
							<span class="text-3xl">{method.icon}</span>
							<div>
								<div class="font-mono text-sm text-gray-400">{method.label}</div>
								<div class="font-mono text-neon-green group-hover:text-neon-blue transition-colors">
									{method.value}
								</div>
							</div>
						</a>
					{/each}
				</div>

				<!-- Quick Links -->
				<div class="mt-8 glass p-6 rounded-lg border border-cyan-500/30">
					<h4 class="font-display font-bold mb-4 text-neon-purple">Quick Links</h4>
					<div class="space-y-2 font-mono text-sm">
						<a href="/my_latest_resume_jan2026.pdf" target="_blank" rel="noopener"
						   class="block text-gray-400 hover:text-neon-green transition-colors">
							→ Download Resume
						</a>
						<a href="https://github.com/techjay01?tab=repositories" target="_blank" rel="noopener"
						   class="block text-gray-400 hover:text-neon-green transition-colors">
							→ View All Projects
						</a>
						<a href="https://www.linkedin.com/in/jaytech01" target="_blank" rel="noopener"
						   class="block text-gray-400 hover:text-neon-green transition-colors">
							→ Connect on LinkedIn
						</a>
					</div>
				</div>
			</div>

			<!-- Contact Form -->
			<div class="{isVisible ? 'animate-slide-in animation-delay-400' : 'opacity-0'}">
				<h3 class="text-2xl font-display font-bold mb-6 text-neon-blue">
					Send a Message
				</h3>

				<form onsubmit={handleSubmit} class="space-y-6">
					<div>
						<label for="name" class="block font-mono text-sm mb-2 text-gray-300">
							<span class="text-neon-green">//</span> Your Name
						</label>
						<input
							id="name"
							type="text"
							bind:value={formData.name}
							class="w-full px-4 py-3 bg-dark-800/50 border {errors.name ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg focus:border-neon-blue focus:outline-none transition-colors font-mono"
							placeholder="John Doe"
						/>
						{#if errors.name}<p class="text-red-400 font-mono text-xs mt-1">{errors.name}</p>{/if}
					</div>

					<div>
						<label for="email" class="block font-mono text-sm mb-2 text-gray-300">
							<span class="text-neon-green">//</span> Your Email
						</label>
						<input
							id="email"
							type="email"
							bind:value={formData.email}
							class="w-full px-4 py-3 bg-dark-800/50 border {errors.email ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg focus:border-neon-blue focus:outline-none transition-colors font-mono"
							placeholder="john@example.com"
						/>
						{#if errors.email}<p class="text-red-400 font-mono text-xs mt-1">{errors.email}</p>{/if}
					</div>

					<div>
						<label for="message" class="block font-mono text-sm mb-2 text-gray-300">
							<span class="text-neon-green">//</span> Your Message
						</label>
						<textarea
							id="message"
							bind:value={formData.message}
							rows="5"
							class="w-full px-4 py-3 bg-dark-800/50 border {errors.message ? 'border-red-500' : 'border-cyan-500/30'} rounded-lg focus:border-neon-blue focus:outline-none transition-colors font-mono resize-none"
							placeholder="Hi Joshua, I'd like to..."
						></textarea>
						{#if errors.message}<p class="text-red-400 font-mono text-xs mt-1">{errors.message}</p>{/if}
					</div>

					<button
						type="submit"
						disabled={formState === 'submitting'}
						class="w-full px-6 py-4 bg-gradient-to-r from-neon-blue to-neon-green text-dark-900 font-mono font-bold rounded-lg 
							   hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
						{#if formState === 'submitting'}
							<span class="flex items-center justify-center gap-2">
								<svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								Sending...
							</span>
						{:else if formState === 'success'}
							✓ Message Sent!
						{:else if formState === 'error'}
								✗ Failed. Try Again
							{:else}
							Send Message
						{/if}
					</button>

					{#if formState === 'success'}
						<div class="p-4 bg-neon-green/10 border border-neon-green/30 rounded-lg font-mono text-sm text-neon-green animate-fade-in">
							Thanks for reaching out! I'll get back to you soon.
						</div>
					{/if}

					{#if formState === 'error'}
						<div class="p-4 bg-red-500/10 border border-red-500/30 rounded-lg font-mono text-sm text-red-400 animate-fade-in">
							Something went wrong. Please try again or email me directly at techjay2023@gmail.com
						</div>
					{/if}
				</form>
			</div>
		</div>
	</div>
</section>