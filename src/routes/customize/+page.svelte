<script lang="ts">
	import {
		applyPresetTheme,
		applyTheme,
		defaultTheme,
		loadTheme,
		resetTheme,
		saveTheme,
		themePresets,
		type ThemePreset,
		type ThemeSettings
	} from '$lib/theme/theme';

	let theme: ThemeSettings = loadTheme();

	function updateTheme() {
		saveTheme(theme);
		applyTheme(theme);

		window.dispatchEvent(
			new CustomEvent('tecspa-theme-change', {
				detail: theme
			})
		);
	}

	function selectPreset(preset: ThemePreset) {
		theme = { ...preset.theme };
applyPresetTheme(preset.id);
	}

	function isActivePreset(preset: ThemePreset) {
		return (
			preset.theme.background === theme.background &&
			preset.theme.accent === theme.accent &&
			preset.theme.surface === theme.surface
		);
	}

	function resetAll() {
		resetTheme();
		theme = { ...defaultTheme };
	}
</script>

<svelte:head>
	<title>customize · TECSPA™</title>
	<meta
		name="description"
		content="Customize the appearance of TECSPA™"
	/>
</svelte:head>

<div class="background">
	<main class="customize-page">
		<nav class="top-navigation" aria-label="Customize navigation">
			<a href="/" class="back-link">← back home</a>

			<span class="nav-divider">✦</span>

			<a href="/members" class="back-link">members</a>
		</nav>

		<header class="page-header">
			<div class="ornament" aria-hidden="true">
				<span>୨୧</span>
				<span>✦</span>
				<span>୨୧</span>
			</div>

			<p class="eyebrow">TECSPA™ · appearance</p>

			<h1>customize</h1>

			<p class="subtitle">
				make this little place yours.
			</p>
		</header>

		<div class="divider" aria-hidden="true">
			<span>✦</span>
			<span>·</span>
			<span>✦</span>
		</div>

		<section class="customization-section">
			<div class="section-heading">
				<p class="section-number">01</p>

				<div>
					<h2>presets</h2>

					<p>
						Start with a complete visual atmosphere, then customize it
						further below.
					</p>
				</div>
			</div>

			<div class="preset-grid">
				{#each themePresets as preset}
					<button
						type="button"
						class:active={isActivePreset(preset)}
						class="preset-card"
						style={`
							--preview-background: ${preset.theme.background};
							--preview-surface: ${preset.theme.surface};
							--preview-accent: ${preset.theme.accent};
							--preview-dark: ${preset.theme.accentDark};
							--preview-border: ${preset.theme.border};
						`}
						onclick={() => selectPreset(preset)}
					>
						<div class="preset-preview" aria-hidden="true">
							<div class="preview-window">
								<div class="preview-top">
									<span>{preset.theme.symbols[0]}</span>
									<span>TECSPA™</span>
								</div>

								<div class="preview-body">
									<div class="preview-line preview-line-long"></div>
									<div class="preview-line"></div>

									<div class="preview-boxes">
										<span></span>
										<span></span>
										<span></span>
									</div>
								</div>
							</div>
						</div>

						<div class="preset-info">
							<div class="preset-title-row">
								<h3>{preset.name}</h3>

								{#if isActivePreset(preset)}
									<span class="active-label">active</span>
								{/if}
							</div>

							<p>{preset.description}</p>
						</div>
					</button>
				{/each}
			</div>
		</section>

		<section class="customization-section">
			<div class="section-heading">
				<p class="section-number">02</p>

				<div>
					<h2>colors</h2>

					<p>
						Choose the colors that define your TECSPA.
					</p>
				</div>
			</div>

			<div class="controls">
				<label class="color-control">
					<span>background</span>

					<div class="color-input">
						<input
							type="color"
							bind:value={theme.background}
							onchange={updateTheme}
						/>

						<code>{theme.background}</code>
					</div>
				</label>

				<label class="color-control">
					<span>main panel</span>

					<div class="color-input">
						<input
							type="color"
							bind:value={theme.surface}
							onchange={updateTheme}
						/>

						<code>{theme.surface}</code>
					</div>
				</label>

				<label class="color-control">
					<span>panel alternate</span>

					<div class="color-input">
						<input
							type="color"
							bind:value={theme.surfaceAlt}
							onchange={updateTheme}
						/>

						<code>{theme.surfaceAlt}</code>
					</div>
				</label>

				<label class="color-control">
					<span>accent</span>

					<div class="color-input">
						<input
							type="color"
							bind:value={theme.accent}
							onchange={updateTheme}
						/>

						<code>{theme.accent}</code>
					</div>
				</label>

				<label class="color-control">
					<span>dark accent</span>

					<div class="color-input">
						<input
							type="color"
							bind:value={theme.accentDark}
							onchange={updateTheme}
						/>

						<code>{theme.accentDark}</code>
					</div>
				</label>

				<label class="color-control">
					<span>text</span>

					<div class="color-input">
						<input
							type="color"
							bind:value={theme.text}
							onchange={updateTheme}
						/>

						<code>{theme.text}</code>
					</div>
				</label>

				<label class="color-control">
					<span>muted text</span>

					<div class="color-input">
						<input
							type="color"
							bind:value={theme.textMuted}
							onchange={updateTheme}
						/>

						<code>{theme.textMuted}</code>
					</div>
				</label>

				<label class="color-control">
					<span>borders</span>

					<div class="color-input">
						<input
							type="color"
							bind:value={theme.border}
							onchange={updateTheme}
						/>

						<code>{theme.border}</code>
					</div>
				</label>
			</div>
		</section>

		<section class="customization-section">
			<div class="section-heading">
				<p class="section-number">03</p>

				<div>
					<h2>typography</h2>

					<p>
						Decide how TECSPA speaks visually.
					</p>
				</div>
			</div>

			<div class="controls">
				<label class="text-control">
					<span>heading font</span>

					<select
						bind:value={theme.headingFont}
						onchange={updateTheme}
					>
						<option value='Georgia, "Times New Roman", serif'>
							Georgia
						</option>

						<option value='"Times New Roman", Times, serif'>
							Times New Roman
						</option>

						<option value="Garamond, Georgia, serif">
							Garamond
						</option>

						<option value='"Courier New", Courier, monospace'>
							Courier New
						</option>

						<option value="Arial, Helvetica, sans-serif">
							Arial
						</option>

						<option value='"Trebuchet MS", Arial, sans-serif'>
							Trebuchet MS
						</option>
					</select>
				</label>

				<label class="text-control">
					<span>body font</span>

					<select
						bind:value={theme.bodyFont}
						onchange={updateTheme}
					>
						<option value='Georgia, "Times New Roman", serif'>
							Georgia
						</option>

						<option value='"Times New Roman", Times, serif'>
							Times New Roman
						</option>

						<option value='"Courier New", Courier, monospace'>
							Courier New
						</option>

						<option value="Arial, Helvetica, sans-serif">
							Arial
						</option>

						<option value='"Trebuchet MS", Arial, sans-serif'>
							Trebuchet MS
						</option>
					</select>
				</label>
			</div>
		</section>

		<section class="customization-section">
			<div class="section-heading">
				<p class="section-number">04</p>

				<div>
					<h2>layout</h2>

					<p>
						Adjust the shape and presence of the interface.
					</p>
				</div>
			</div>

			<div class="controls">
				<label class="text-control">
					<span>panel width</span>

					<select
						bind:value={theme.panelWidth}
						onchange={updateTheme}
					>
						<option value="900px">narrow</option>
						<option value="1100px">comfortable</option>
						<option value="1300px">wide</option>
						<option value="1500px">very wide</option>
					</select>
				</label>

				<label class="text-control">
					<span>corner style</span>

					<select
						bind:value={theme.panelRadius}
						onchange={updateTheme}
					>
						<option value="0px">sharp</option>
						<option value="2px">subtle</option>
						<option value="4px">light</option>
						<option value="8px">soft</option>
						<option value="18px">rounded</option>
					</select>
				</label>

				<label class="text-control">
					<span>ornament opacity</span>

					<select
						bind:value={theme.ornamentOpacity}
						onchange={updateTheme}
					>
						<option value="0.35">very subtle</option>
						<option value="0.5">subtle</option>
						<option value="0.65">medium</option>
						<option value="0.8">strong</option>
						<option value="0.9">very strong</option>
					</select>
				</label>

				<label class="text-control">
					<span>texture opacity</span>

					<select
						bind:value={theme.textureOpacity}
						onchange={updateTheme}
					>
						<option value="0">none</option>
						<option value="0.05">very subtle</option>
						<option value="0.08">subtle</option>
						<option value="0.12">medium</option>
						<option value="0.18">strong</option>
						<option value="0.2">very strong</option>
					</select>
				</label>
			</div>
		</section>

		<div class="actions">
			<button
				class="reset-button"
				type="button"
				onclick={resetAll}
			>
				reset to default
			</button>
		</div>

		<div class="divider" aria-hidden="true">
			<span>✦</span>
			<span>·</span>
			<span>✦</span>
		</div>

		<footer>
			<p>TECSPA™ · make it yours</p>
		</footer>
	</main>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		background: var(--tecspa-background);
		color: var(--tecspa-text);
		font-family: var(--tecspa-body-font);
		transition:
			background 0.25s ease,
			color 0.25s ease;
	}

	.background {
		min-height: 100vh;
		padding: 40px 20px 80px;

		background:
			radial-gradient(
				circle at 15% 20%,
				color-mix(
					in srgb,
					var(--tecspa-accent) 8%,
					transparent
				),
				transparent 30%
			),
			radial-gradient(
				circle at 85% 70%,
				color-mix(
					in srgb,
					var(--tecspa-accent) 6%,
					transparent
				),
				transparent 35%
			),
			var(--tecspa-background);
	}

	.customize-page {
		width: min(
			var(--tecspa-panel-width),
			100%
		);

		margin: 0 auto;

		background: var(--tecspa-surface);

		border:
			1px solid
			var(--tecspa-border);

		border-radius:
			var(--tecspa-panel-radius);

		box-shadow:
			var(--tecspa-panel-shadow);

		padding: 48px;
	}

	.top-navigation {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-bottom: 50px;
	}

	.back-link {
		color: var(--tecspa-accent-dark);
		text-decoration: none;

		font-size: 0.85rem;
		letter-spacing: 0.08em;
		text-transform: lowercase;
	}

	.back-link:hover {
		text-decoration: underline;
	}

	.nav-divider {
		color: var(--tecspa-accent);
	}

	.page-header {
		text-align: center;
	}

	.ornament {
		display: flex;
		justify-content: center;
		gap: 18px;

		margin-bottom: 20px;

		color: var(--tecspa-accent);

		opacity:
			var(--tecspa-ornament-opacity);
	}

	.eyebrow {
		margin: 0 0 8px;

		color: var(--tecspa-text-muted);

		font-size: 0.72rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
	}

	h1 {
		margin: 0;

		color: var(--tecspa-accent-dark);

		font-family: var(--tecspa-heading-font);

		font-size: clamp(3rem, 7vw, 5rem);

		font-style: italic;
		font-weight: 400;
	}

	.subtitle {
		margin-top: 12px;

		color: var(--tecspa-text-muted);

		font-style: italic;
	}

	.divider {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16px;

		margin: 45px 0;

		color: var(--tecspa-accent);
	}

	.customization-section {
		margin-bottom: 55px;
	}

	.section-heading {
		display: flex;
		gap: 20px;

		align-items: flex-start;

		margin-bottom: 25px;
	}

	.section-number {
		margin: 4px 0 0;

		color: var(--tecspa-accent);

		font-size: 0.75rem;
		letter-spacing: 0.15em;
	}

	h2 {
		margin: 0;

		color: var(--tecspa-accent-dark);

		font-family: var(--tecspa-heading-font);

		font-size: 2rem;
		font-style: italic;
		font-weight: 400;
	}

	.section-heading p {
		margin: 7px 0 0;

		color: var(--tecspa-text-muted);

		font-size: 0.9rem;
	}

	.preset-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 18px;
	}

	.preset-card {
		display: grid;
		grid-template-columns: 150px 1fr;
		gap: 18px;

		width: 100%;
		padding: 0;

		overflow: hidden;

		border:
			1px solid
			var(--tecspa-border);

		background: var(--tecspa-surface-alt);
		color: var(--tecspa-text);

		text-align: left;
		font-family: inherit;

		cursor: pointer;

		transition:
			transform 0.18s ease,
			border-color 0.18s ease,
			box-shadow 0.18s ease;
	}

	.preset-card:hover {
		transform: translateY(-2px);

		border-color:
			var(--preview-accent);

		box-shadow:
			0 10px 28px
			color-mix(
				in srgb,
				var(--preview-accent) 16%,
				transparent
			);
	}

	.preset-card.active {
		border-color:
			var(--preview-accent);

		box-shadow:
			inset 0 0 0 1px
			var(--preview-accent);
	}

	.preset-preview {
		min-height: 145px;
		padding: 13px;

		background:
			var(--preview-background);

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.preview-window {
		width: 100%;
		height: 112px;

		overflow: hidden;

		border:
			1px solid
			var(--preview-border);

		background:
			var(--preview-surface);

		box-shadow:
			0 8px 18px
			color-mix(
				in srgb,
				var(--preview-dark) 20%,
				transparent
			);
	}

	.preview-top {
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 7px 8px;

		background:
			var(--preview-dark);

		color:
			var(--preview-surface);

		font-family:
			Georgia,
			serif;

		font-size: 0.55rem;
		letter-spacing: 0.08em;
	}

	.preview-body {
		padding: 12px;
	}

	.preview-line {
		width: 62%;
		height: 4px;
		margin-bottom: 6px;

		background:
			var(--preview-accent);

		opacity: 0.75;
	}

	.preview-line-long {
		width: 82%;
	}

	.preview-boxes {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 5px;

		margin-top: 14px;
	}

	.preview-boxes span {
		display: block;
		height: 30px;

		border:
			1px solid
			var(--preview-border);

		background:
			var(--preview-background);
	}

	.preset-info {
		padding: 18px 18px 18px 0;
	}

	.preset-title-row {
		display: flex;
		align-items: center;
		gap: 9px;
	}

	.preset-info h3 {
		margin: 0;

		color: var(--tecspa-accent-dark);

		font-family: var(--tecspa-heading-font);
		font-size: 1.1rem;
		font-weight: 500;
	}

	.preset-info p {
		margin: 8px 0 0;

		color: var(--tecspa-text-muted);

		font-size: 0.78rem;
		line-height: 1.5;
	}

	.active-label {
		padding: 3px 7px;

		border:
			1px solid
			var(--preview-border);

		color:
			var(--preview-dark);

		font-size: 0.6rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.controls {
		display: grid;
		grid-template-columns:
			repeat(2, minmax(0, 1fr));

		gap: 14px;
	}

	.color-control,
	.text-control {
		display: flex;
		align-items: center;
		justify-content: space-between;

		gap: 20px;

		padding: 16px 18px;

		background:
			var(--tecspa-surface-alt);

		border:
			1px solid
			var(--tecspa-border);
	}

	.color-control > span,
	.text-control > span {
		font-size: 0.85rem;
	}

	.color-input {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	input[type="color"] {
		width: 38px;
		height: 30px;

		padding: 0;

		border: none;

		background: transparent;

		cursor: pointer;
	}

	code {
		color: var(--tecspa-text-muted);

		font-size: 0.75rem;
	}

	select {
		max-width: 60%;

		padding: 7px 10px;

		border:
			1px solid
			var(--tecspa-border);

		background:
			var(--tecspa-surface);

		color:
			var(--tecspa-text);

		font-family: inherit;

		cursor: pointer;
	}

	.actions {
		display: flex;
		justify-content: center;

		margin-top: 20px;
	}

	.reset-button {
		padding: 12px 22px;

		border:
			1px solid
			var(--tecspa-border);

		background:
			var(--tecspa-surface-alt);

		color:
			var(--tecspa-accent-dark);

		font-family: inherit;

		cursor: pointer;

		transition:
			background 0.2s ease,
			border-color 0.2s ease;
	}

	.reset-button:hover {
		background:
			var(--tecspa-surface);

		border-color:
			var(--tecspa-accent);
	}

	footer {
		text-align: center;

		color: var(--tecspa-text-muted);

		font-size: 0.75rem;
		letter-spacing: 0.08em;
	}

	@media (max-width: 900px) {
		.preset-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 700px) {
		.customize-page {
			padding: 30px 20px;
		}

		.controls {
			grid-template-columns: 1fr;
		}

		.preset-card {
			grid-template-columns: 120px 1fr;
		}
	}

	@media (max-width: 520px) {
		.top-navigation {
			margin-bottom: 35px;
		}

		.preset-card {
			grid-template-columns: 1fr;
		}

		.preset-preview {
			min-height: 125px;
		}

		.preset-info {
			padding: 0 18px 18px;
		}

		.color-control,
		.text-control {
			align-items: flex-start;
			flex-direction: column;
		}

		select {
			max-width: 100%;
			width: 100%;
		}
	}
</style>
