<script>
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms';

  const sequences = [
    { id: '01', title: 'Rebuild (ESRU)', desc: 'Utilizing Ex-Situ Resource Utilization (ESRU) to intercept construction and demolition materials, diverting high-value components from landfills to distressed communities.' },
    { id: '02', title: 'Reuse (Renewables)', desc: 'Reclaiming, testing, and refurbishing decommissioned PV systems, wind turbines, and energy storage for distribution to LMI families and rural municipalities.' },
    { id: '03', title: 'Repurpose (Brownfields)', desc: 'Collaborating with municipalities to transform legacy brownfield sites into public-benefit energy generation and free or low-cost EV charging infrastructure.' }
  ];

  const trajectory = [
    { id: 'ESRU-1', name: 'EX-SITU LOGISTICS', status: 'IN_PROGRESS', desc: 'Scaling reverse logistics and deconstruction expertise with active partners to serve LMI populations.' },
    { id: 'MK-1', name: 'IMR MK-1 SYSTEM', status: 'PHASE_1_DEVELOPMENT', desc: 'Engineering the flagship mobile recovery unit for on-site material processing and quality verification.' },
    { id: 'HUB-1', name: 'GOVERNMENT PARTNERSHIP', status: 'PIPELINE_MILESTONE', desc: 'Long-term redevelopment of brownfield sites into public-benefit energy assets and community resources.' }
  ];

  let canvas;
  let showNewsletterModal = false;
  let showContactModal = false;
  let isSubmitting = false;
  let submissionResult = null;

  function closeModal() {
    showNewsletterModal = false;
    showContactModal = false;
    submissionResult = null;
    isSubmitting = false;
  }

  // Handle body scroll lock when modal is open
  $: if (typeof document !== 'undefined') {
    if (showNewsletterModal || showContactModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  onMount(() => {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    class Connection {
      constructor() {
        this.reset();
      }

      reset() {
        const centerX = width / 2;
        const centerY = height / 2;
        const radiusX = width * 0.4;
        const radiusY = height * 0.3;

        const getPoint = () => {
          const angle = Math.random() * Math.PI * 2;
          const r = 0.8 + Math.random() * 0.2;
          return {
            x: centerX + Math.cos(angle) * radiusX * r,
            y: centerY + Math.sin(angle) * radiusY * r
          };
        };

        const start = getPoint();
        const end = getPoint();

        this.x = start.x;
        this.y = start.y;
        this.targetX = end.x;
        this.targetY = end.y;

        this.cp1x = centerX + (Math.random() - 0.5) * radiusX;
        this.cp1y = centerY + (Math.random() - 0.5) * radiusY;
        this.cp2x = centerX + (Math.random() - 0.5) * radiusX;
        this.cp2y = centerY + (Math.random() - 0.5) * radiusY;

        this.progress = 0;
        this.speed = 0.0005 + Math.random() * 0.001;
        this.opacity = 0.3 + Math.random() * 0.4;
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.targetX, this.targetY);
        const alpha = this.opacity * (1 - Math.abs(this.progress - 0.5) * 2);
        ctx.strokeStyle = `rgba(60, 80, 120, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        const t = this.progress;
        const cx = (1-t)**3 * this.x + 3*(1-t)**2*t * this.cp1x + 3*(1-t)*t**2 * this.cp2x + t**3 * this.targetX;
        const cy = (1-t)**3 * this.y + 3*(1-t)**2*t * this.cp1y + 3*(1-t)*t**2 * this.cp2y + t**3 * this.targetY;
        
        ctx.beginPath();
        ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 95, 31, ${alpha * 1.5})`;
        ctx.fill();

        this.progress += this.speed;
        if (this.progress > 1) this.reset();
      }
    }

    for (let i = 0; i < 12; i++) {
      particles.push(new Connection());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => p.draw());
      requestAnimationFrame(animate);
    };

    animate();
  });
</script>

<svelte:head>
  <title>Integrated Materials Reuse (IMR) | Mission Control</title>
  <meta name="description" content="IMR transforms industrial waste into community infrastructure through advanced reverse logistics and Ex-Situ Resource Utilization (ESRU) in New York State." />
  <meta property="og:title" content="Integrated Materials Reuse (IMR) | Mission Control" />
  <meta property="og:description" content="Executing Ex-Situ Resource Utilization (ESRU) to intercept industrial waste streams and redeploy them as resilient infrastructure." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://integratedmaterialsreuse.org" />
</svelte:head>

<canvas bind:this={canvas} class="fixed inset-0 pointer-events-none z-0 opacity-50"></canvas>

