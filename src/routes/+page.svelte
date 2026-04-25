<script>
  import { onMount } from 'svelte';

  const sequences = [
    { id: '01', title: 'Rebuild', desc: 'Partnering with municipalities and demolition teams to capture industrial-grade materials—steel, timber, and stone—before they leave the ecosystem.' },
    { id: '02', title: 'Reuse', desc: 'Architecting a construction-based Barter Economy. Facilitating local exchanges to ensure materials reach those who need them most.' },
    { id: '03', title: 'Repurpose', desc: 'Giving a second life to complex systems. Reclaiming PV panels and wind hardware to power the next generation of infrastructure.' }
  ];

  const trajectory = [
    { id: 'I-90', name: 'THE ELECTRIC CORRIDOR', status: 'VISION: REGIONAL IMPACT', desc: 'A self-sustaining transportation artery running from the NY corridor through Maine, powered by reclaimed energy.' },
    { id: 'HUB-1', name: 'BROWNFIELD RENEWAL', status: 'PHASE 1: SITE SELECTION', desc: 'Transforming underutilized industrial sites into high-capacity charging hubs using repurposed solar arrays.' }
  ];
</script>

<canvas bind:this={canvas} class="fixed inset-0 pointer-events-none z-0 opacity-50"></canvas>

<main class="min-h-screen flex flex-col relative z-10">
  <!-- Header / Nav -->
  <header class="p-6 border-b border-blueprint-blue flex justify-between items-center">
    <div class="mono text-mission-orange font-bold text-xl">IMR_SYSTEMS_v2.1</div>
    <div class="status-indicator">[STATUS: MISSION_ACTIVE]</div>
  </header>

  <!-- Hero Section -->
  <section class="flex-grow flex flex-col justify-center items-center text-center p-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blueprint-blue/20 to-transparent">
    <div class="mono text-mission-orange mb-4 tracking-[0.2em]">[NON-PROFIT MISSION: REBUILD_REUSE_REPURPOSE]</div>
    <h1 class="text-5xl md:text-7xl mb-6 max-w-5xl leading-tight">
      Waste is just matter at the <span class="text-mission-orange">wrong coordinates.</span>
    </h1>
    <p class="text-xl md:text-2xl text-lunar-gray/80 max-w-3xl mb-10">
      IMR is a non-profit engine architecting a localized barter economy for construction materials and a solar-powered transportation future.
    </p>
    <div class="flex gap-4">
      <button class="btn-mission">Join the Mission</button>
      <button class="border border-lunar-gray text-lunar-gray px-6 py-3 uppercase font-bold hover:bg-lunar-gray hover:text-deep-space transition-all">Contact Mission Control</button>
    </div>
  </section>

  <!-- Mission Objective -->
  <section class="p-10 md:p-20 border-y border-blueprint-blue bg-blueprint-blue/10">
    <div class="max-w-4xl mx-auto">
      <div class="mono text-xs text-blueprint-blue mb-2">// MISSION_OBJECTIVE</div>
      <h2 class="text-3xl mb-6">Sustainability shouldn't be a luxury—it should be a stockpile.</h2>
      <p class="text-2xl leading-relaxed italic">
        "Our mission is to democratize access to 'non-precious' materials. We facilitate the exchange of materials the market has forgotten, turning potential waste into community resilience."
      </p>
    </div>
  </section>

  <!-- Operational Sequences -->
  <section class="p-10 md:p-20">
    <h2 class="text-3xl mb-12 text-center">The New Trinity</h2>
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
          <button class="border border-blueprint-blue px-4 py-2 mono text-xs hover:bg-blueprint-blue transition-all">VIEW_TRAJECTORY_DATA</button>
        </div>
      {/each}
    </div>
  </section>

  <!-- Mission Objective -->
  <section class="p-10 md:p-20 border-y border-blueprint-blue bg-blueprint-blue/10">
    <div class="max-w-4xl mx-auto">
      <div class="mono text-xs text-blueprint-blue mb-2">// UNIVERSAL_LAW_OF_MATERIAL_PERSISTENCE</div>
      <h2 class="text-3xl mb-6">Objective</h2>
      <p class="text-2xl leading-relaxed italic">
        "Waste is matter at the wrong coordinates. IMR provides the trajectory to return industrial payloads to productive use."
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
