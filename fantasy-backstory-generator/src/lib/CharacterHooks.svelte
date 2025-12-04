<script>
    // export values
    export let selectedRace;
    export let selectedBackground;

    // export values for the text inputs
    export let definingTrait = "";
    export let keyRelationship = "";
    export let significantEvent = "";
    export let majorAlteringEvent = "";
    export let majorConflict = "";
    export let immediateMotivation = "";
    export let childhoodAmbition = "";
    export let significantPossession = "";

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

    // initialize selection to the first item
    selectedRace = races[0];
    selectedBackground = backgrounds[0];
</script>

<form class="character-form" method="post">
    <h3 class="form-title">Character Core & Hooks</h3>

    <!-- Dropdowns -->
    <fieldset class="form-section">
        <legend class="section-title">Character Basics</legend>
        <div class="form-group">
            <label for="select-race">Race:</label>
            <select id="select-race" class="select-input" bind:value={selectedRace}>
                {#each races as race}
                    <option value={race}>{race}</option>
                {/each}
            </select>
        </div>

        <div class="form-group">
            <label for="select-background" class="form-label">Background:</label>
            <select id="select-background" class="select-input" bind:value={selectedBackground}>
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
            <input id="defining-trait" class="text-input" type="text" bind:value={definingTrait} />
        </div>

        <div class="form-group">
            <label for="key-relationship" class="form-label">Key Relationship:</label>
            <input id="key-relationship" class="text-input" type="text" bind:value={keyRelationship} />
        </div>

        <div class="form-group">
            <label for="significant-event" class="form-label">Significant Event:</label>
            <input id="significant-event" class="text-input" type="text" bind:value={significantEvent} />
        </div>

        <div class="form-group">
            <label for="major-altering-event" class="form-label">Major Altering Event:</label>
            <input id="major-altering-event" class="text-input" type="text" bind:value={majorAlteringEvent} />
        </div>

        <div class="form-group">
            <label for="major-conflict" class="form-label">Major Conflict:</label>
            <input id="major-conflict" class="text-input" type="text" bind:value={majorConflict} />
        </div>

        <div class="form-group">
            <label for="immediate-motivation" class="form-label">Immediate Motivation:</label>
            <input id="immediate-motivation" class="text-input" type="text" bind:value={immediateMotivation} />
        </div>

        <div class="form-group">
            <label for="childhood-ambition" class="form-label">Childhood Ambition:</label>
            <input id="childhood-ambition" class="text-input" type="text" bind:value={childhoodAmbition} />
        </div>

        <div class="form-group">
            <label for="significant-possession" class="form-label">Significant Possession:</label>
            <input id="significant-possession" class="text-input" type="text" bind:value={significantPossession} />
        </div>
    </fieldset>

    <!-- Buttons -->
    <div class="button-group">
        <button type="submit" class="btn btn-primary" id="randomize">Randomize All</button>
        <button type="submit" class="btn btn-secondary" id="print-list-format">Print List Format</button>
        <button type="submit" class="btn btn-success" id="generate-full-backstory">Generate Full Backstory</button>
    </div>
</form>