<main class="min-h-screen flex flex-col relative z-10">
  <!-- Header / Nav -->
  <header class="p-6 border-b border-blueprint-blue flex justify-between items-center">
    <div class="mono text-mission-orange font-bold text-xl">IMR_SYSTEMS_v7.4</div>
    <div class="status-indicator">[STATUS: CHARITABLE_CORPORATION_PENDING]</div>
  </header>

  <!-- Hero Section -->
  <section class="flex-grow flex flex-col justify-center items-center text-center p-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blueprint-blue/20 to-transparent">
    <div class="mono text-mission-orange mb-4 tracking-[0.2em]">[NYS CHARITABLE CORPORATION: SECTION_402_NPCL]</div>
    <h1 class="text-5xl md:text-7xl mb-6 max-w-5xl leading-tight">
      Waste is just matter at the <span class="text-mission-orange">wrong coordinates.</span>
    </h1>
    <p class="text-xl md:text-2xl text-lunar-gray/80 max-w-3xl mb-10">
      Executing Ex-Situ Resource Utilization (ESRU) to intercept industrial waste streams and redeploy them as resilient infrastructure for LMI populations.
    </p>
    <div class="flex flex-col sm:flex-row gap-4">
      <button class="btn-mission" on:click={() => { showNewsletterModal = true; submissionResult = null; }}>Join the Mission</button>
      <button class="border border-lunar-gray text-lunar-gray px-6 py-3 uppercase font-bold hover:bg-lunar-gray hover:text-deep-space transition-all" on:click={() => { showContactModal = true; submissionResult = null; }}>Contact Mission Control</button>
    </div>
  </section>

  <!-- Mission Objective -->
  <section class="p-10 md:p-20 border-y border-blueprint-blue bg-blueprint-blue/10">
    <div class="max-w-4xl mx-auto">
      <div class="mono text-xs text-blueprint-blue mb-2">// MISSION_OBJECTIVE</div>
      <h2 class="text-3xl mb-6">Promoting environmental stewardship and resource equity.</h2>
      <p class="text-2xl leading-relaxed italic">
        "IMR exists to serve distressed communities by diverting industrial components from the waste stream, lessening the burdens of government through the redevelopment of brownfield sites into public-benefit energy assets."
      </p>
    </div>
  </section>

  <!-- Operational Sequences -->
  <section class="p-10 md:p-20">
    <h2 class="text-3xl mb-12 text-center">Operational Sequences</h2>
    <div class="grid md:grid-cols-3 gap-8">
      {#each sequences as seq}
        <div class="border-blueprint p-6 hover:bg-blueprint-blue/20 transition-all group">
          <div class="mono text-mission-orange mb-4">SEQ_{seq.id}</div>
          <h3 class="text-xl mb-4 group-hover:text-mission-orange transition-colors">{seq.title}</h3>
          <p class="text-lunar-gray/70">{seq.desc}</p>
        </div>
      {/each}
    </div>
  </section>

  <!-- Mission Trajectory -->
  <section class="p-10 md:p-20 bg-blueprint-blue/5">
    <h2 class="text-3xl mb-12">Mission Trajectory</h2>
    <div class="space-y-8">
      {#each trajectory as dep}
        <div class="border-blueprint p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div class="flex items-center gap-4 mb-2">
              <span class="mono text-mission-orange font-bold text-lg">{dep.id}</span>
              <span class="status-indicator">{dep.status}</span>
            </div>
            <h3 class="text-2xl mb-2">[{dep.name}]</h3>
            <p class="text-lunar-gray/70 max-w-xl">{dep.desc}</p>
          </div>
          <button class="border border-blueprint-blue px-4 py-2 mono text-xs opacity-50 cursor-not-allowed">VIEW_TRAJECTORY_DATA</button>
        </div>
      {/each}
    </div>
  </section>

  <!-- Footer -->
  <footer class="p-10 border-t border-blueprint-blue mt-auto">
    <div class="grid md:grid-cols-3 gap-10">
      <div>
        <div class="mono text-mission-orange mb-4">ENTITY_DATA</div>
        <p>Integrated Materials Reuse Inc.</p>
        <p class="text-sm text-lunar-gray/50 mt-2">NYS Charitable Corporation</p>
        <p class="text-xs text-lunar-gray/40 mt-1">[501(c)(3) PENDING]</p>
      </div>
      <div>
        <div class="mono text-mission-orange mb-4">COORDINATES</div>
        <p>County of HERKIMER, New York</p>
        <p>Serving the I-90 Corridor</p>
      </div>
      <div>
        <div class="mono text-mission-orange mb-4">TELEMETRY</div>
        <p class="mono text-xs">LAT: 42.6526° N</p>
        <p class="mono text-xs">LONG: 73.7562° W</p>
      </div>
    </div>
    <div class="mt-10 pt-10 border-t border-blueprint-blue/30 text-center mono text-[10px] text-lunar-gray/30">
      &copy; 2026 IMR_SYSTEMS // ALL RIGHTS RESERVED // SECURE_CONNECTION_ESTABLISHED
    </div>
  </footer>
</main>

<!-- Newsletter Modal -->
{#if showNewsletterModal}
  <div class="fixed inset-0 flex items-center justify-center z-50 bg-deep-space/90 backdrop-blur-md p-4" on:click|self={closeModal} on:keydown|self={(e) => e.key === 'Escape' && closeModal()} role="button" tabindex="-1">
    <div class="w-full max-w-md border border-mission-orange bg-deep-space p-6 relative shadow-[0_0_30px_rgba(255,95,31,0.2)]">
      <!-- CRT Scanline Overlay -->
      <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,95,31,0.05)_50%,transparent_50%)] bg-[length:100%_4px] opacity-20"></div>
      
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-mission-orange/30 pb-4 mb-6">
        <div class="mono text-mission-orange font-bold text-sm tracking-wider">[TERMINAL: NEWSLETTER_SIGNUP]</div>
        <button class="mono text-mission-orange hover:text-white transition-colors" on:click={closeModal}>[X]</button>
      </div>

      {#if submissionResult?.success}
        <div class="text-center py-8">
          <div class="mono text-green-500 text-xl font-bold mb-4">>>> TRANSMISSION_SUCCESSFUL</div>
          <p class="text-lunar-gray/80 mb-6">Your coordinates have been added to our telemetry. Welcome to the mission.</p>
          <button class="border border-green-500 text-green-500 px-4 py-2 mono text-xs hover:bg-green-500/20 transition-all" on:click={closeModal}>CLOSE_TERMINAL</button>
        </div>
      {:else}
        <form method="POST" action="?/contact" use:enhance={() => {
          isSubmitting = true;
          submissionResult = null;
          return async ({ result }) => {
            isSubmitting = false;
            if (result.type === 'success') {
              submissionResult = { success: true };
            } else {
              submissionResult = { success: false, error: result.data?.error || 'Transmission failed.' };
            }
          };
        }}>
          <input type="hidden" name="type" value="newsletter" />
          
          <p class="text-sm text-lunar-gray/80 mb-6 leading-relaxed">
            Enter your details to receive periodic telemetry updates, operational sequences, and resource utilization reports from Herkimer County.
          </p>

          <div class="mb-4">
            <label class="block mono text-xs text-mission-orange mb-2" for="newsletter-name">COORDINATOR_NAME:</label>
            <input 
              type="text" 
              id="newsletter-name" 
              name="name" 
              required 
              placeholder="John Doe"
              class="w-full bg-blueprint-blue/30 border border-blueprint-blue focus:border-mission-orange text-white px-4 py-3 mono text-sm outline-none transition-all"
              disabled={isSubmitting}
            />
          </div>

          <div class="mb-6">
            <label class="block mono text-xs text-mission-orange mb-2" for="newsletter-email">ENTER_EMAIL_ADDRESS:</label>
            <input 
              type="email" 
              id="newsletter-email" 
              name="email" 
              required 
              placeholder="user@domain.com"
              class="w-full bg-blueprint-blue/30 border border-blueprint-blue focus:border-mission-orange text-white px-4 py-3 mono text-sm outline-none transition-all"
              disabled={isSubmitting}
            />
          </div>

          {#if submissionResult?.error}
            <div class="mono text-red-500 text-xs mb-4">
              >>> ERROR: {submissionResult.error}
            </div>
          {/if}

          <div class="flex justify-end gap-4">
            <button 
              type="button" 
              class="border border-blueprint-blue text-lunar-gray px-4 py-2 mono text-xs hover:bg-blueprint-blue transition-all" 
              on:click={closeModal}
              disabled={isSubmitting}
            >
              ABORT_MISSION
            </button>
            <button 
              type="submit" 
              class="bg-mission-orange text-white px-6 py-2 font-bold uppercase tracking-tighter hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mono text-xs"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'TRANSMITTING...' : 'JOIN_MISSION'}
            </button>
          </div>
        </form>
      {/if}
    </div>
  </div>
{/if}

<!-- Contact Modal -->
{#if showContactModal}
  <div class="fixed inset-0 flex items-center justify-center z-50 bg-deep-space/90 backdrop-blur-md p-4" on:click|self={closeModal} on:keydown|self={(e) => e.key === 'Escape' && closeModal()} role="button" tabindex="-1">
    <div class="w-full max-w-lg border border-mission-orange bg-deep-space p-6 relative shadow-[0_0_30px_rgba(255,95,31,0.2)]">
      <!-- CRT Scanline Overlay -->
      <div class="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(255,95,31,0.05)_50%,transparent_50%)] bg-[length:100%_4px] opacity-20"></div>
      
      <!-- Header -->
      <div class="flex justify-between items-center border-b border-mission-orange/30 pb-4 mb-6">
        <div class="mono text-mission-orange font-bold text-sm tracking-wider">[TERMINAL: CONTACT_MISSION_CONTROL]</div>
        <button class="mono text-mission-orange hover:text-white transition-colors" on:click={closeModal}>[X]</button>
      </div>

      {#if submissionResult?.success}
        <div class="text-center py-8">
          <div class="mono text-green-500 text-xl font-bold mb-4">>>> TRANSMISSION_SUCCESSFUL</div>
          <p class="text-lunar-gray/80 mb-6">Your message has been routed to Mike Wyant Jr. at Mission Control. We will establish contact shortly.</p>
          <button class="border border-green-500 text-green-500 px-4 py-2 mono text-xs hover:bg-green-500/20 transition-all" on:click={closeModal}>CLOSE_TERMINAL</button>
        </div>
      {:else}
        <form method="POST" action="?/contact" use:enhance={() => {
          isSubmitting = true;
          submissionResult = null;
          return async ({ result }) => {
            isSubmitting = false;
            if (result.type === 'success') {
              submissionResult = { success: true };
            } else {
              submissionResult = { success: false, error: result.data?.error || 'Transmission failed.' };
            }
          };
        }}>
          <input type="hidden" name="type" value="contact" />
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block mono text-xs text-mission-orange mb-2" for="contact-name">COORDINATOR_NAME:</label>
              <input 
                type="text" 
                id="contact-name" 
                name="name" 
                required 
                placeholder="John Doe"
                class="w-full bg-blueprint-blue/30 border border-blueprint-blue focus:border-mission-orange text-white px-4 py-3 mono text-sm outline-none transition-all"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label class="block mono text-xs text-mission-orange mb-2" for="contact-email">RETURN_EMAIL_ADDRESS:</label>
              <input 
                type="email" 
                id="contact-email" 
                name="email" 
                required 
                placeholder="user@domain.com"
                class="w-full bg-blueprint-blue/30 border border-blueprint-blue focus:border-mission-orange text-white px-4 py-3 mono text-sm outline-none transition-all"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div class="mb-4">
            <label class="block mono text-xs text-mission-orange mb-2" for="contact-subject">TRANSMISSION_SUBJECT:</label>
            <input 
              type="text" 
              id="contact-subject" 
              name="subject" 
              placeholder="e.g., ESRU Partnership, Brownfield Redevelopment"
              class="w-full bg-blueprint-blue/30 border border-blueprint-blue focus:border-mission-orange text-white px-4 py-3 mono text-sm outline-none transition-all"
              disabled={isSubmitting}
            />
          </div>

          <div class="mb-6">
            <label class="block mono text-xs text-mission-orange mb-2" for="contact-message">TRANSMISSION_BODY:</label>
            <textarea 
              id="contact-message" 
              name="message" 
              required 
              rows="4"
              placeholder="Enter your message here..."
              class="w-full bg-blueprint-blue/30 border border-blueprint-blue focus:border-mission-orange text-white px-4 py-3 mono text-sm outline-none transition-all resize-none"
              disabled={isSubmitting}
            ></textarea>
          </div>

          {#if submissionResult?.error}
            <div class="mono text-red-500 text-xs mb-4">
              >>> ERROR: {submissionResult.error}
            </div>
          {/if}

          <div class="flex justify-end gap-4">
            <button 
              type="button" 
              class="border border-blueprint-blue text-lunar-gray px-4 py-2 mono text-xs hover:bg-blueprint-blue transition-all" 
              on:click={closeModal}
              disabled={isSubmitting}
            >
              ABORT_MISSION
            </button>
            <button 
              type="submit" 
              class="bg-mission-orange text-white px-6 py-2 font-bold uppercase tracking-tighter hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mono text-xs"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT_DATA'}
            </button>
          </div>
        </form>
      {/if}
    </div>
  </div>
{/if}

<style>
  :global(body) {
    background-image: 
      linear-gradient(to right, rgba(27, 38, 59, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(27, 38, 59, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
  }
</style>
