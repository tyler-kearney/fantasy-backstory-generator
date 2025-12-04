import { pipeline } from '@huggingface/transformers';
import { get } from 'svelte/store';
import { characterData } from '../stores/characterStore.js';

let textPipeline = null;

// Initialize the transformer pipeline for text generation
async function initializeTextTransformer() {
    try {
        textPipeline = await pipeline('text2text-generation', 'Xenova/flan-t5-small');
    } catch (error) {
        console.error('Error initializing text transformer:', error);
    }
}

// Common trait options for random generation
const traitOptions = [
    'Ambitious', 'Cautious', 'Charismatic', 'Clever', 'Compassionate',
    'Confident', 'Curious', 'Determined', 'Diplomatic', 'Fierce',
    'Generous', 'Humble', 'Idealistic', 'Impulsive', 'Introspective',
    'Loyal', 'Mysterious', 'Optimistic', 'Passionate', 'Pragmatic',
    'Quick-witted', 'Rebellious', 'Reckless', 'Resourceful', 'Shrewd',
    'Stubborn', 'Supportive', 'Suspicious', 'Tactical', 'Thoughtful'
];

const relationshipOptions = [
    'A childhood friend who betrayed me',
    'A mentor who shaped my path',
    'A lost sibling I still search for',
    'A rival who pushes me forward',
    'A family member I owe everything to',
    'A mysterious stranger who saved my life',
    'A former lover I cannot forget',
    'A trusted companion in adventure',
    'An enemy I must one day face',
    'A guide who showed me the truth'
];

const eventOptions = [
    'A great battle that changed everything',
    'A betrayal that shattered trust',
    'A miracle I witnessed firsthand',
    'A catastrophe that took everything',
    'A discovery that altered my understanding',
    'A ritual I participated in',
    'A performance that earned fame',
    'A failure that taught me resilience',
    'An encounter with something supernatural',
    'A decision that defined my character'
];

const motivationOptions = [
    'Seek redemption for past mistakes',
    'Protect those I love',
    'Uncover a hidden truth',
    'Gain power and influence',
    'Prove my worth to others',
    'Escape my dark past',
    'Help the downtrodden',
    'Achieve legendary status',
    'Find a place to belong',
    'Answer a mysterious calling',
    'Avenge a great wrong',
    'Explore the unknown'
];

const possessionOptions = [
    'An ancient ring with strange markings',
    'A worn journal from a mysterious author',
    'A weapon passed down through generations',
    'A locket containing a secret',
    'A map to a legendary place',
    'A musical instrument of great value',
    'A token of remembrance',
    'An enchanted artifact',
    'A keepsake from my past',
    'A mysterious key'
];

/**
 * Get a random element from an array
 */
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Randomize all character fields
 */
export function randomizeAllFields() {
    const races = ['Human', 'Elf', 'Dwarf', 'Orc', 'Halfling', 'Gnome', 'Tiefling', 'Dragonborn'];
    const backgrounds = ['Noble', 'Soldier', 'Merchant', 'Scholar', 'Outlander', 'Criminal', 'Artisan', 'Hermit'];

    characterData.update(data => ({
        ...data,
        race: getRandomElement(races),
        background: getRandomElement(backgrounds),
        definingTrait: getRandomElement(traitOptions),
        keyRelationship: getRandomElement(relationshipOptions),
        significantEvent: getRandomElement(eventOptions),
        majorAlteringEvent: getRandomElement(eventOptions),
        majorConflict: getRandomElement(motivationOptions),
        immediateMotivation: getRandomElement(motivationOptions),
        childhoodAmbition: getRandomElement(motivationOptions),
        significantPossession: getRandomElement(possessionOptions)
    }));
}

/**
 * Generate random text field using transformer
 * Falls back to random selection if transformer is not available
 */
export async function generateRandomTextField(fieldType) {
    if (!textPipeline) {
        await initializeTextTransformer();
    }

    const prompts = {
        trait: 'Generate a single character trait that describes a fantasy character:',
        relationship: 'Generate a brief description of a significant relationship:',
        event: 'Generate a description of a significant event in a fantasy setting:',
        motivation: 'Generate a character motivation or goal:'
    };

    try {
        if (textPipeline) {
            const result = await textPipeline(prompts[fieldType] || prompts.trait, {
                max_length: 20
            });
            return result[0].generated_text.split('\n')[0];
        }
    } catch (error) {
        console.error('Error generating text:', error);
    }

    // Fallback to random selection
    const optionsMap = {
        trait: traitOptions,
        relationship: relationshipOptions,
        event: eventOptions,
        motivation: motivationOptions,
        possession: possessionOptions
    };

    return getRandomElement(optionsMap[fieldType] || traitOptions);
}

/**
 * Format character data for list display
 */
export function formatCharacterAsListFormat() {
    const data = get(characterData);

    return `Character Sheet
================
Race: ${data.race}
Background: ${data.background}
Defining Trait: ${data.definingTrait}
Key Relationship: ${data.keyRelationship}
Significant Event: ${data.significantEvent}
Major Altering Event: ${data.majorAlteringEvent}
Major Conflict: ${data.majorConflict}
Immediate Motivation: ${data.immediateMotivation}
Childhood Ambition: ${data.childhoodAmbition}
Significant Possession: ${data.significantPossession}`;
}

/**
 * Copy text to clipboard
 */
export function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Initialize transformer on module load
initializeTextTransformer();
