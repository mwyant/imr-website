<script>
  import { onMount } from 'svelte';

  const sequences = [
    { id: '01', title: 'Repurpose', desc: 'Identifying inherent value in decommissioned industrial components.' },
    { id: '02', title: 'Recovery', desc: 'Diverting structural payloads from the waste stream.' },
    { id: '03', title: 'Deployment', desc: 'Rebuilding community resilience through equitable redistribution.' }
  ];

  const deployments = [
    { id: 'IMR-1', name: 'RE-ENERGIZE', status: 'PHASE 1: PROOF OF TECH', desc: 'Reclaiming surplus industrial PV systems for LMI energy resilience.' },
    { id: 'IMR-2', name: 'UNDO DEPOT', status: 'PHASE 2: LOGISTICS SETUP', desc: 'A regional hub for In-Situ Resource Utilization (ISRU) of structural materials.' }
  ];

  let canvas;
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
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.targetX = Math.random() * width;
        this.targetY = Math.random() * height;
        this.cp1x = Math.random() * width;
        this.cp1y = Math.random() * height;
        this.cp2x = Math.random() * width;
        this.cp2y = Math.random() * height;
        this.progress = 0;
        this.speed = 0.001 + Math.random() * 0.002;
        this.opacity = 0.1 + Math.random() * 0.3;
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.cp1x, this.cp1y, this.cp2x, this.cp2y, this.targetX, this.targetY);
        ctx.strokeStyle = `rgba(27, 38, 59, ${this.opacity * (1 - Math.abs(this.progress - 0.5) * 2)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        this.progress += this.speed;
        if (this.progress > 1) this.reset();
      }
    }

    for (let i = 0; i < 15; i++) {
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

<canvas bind:this={canvas} class="fixed inset-0 pointer-events-none z-0 opacity-50"></canvas>

<main class="min-h-screen flex flex-col relative z-10">
  <!-- Header / Nav -->
  <header class="p-6 border-b border-blueprint-blue flex justify-between items-center">
    <div class="mono text-mission-orange font-bold text-xl">IMR_SYSTEMS_v2.0</div>
    <div class="status-indicator">[STATUS: OPERATIONAL]</div>
  </header>

  <!-- Hero Section -->
  <section class="flex-grow flex flex-col justify-center items-center text-center p-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blueprint-blue/20 to-transparent">
    <div class="mono text-mission-orange mb-4 tracking-[0.2em]">[MISSION: INTEGRATED MATERIALS REUSE]</div>
    <h1 class="text-5xl md:text-7xl mb-6 max-w-4xl leading-tight">
      Giving Building Materials a <span class="text-mission-orange">Second Act.</span>
    </h1>
    <p class="text-xl md:text-2xl text-lunar-gray/80 max-w-2xl mb-10">
      IMR transforms industrial waste into community infrastructure through advanced reverse logistics and stewardship.
    </p>
    <div class="flex gap-4">
      <button class="btn-mission">View Mission Objectives</button>
      <button class="border border-lunar-gray text-lunar-gray px-6 py-3 uppercase font-bold hover:bg-lunar-gray hover:text-deep-space transition-all">Contact Mission Control</button>
    </div>
  </section>

  <!-- Mission Objective -->
  <section class="p-10 md:p-20 border-y border-blueprint-blue bg-blueprint-blue/10">
    <div class="max-w-4xl mx-auto">
      <div class="mono text-xs text-blueprint-blue mb-2">// UNIVERSAL_LAW_OF_MATERIAL_PERSISTENCE</div>
      <h2 class="text-3xl mb-6">Objective</h2>
      <p class="text-2xl leading-relaxed italic">
        "In a closed system, nothing is waste—only matter in the wrong coordinates. IMR provides the trajectory to return that matter to productive use."
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

  <!-- Active Deployments -->
  <section class="p-10 md:p-20 bg-blueprint-blue/5">
    <h2 class="text-3xl mb-12">Active Deployments</h2>
    <div class="space-y-8">
      {#each deployments as dep}
        <div class="border-blueprint p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div class="flex items-center gap-4 mb-2">
              <span class="mono text-mission-orange font-bold text-lg">{dep.id}</span>
              <span class="status-indicator">{dep.status}</span>
            </div>
            <h3 class="text-2xl mb-2">[{dep.name}]</h3>
            <p class="text-lunar-gray/70 max-w-xl">{dep.desc}</p>
          </div>
          <button class="border border-blueprint-blue px-4 py-2 mono text-xs hover:bg-blueprint-blue transition-all">ACCESS_DATA_STREAM</button>
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
        <p class="text-sm text-lunar-gray/50 mt-2">[501(c)(3) PENDING]</p>
      </div>
      <div>
        <div class="mono text-mission-orange mb-4">COORDINATES</div>
        <p>Serving the I-90 Corridor</p>
        <p>Contiguous NYS Counties</p>
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

<style>
  :global(body) {
    background-image: 
      linear-gradient(to right, rgba(27, 38, 59, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(27, 38, 59, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
  }
</style>
