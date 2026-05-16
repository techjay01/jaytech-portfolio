<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		function handleOutsideClick(e: MouseEvent) {
			const target = e.target as HTMLElement;
			if (isOpen && !target.closest('.ai-assistant-root')) {
				isOpen = false;
			}
		}
		document.addEventListener('click', handleOutsideClick);
		return () => document.removeEventListener('click', handleOutsideClick);
	});

	interface Message {
		role: 'user' | 'assistant';
		content: string;
	}

	let isOpen = $state(false);
	let messages = $state<Message[]>([
		{
			role: 'assistant',
			content: "Hey! I'm Jay's AI assistant. Ask me anything about his skills, projects, or experience 👾"
		}
	]);
	let inputValue = $state('');
	let isLoading = $state(false);
	let messagesContainer: HTMLElement = $state()!;
	let inputEl: HTMLInputElement = $state()!;
	let hasNewMessage = $state(false);

	const SYSTEM_PROMPT = `You are an AI assistant for Joshua Mbamara (aka Jay~Tech), a Front-End Developer based in Lagos, Nigeria. Answer questions about him concisely and accurately.

PERSONAL INFO:
- Full name: Mbamara Joshua Elochukwu
- Alias: Jay~Tech
- Location: Babatunde Famori Street, Isheri Osun, Lagos State, Nigeria
- Phone: +234 9131428164
- Email: mbamarajoshua@gmail.com | techjay2023@gmail.com
- GitHub: github.com/techjay01
- LinkedIn: linkedin.com/in/jaytech01
- Portfolio: jaytech-portfolio.vercel.app

PROFESSIONAL SUMMARY:
Computer Science undergraduate with strong foundations in front-end development and core computing principles. Proficient in HTML, CSS, JavaScript, and responsive design, with a track record of building user-focused, efficient web applications. Adept at problem-solving, debugging, and continuously adapting to new technologies.

EDUCATION:
- Federal University of Technology Owerri (FUTO), Imo State, Nigeria | 2022–2027
  B.Tech. in Computer Science
- Scored 317 in JAMB, 9 distinctions in WAEC, Best Graduating Student (secondary school)

EXPERIENCE:
- Computer Instructor | Durable Comprehensive High School, Lagos | 08/2022 – 08/2023
  • Led assessments for 200+ students, improving performance by 84%
  • Conducted 350+ classes of 100+ students
  • Facilitated hands-on lab sessions and curriculum development

SKILLS:
Frontend: HTML/CSS (95%), JavaScript (90%), React (85%), Svelte (80%), TypeScript (85%), Tailwind CSS (90%)
Backend & Tools: Python (80%), Java (75%), Git (85%), VB (70%), PASCAL (75%)
Other: C++, Node.js, RESTful APIs, Responsive Web Design, Microsoft Office

CERTIFICATIONS:
- JavaScript Essentials 1 – OpenEDG, 2024
- JavaScript Essentials for FrontEnd and Mobile App – CISCO Networking Academy, 2024
- Most Charismatic Student – NACOS FUTO, 2026

PROFESSIONAL MEMBERSHIPS:
- Nigeria Association of Computing Students (NACOS) | ID: NCS/26/002580
- Nigeria Computing Society (NCS)
- IEEE | ID: 100150500
- Internet Society Nigeria Chapter (ISOC Nigeria)

LEADERSHIP:
- Senior Prefect Male – DCHS (2021–2022)
- Deputy Senior Prefect Male – DFS (2015–2016)
- Timekeeper & Deputy Timekeeper – DCHS (2019–2021)

PROJECTS:
1. Expense Tracker – web app for managing expenses with Chart.js visualizations
2. Interactive Calculator – arithmetic calculator with history saving
3. Mini Todo List – CRUD task manager with LocalStorage
4. Rock-Paper-Scissors Game – game with AI opponent and score tracking
5. Intermediate Form Project – HTML5 form with JS validation
6. Portfolio Hackathon – award-winning PLP Academy hackathon portfolio

This portfolio is built with SvelteKit 5, Three.js, Tailwind CSS, TypeScript, GSAP, and EmailJS.

Keep answers short (2-4 sentences max). Be friendly and use occasional tech emojis. If asked something you don't know, say so honestly. Never share phone number unless asked directly.`;

	async function sendMessage() {
		const text = inputValue.trim();
		if (!text || isLoading) return;

		inputValue = '';
		messages = [...messages, { role: 'user', content: text }];
		isLoading = true;

		await scrollToBottom();

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					system: SYSTEM_PROMPT,
					messages: messages
						.filter((m, i) => !(m.role === 'assistant' && i === 0))
						.map(m => ({ role: m.role, content: m.content }))
				})
			});

			const data = await response.json();
			const reply = data.choices?.[0]?.message?.content ?? 'Sorry, I had trouble responding. Try again!';
			messages = [...messages, { role: 'assistant', content: reply }];
		} catch {
			messages = [...messages, { role: 'assistant', content: 'Network error. Please try again!' }];
		} finally {
			isLoading = false;
			await scrollToBottom();
		}
	}

	async function scrollToBottom() {
		await new Promise(r => setTimeout(r, 50));
		if (messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}

	function toggleOpen() {
		isOpen = !isOpen;
		hasNewMessage = false;
		if (isOpen) {
			setTimeout(() => inputEl?.focus(), 100);
		}
	}

	const suggestions = ['What are his top skills?', 'Tell me about his projects', 'Is he available for hire?'];
</script>

<!-- AI Assistant Root -->
<div class="ai-assistant-root">
<!-- Floating Button -->
<button
	onclick={(e) => { e.stopPropagation(); toggleOpen(); }}
	aria-label="Open AI Assistant"
	class="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
	style="background: linear-gradient(135deg, #00d9ff, #00ff9f); box-shadow: 0 0 20px rgba(0,217,255,0.4);"
>
	{#if isOpen}
		<svg class="w-6 h-6 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
		</svg>
	{:else}
		<svg class="w-6 h-6 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.712-1.415 2.476l-3.091-.515a2.25 2.25 0 01-1.46-.78L9.75 15.75"/>
		</svg>
		{#if hasNewMessage}
			<span class="absolute top-0 right-0 w-3 h-3 bg-neon-green rounded-full animate-pulse"></span>
		{/if}
	{/if}
</button>

<!-- Chat Window -->
{#if isOpen}
	<div
		class="ai-chat-window fixed bottom-24 right-6 z-[60] w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl"
		style="border: 1px solid rgba(0,217,255,0.3); background: rgba(10,10,18,0.97); backdrop-filter: blur(20px); box-shadow: 0 0 40px rgba(0,217,255,0.15);"
	>
		<!-- Header -->
		<div class="px-4 py-3 flex items-center gap-3" style="background: linear-gradient(135deg, rgba(0,217,255,0.15), rgba(0,255,159,0.1)); border-bottom: 1px solid rgba(0,217,255,0.2);">
			<div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style="background: linear-gradient(135deg, #00d9ff, #00ff9f); color: #0a0a12;">
				AI
			</div>
			<div>
				<p class="font-mono font-bold text-sm text-neon-blue">Jay's Assistant</p>
				<p class="font-mono text-xs text-neon-green flex items-center gap-1">
					<span class="w-1.5 h-1.5 rounded-full bg-neon-green inline-block animate-pulse"></span>
					online
				</p>
			</div>
		</div>

		<!-- Messages -->
		<div bind:this={messagesContainer} class="h-72 overflow-y-auto p-4 space-y-3 font-mono text-sm">
			{#each messages as message}
				<div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
					<div
						class="max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed msg-bubble"
						style={message.role === 'user'
							? 'background: rgba(0,217,255,0.15); border: 1px solid rgba(0,217,255,0.3);'
							: 'background: rgba(0,255,159,0.08); border: 1px solid rgba(0,255,159,0.2);'}
					>
						{message.content}
					</div>
				</div>
			{/each}
			{#if isLoading}
				<div class="flex justify-start">
					<div class="px-3 py-2 rounded-xl text-xs" style="background: rgba(0,255,159,0.08); border: 1px solid rgba(0,255,159,0.2);">
						<span class="flex gap-1 items-center">
							<span class="w-1.5 h-1.5 rounded-full bg-neon-green animate-bounce" style="animation-delay:0ms"></span>
							<span class="w-1.5 h-1.5 rounded-full bg-neon-green animate-bounce" style="animation-delay:150ms"></span>
							<span class="w-1.5 h-1.5 rounded-full bg-neon-green animate-bounce" style="animation-delay:300ms"></span>
						</span>
					</div>
				</div>
			{/if}
		</div>

		<!-- Suggestions -->
		{#if messages.length === 1}
			<div class="px-4 pb-2 flex flex-wrap gap-2">
				{#each suggestions as s}
					<button
						onclick={(e) => { e.stopPropagation(); inputValue = s; sendMessage(); }}
						class="text-xs px-2 py-1 rounded-full font-mono transition-all hover:scale-105"
						style="border: 1px solid rgba(0,217,255,0.3); color: #00d9ff; background: rgba(0,217,255,0.05);"
					>
						{s}
					</button>
				{/each}
			</div>
		{/if}

		<!-- Input -->
		<div class="px-4 py-3 flex gap-2" style="border-top: 1px solid rgba(0,217,255,0.2);">
			<input
				bind:this={inputEl}
				bind:value={inputValue}
				onkeydown={handleKeydown}
				placeholder="Ask me anything..."
				class="flex-1 bg-transparent outline-none font-mono text-xs text-gray-300 placeholder:text-gray-600"
			/>
			<button
				onclick={sendMessage}
				disabled={isLoading || !inputValue.trim()}
				aria-label="Send message"
				class="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 disabled:opacity-30"
				style="background: linear-gradient(135deg, #00d9ff, #00ff9f);"
			>
				<svg class="w-4 h-4 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 12h14M12 5l7 7-7 7"/>
				</svg>
			</button>
		</div>
	</div>
{/if}
</div>