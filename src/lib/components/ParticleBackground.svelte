<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let canvas: HTMLCanvasElement = $state()!;
	let failed = $state(false);

	onMount(() => {
		try {
			// Scene setup
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			const renderer = new THREE.WebGLRenderer({ 
				canvas, 
				alpha: true, 
				antialias: true 
			});

			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			camera.position.z = 5;

			// Create floating geometric shapes
			const geometries = [
				new THREE.BoxGeometry(0.2, 0.2, 0.2),
				new THREE.OctahedronGeometry(0.15),
				new THREE.TetrahedronGeometry(0.15),
				new THREE.IcosahedronGeometry(0.1)
			];

			const material = new THREE.MeshBasicMaterial({
				color: 0x00d9ff,
				wireframe: true,
				transparent: true,
				opacity: 0.3
			});

			const particles: THREE.Mesh[] = [];
			const particleCount = 30;

			for (let i = 0; i < particleCount; i++) {
				const geometry = geometries[Math.floor(Math.random() * geometries.length)];
				const particle = new THREE.Mesh(geometry, material.clone());
				
				particle.position.x = (Math.random() - 0.5) * 15;
				particle.position.y = (Math.random() - 0.5) * 15;
				particle.position.z = (Math.random() - 0.5) * 10;
				
				particle.rotation.x = Math.random() * Math.PI;
				particle.rotation.y = Math.random() * Math.PI;
				
				(particle as any).userData = {
					velocity: {
						x: (Math.random() - 0.5) * 0.01,
						y: (Math.random() - 0.5) * 0.01,
						z: (Math.random() - 0.5) * 0.01
					},
					rotationSpeed: {
						x: (Math.random() - 0.5) * 0.02,
						y: (Math.random() - 0.5) * 0.02,
						z: (Math.random() - 0.5) * 0.02
					}
				};
				
				particles.push(particle);
				scene.add(particle);
			}

			// Mouse interaction
			let mouseX = 0;
			let mouseY = 0;
			
			const handleMouseMove = (event: MouseEvent) => {
				mouseX = (event.clientX / window.innerWidth) * 2 - 1;
				mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
			};

			window.addEventListener('mousemove', handleMouseMove);

			// Animation loop
			function animate() {
				requestAnimationFrame(animate);

				particles.forEach((particle) => {
					const userData = (particle as any).userData;
					
					// Move particles
					particle.position.x += userData.velocity.x;
					particle.position.y += userData.velocity.y;
					particle.position.z += userData.velocity.z;
					
					// Bounce off boundaries
					if (Math.abs(particle.position.x) > 7) userData.velocity.x *= -1;
					if (Math.abs(particle.position.y) > 7) userData.velocity.y *= -1;
					if (Math.abs(particle.position.z) > 5) userData.velocity.z *= -1;
					
					// Rotate particles
					particle.rotation.x += userData.rotationSpeed.x;
					particle.rotation.y += userData.rotationSpeed.y;
					particle.rotation.z += userData.rotationSpeed.z;
					
					// Mouse interaction - subtle push effect
					const dx = mouseX * 2 - particle.position.x;
					const dy = mouseY * 2 - particle.position.y;
					particle.position.x += dx * 0.001;
					particle.position.y += dy * 0.001;
				});

				// Gentle camera movement
				camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.01;
				camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.01;
				camera.lookAt(scene.position);

				renderer.render(scene, camera);
			}

			animate();

			// Handle resize
			const handleResize = () => {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			};

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('mousemove', handleMouseMove);
				window.removeEventListener('resize', handleResize);
				
				particles.forEach(particle => {
					scene.remove(particle);
					particle.geometry.dispose();
					(particle.material as THREE.Material).dispose();
				});
				
				renderer.dispose();
			};
		} catch {
			failed = true;
		}
	});
</script>

{#if failed}
	<div class="fixed inset-0 cyber-grid opacity-30 pointer-events-none" style="z-index: 1;"></div>
{:else}
	<canvas 
		bind:this={canvas}
		class="fixed inset-0 w-full h-full pointer-events-none"
		style="z-index: 1;"
	></canvas>
{/if}