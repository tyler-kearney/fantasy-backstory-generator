<script>
    import { llmStatus } from "../stores/llmStore.js";

    // Click handler for the export button
    function exportBackstory() {
        const textToExport = $llmStatus.text;

        if (!textToExport || $llmStatus.status === 'initial' || $llmStatus.status === 'loading') {
            alert("Please generate a backstory before exporting.");
            return;
        }

        // Creating a blob with the text content
        const blob = new Blob([textToExport], { type: 'text/plain' });

        // Creating a temporary link to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'character_backstory.txt';

        // Appending to the body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Revoke blob URL to free memory
        URL.revokeObjectURL(link.href);
    }
</script>

<div class="output-pane">
    <h3 class="output-title">Generated Backstory</h3>
    <div class="output-content">
        {#if $llmStatus.status === 'initial'}
            <p class="placeholder-text">Your generated backstory will appear here.</p>
        {:else if $llmStatus.status === 'loading'}
            <p class="loading-text">Generating backstory, please wait...</p>
        {:else if $llmStatus.status === 'error'}
            <p class="error-text">An error occurred while generating the backstory. Please try again.</p>
        {:else}
            <pre class="backstory-text">{$llmStatus.text}</pre>
        {/if}
    </div>

    <div class="status-bar">
        Status: 
        <span class="status-indicator status-{$llmStatus.status}">{$llmStatus.status}</span>
    </div>
    <button class="export-button" on:click={exportBackstory} disabled={$llmStatus.status !== 'success'}>
        Export Backstory
    </button>
</div>

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

    .output-pane {
        display: flex;
        flex-direction: column;
        gap: 16px;
        max-width: 600px;
        margin: 0 auto;
        padding: 32px;
        background: var(--color-surface);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
    }

    .output-title {
        margin: 0;
        font-size: 28px;
        font-weight: 500;
        color: var(--color-text-primary);
        letter-spacing: -0.5px;
    }

    .output-content {
        display: flex;
        flex-direction: column;
        min-height: 200px;
        padding: 16px;
        background: var(--color-surface-variant);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        overflow-y: auto;
        max-height: 400px;
    }

    .placeholder-text,
    .loading-text,
    .error-text,
    .backstory-text {
        margin: 0;
        font-size: 14px;
        line-height: 1.6;
        color: var(--color-text-primary);
    }

    .placeholder-text {
        color: var(--color-text-secondary);
        font-style: italic;
    }

    .loading-text {
        color: var(--color-primary);
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .error-text {
        color: #f87171;
    }

    .backstory-text {
        font-family: 'Courier New', monospace;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.7;
        }
    }

    .export-button {
        padding: 12px 20px;
        font-size: 14px;
        font-weight: 600;
        border: none;
        border-radius: var(--radius-md);
        background: var(--color-success);
        color: #1f2937;
        cursor: pointer;
        transition: var(--transition);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: var(--shadow-sm);
    }

    .export-button:hover:not(:disabled) {
        background: #6ee7b7;
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
    }

    .export-button:active:not(:disabled) {
        transform: translateY(0);
        box-shadow: var(--shadow-sm);
    }

    .export-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }

    /* Status Bar */
    .status-bar {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        background: var(--color-surface-variant);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        font-size: 14px;
        font-weight: 500;
        color: var(--color-text-primary);
    }

    .status-indicator {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 4px 12px;
        border-radius: var(--radius-sm);
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .status-initial {
        background: var(--color-text-secondary);
        color: var(--color-surface-variant);
    }

    .status-loading {
        background: var(--color-primary);
        color: white;
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .status-success {
        background: var(--color-success);
        color: var(--color-surface-variant);
    }

    .status-error {
        background: #f87171;
        color: white;
    }

    /* Scrollbar styling */
    .output-content::-webkit-scrollbar {
        width: 8px;
    }

    .output-content::-webkit-scrollbar-track {
        background: var(--color-surface-variant);
        border-radius: var(--radius-md);
    }

    .output-content::-webkit-scrollbar-thumb {
        background: var(--color-border);
        border-radius: var(--radius-md);
    }

    .output-content::-webkit-scrollbar-thumb:hover {
        background: var(--color-primary);
    }

    /* Responsive design */
    @media (max-width: 640px) {
        .output-pane {
            padding: 20px;
            gap: 12px;
        }

        .output-title {
            font-size: 24px;
        }

        .output-content {
            min-height: 150px;
            max-height: 300px;
        }

        .export-button {
            width: 100%;
        }
    }
</style>