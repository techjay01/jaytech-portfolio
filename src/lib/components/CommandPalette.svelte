<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		show?: boolean;
	}

	let { show = $bindable(false) }: Props = $props();

	interface Command {
		id: string;
		label: string;
		description: string;
		action: () => void;
		icon: string;
	}

	let searchQuery = $state('');
	let selectedIndex = $state(0);
	let inputElement: HTMLInputElement = $state()!

	const commands: Command[] = [
		{
			id: 'home',
			label: 'Go to Home',
			description: 'Navigate to homepage',
			icon: '🏠',
			action: () => scrollToSection('#home')
		},
		{
			id: 'about',
			label: 'View About',
			description: 'Learn more about me',
			icon: '👤',
			action: () => scrollToSection('#about')
		},
		{
			id: 'skills',
			label: 'View Skills',
			description: 'See my technical skills',
			icon: '⚡',
			action: () => scrollToSection('#skills')
		},
		{
			id: 'projects',
			label: 'Browse Projects',
			description: 'Check out my work',
			icon: '💼',
			action: () => scrollToSection('#projects')
		},
		{
			id: 'contact',
			label: 'Contact Me',
			description: 'Get in touch',
			icon: '📧',
			action: () => scrollToSection('#contact')
		},
		{
			id: 'github',
			label: 'Open GitHub',
			description: 'Visit my GitHub profile',
			icon: '🐙',
			action: () => window.open('https://github.com/techjay01', '_blank')
		},
		{
			id: 'linkedin',
			label: 'Open LinkedIn',
			description: 'Connect on LinkedIn',
			icon: '💼',
			action: () => window.open('https://www.linkedin.com/in/jaytech01', '_blank')
		},
		{
			id: 'twitter',
			label: 'Open Twitter',
			description: 'Follow me on Twitter',
			icon: '🐦',
			action: () => window.open('https://x.com/techjay01', '_blank')
		},
		{
			id: 'resume',
			label: 'Download Resume',
			description: 'Get my CV',
			icon: '📄',
			action: () => window.open('/my_latest_resume_jan2026.pdf', '_blank')
		}
	];

	$effect(() => {
		if (show && inputElement) {
			inputElement.focus();
		}
	});

	let filteredCommands = $derived(
		commands.filter(cmd =>
			cmd.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
			cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	function scrollToSection(href: string) {
		const target = document.querySelector(href);
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
		}
		show = false;
		searchQuery = '';
		selectedIndex = 0;
	}

	function executeCommand(command: Command) {
		command.action();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			show = false;
			searchQuery = '';
			selectedIndex = 0;
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, filteredCommands.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, 0);
		} else if (e.key === 'Enter' && filteredCommands.length > 0) {
			e.preventDefault();
			executeCommand(filteredCommands[selectedIndex]);
		}
	}

	$effect(() => {
		if (searchQuery) {
			selectedIndex = 0;
		}
	});
</script>

{#if show}
	<dialog
		class="fixed inset-0 m-0 w-full h-full max-w-none max-h-none border-0 p-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-[10vh] px-4"
		onclick={() => { show = false; }}
		onkeydown={handleKeydown}
		aria-label="Command palette"
		open
	>
		<div 
			class="w-full max-w-2xl glass border border-cyan-500/50 rounded-lg shadow-2xl animate-slide-in"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="presentation"
		>
			<!-- Search Input -->
			<div class="p-4 border-b border-cyan-500/30">
				<div class="flex items-center gap-3">
					<span class="text-2xl">⌘</span>
					<input
						bind:this={inputElement}
						bind:value={searchQuery}
						type="text"
						placeholder="Type a command or search..."
						class="flex-1 bg-transparent outline-none text-lg font-mono placeholder:text-gray-500"
						onkeydown={handleKeydown}
					/>
					<kbd class="px-2 py-1 text-xs font-mono text-gray-400 bg-dark-700 rounded border border-cyan-500/30">ESC</kbd>
				</div>
			</div>

			<!-- Commands List -->
			<div class="max-h-96 overflow-y-auto p-2">
				{#if filteredCommands.length === 0}
					<div class="p-8 text-center text-gray-400 font-mono">
						No commands found
					</div>
				{:else}
					{#each filteredCommands as command, index}
						<button
							class="w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 
								   {index === selectedIndex ? 'bg-cyan-500/20 border border-cyan-500/50' : 'hover:bg-cyan-500/10'}
								   text-left group"
							onclick={() => executeCommand(command)}
						>
							<span class="text-2xl">{command.icon}</span>
							<div class="flex-1">
								<div class="font-mono font-medium text-sm text-gray-200 group-hover:text-neon-blue transition-colors">
									{command.label}
								</div>
								<div class="text-xs text-gray-400 mt-0.5">
									{command.description}
								</div>
							</div>
							{#if index === selectedIndex}
								<span class="text-neon-green font-mono text-xs">ENTER ↵</span>
							{/if}
						</button>
					{/each}
				{/if}
			</div>

			<!-- Footer -->
			<div class="p-3 border-t border-cyan-500/30 flex items-center justify-between text-xs font-mono text-gray-400">
				<div class="flex gap-4">
					<span><kbd class="text-neon-blue">↑↓</kbd> Navigate</span>
					<span><kbd class="text-neon-green">Enter</kbd> Execute</span>
					<span><kbd class="text-neon-purple">ESC</kbd> Close</span>
				</div>
				<div>
					{filteredCommands.length} commands
				</div>
			</div>
		</div>
	</dialog>
{/if}