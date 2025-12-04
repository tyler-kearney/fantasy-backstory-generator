<script>
    import { characterData } from '../stores/characterStore.js';

    // full list of race options
    const races = [
        "Human",
        "Elf",
        "Dwarf",
        "Orc",
        "Halfling",
        "Gnome",
        "Tiefling",
        "Dragonborn"
    ];

    const backgrounds = [
        "Noble",
        "Soldier",
        "Merchant",
        "Scholar",
        "Outlander",
        "Criminal",
        "Artisan",
        "Hermit"
    ];
</script>

<form class="character-form" method="post">
    <h3 class="form-title">Character Core & Hooks</h3>

    <!-- Dropdowns -->
    <fieldset class="form-section">
        <legend class="section-title">Character Basics</legend>
        <div class="form-group">
            <label for="select-race">Race:</label>
            <select id="select-race" class="select-input" bind:value={$characterData.race}>
                {#each races as race}
                    <option value={race}>{race}</option>
                {/each}
            </select>
        </div>

        <div class="form-group">
            <label for="select-background" class="form-label">Background:</label>
            <select id="select-background" class="select-input" bind:value={$characterData.background}>
                {#each backgrounds as background}
                    <option value={background}>{background}</option>
                {/each}
            </select>
        </div>
    </fieldset>

    <!-- Text Inputs -->
    <fieldset class="form-section">
        <legend class="section-title">Character Hooks</legend>
        <div class="form-group">
            <label for="defining-trait" class="form-label">Defining Trait:</label>
            <input id="defining-trait" class="text-input" type="text" bind:value={$characterData.definingTrait} />
        </div>

        <div class="form-group">
            <label for="key-relationship" class="form-label">Key Relationship:</label>
            <input id="key-relationship" class="text-input" type="text" bind:value={$characterData.keyRelationship} />
        </div>

        <div class="form-group">
            <label for="significant-event" class="form-label">Significant Event:</label>
            <input id="significant-event" class="text-input" type="text" bind:value={$characterData.significantEvent} />
        </div>

        <div class="form-group">
            <label for="major-altering-event" class="form-label">Major Altering Event:</label>
            <input id="major-altering-event" class="text-input" type="text" bind:value={$characterData.majorAlteringEvent} />
        </div>

        <div class="form-group">
            <label for="major-conflict" class="form-label">Major Conflict:</label>
            <input id="major-conflict" class="text-input" type="text" bind:value={$characterData.majorConflict} />
        </div>

        <div class="form-group">
            <label for="immediate-motivation" class="form-label">Immediate Motivation:</label>
            <input id="immediate-motivation" class="text-input" type="text" bind:value={$characterData.immediateMotivation} />
        </div>

        <div class="form-group">
            <label for="childhood-ambition" class="form-label">Childhood Ambition:</label>
            <input id="childhood-ambition" class="text-input" type="text" bind:value={$characterData.childhoodAmbition} />
        </div>

        <div class="form-group">
            <label for="significant-possession" class="form-label">Significant Possession:</label>
            <input id="significant-possession" class="text-input" type="text" bind:value={$characterData.significantPossession} />
        </div>
    </fieldset>

    <!-- Buttons -->
    <div class="button-group">
        <button type="submit" class="btn btn-primary" id="randomize">Randomize All</button>
        <button type="submit" class="btn btn-secondary" id="print-list-format">Print List Format</button>
        <button type="submit" class="btn btn-success" id="generate-full-backstory">Generate Full Backstory</button>
    </div>
</form>

<style>
    :global(:root) {
        --color-primary: #818cf8;
        --color-primary-dark: #6366f1;
        --color-secondary: #a78bfa;
        --color-success: #34d399;
        --color-surface: #1f2937;
        --color-surface-variant: #111827;
        --color-border: #374151;
        --color-text-primary: #f3f4f6;
        --color-text-secondary: #d1d5db;
        --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
        --radius-sm: 4px;
        --radius-md: 8px;
        --radius-lg: 12px;
        --transition: all 0.2s ease-in-out;
    }

    .character-form {
        display: flex;
        flex-direction: column;
        gap: 24px;
        max-width: 600px;
        margin: 0 auto;
        padding: 32px;
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
    }

    .form-title {
        margin: 0;
        font-size: 28px;
        font-weight: 500;
        color: var(--color-text-primary);
        letter-spacing: -0.5px;
    }

    .form-section {
        display: flex;
        flex-direction: column;
        gap: 16px;
        border: none;
        padding: 0;
        margin: 0;
    }

    .section-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--color-text-primary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0 0 8px 0;
        padding-bottom: 8px;
        border-bottom: 2px solid var(--color-primary);
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .form-label {
        font-size: 14px;
        font-weight: 500;
        color: var(--color-text-primary);
        letter-spacing: 0.25px;
    }

    .select-input,
    .text-input {
        padding: 12px 14px;
        font-size: 14px;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-surface-variant);
        color: var(--color-text-primary);
        transition: var(--transition);
        font-family: inherit;
    }

    .select-input:hover,
    .text-input:hover {
        border-color: var(--color-primary);
        box-shadow: var(--shadow-sm);
    }

    .select-input:focus,
    .text-input:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.2);
    }

    .select-input::placeholder {
        color: var(--color-text-secondary);
    }

    .button-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 8px;
    }

    .btn {
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 600;
        border: none;
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: var(--transition);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: var(--shadow-sm);
    }

    .btn:hover {
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
    }

    .btn:active {
        transform: translateY(0);
        box-shadow: var(--shadow-sm);
    }

    .btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }

    .btn-primary {
        background: var(--color-primary);
        color: #1f2937;
    }

    .btn-primary:hover:not(:disabled) {
        background: var(--color-primary-dark);
        color: white;
    }

    .btn-secondary {
        background: var(--color-secondary);
        color: #1f2937;
    }

    .btn-secondary:hover:not(:disabled) {
        background: #c4b5fd;
        color: #1f2937;
    }

    .btn-success {
        background: var(--color-success);
        color: #1f2937;
    }

    .btn-success:hover:not(:disabled) {
        background: #6ee7b7;
        color: #1f2937;
    }

    /* Responsive design */
    @media (max-width: 640px) {
        .character-form {
            padding: 20px;
            gap: 20px;
        }

        .form-title {
            font-size: 24px;
        }

        .button-group {
            flex-direction: column;
        }

        .btn {
            width: 100%;
        }
    }
</style>