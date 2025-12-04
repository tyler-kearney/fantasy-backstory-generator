import { get, writable } from 'svelte/store';
import { pipeline } from '@huggingface/transformers';

// Define the store state
export const llmStatus = writable({
    status: 'initial',
    progress: 0,
    text: ''
});

let generator = null; // Pipeline instance will be stored here

// Will use a small, fast model for in-browser inference

const modelName = 'Xenova/distilgpt2';
const task = 'text-generation';

// Initialization function

async function initializeLLM() {
    llmStatus.set({ status: 'loading', progress: 0, text: 'Starting initialization...' });

    try {
        generator = await pipeline(task, modelName);

        llmStatus.set({ status: 'ready', progress: 1, text: 'Ready' });
    }  catch (error) {
        console.error('Error initializing LLM:', error);
        llmStatus.set({ status: 'error', progress: 0, text: 'Error during initialization' });
    }
}

// Function to generate text
/*
@param {Object} characterData - The character data for backstory generation
*/
export async function generateBackstory(characterData) {
    if (get(llmStatus).status !== 'ready' || !generator) {
        console.error('LLM is not ready');
        llmStatus.update(state => ({
            ...state,
            text: 'Not ready yet, please wait...'
        }));
        return;
    }

    llmStatus.update(state => ({
        ...state,
        status: 'generating',
        text: 'Generating backstory...'
    }));

    const prompt = `Create a compelling, 3 paragraph fantasy backstory appropriate for 
    a tabletop RPG such as D&D or Pathfinder based on the following character details:
    Race: ${characterData.race}
    Background: ${characterData.background}
    Defining Trait: ${characterData.definingTrait}
    Key Relationship: ${characterData.keyRelationship}
    Significant Event: ${characterData.significantEvent}
    Major Altering Event: ${characterData.majorAlteringEvent}
    Major Conflict: ${characterData.majorConflict}
    Immediate Motivation: ${characterData.immediateMotivation}
    Childhood Ambition: ${characterData.childhoodAmbition}
    Significant Possession: ${characterData.significantPossession}
    Backstory:`; // Ending with a blank Backstory: promot to steer the model
    
    try {
        const output = await generator(prompt, {
            max_new_tokens: 256, // Limit output length
            temperature: 0.8, // Creativity in generation
            do_sample: true, // Required if temperature > 0
            return_full_text: false // Only return generated text
        });

        const generatedText = output[0]?.generated_text || 'No backstory generated.';

        llmStatus.update(state => ({
            status: 'ready',
            progress: 2,
            text: generatedText
        }));
    } catch (error) {
        console.error('Error during text generation:', error);
        llmStatus.update(state => ({
            status: 'error',
            progress: 0,
            text: 'Error during text generation'
        }));
    }
}

// Start the loading process immediately
initializeLLM();