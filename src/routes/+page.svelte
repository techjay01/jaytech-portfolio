<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<svelte:head>
	<title>Joshua Mbamara - Frontend Developer Portfolio</title>
	<meta name="description" content="Interactive portfolio of Joshua Mbamara - Frontend Developer specializing in building scalable, responsive web interfaces with modern technologies." />
</svelte:head>

<div class="relative">
	<Hero />
	<About />
	<Skills />
	<Projects />
	<Contact />
</div>
