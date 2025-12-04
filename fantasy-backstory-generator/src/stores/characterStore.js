import { writable } from 'svelte/store';

// Defin initial state
const initialCharacterData = {
    race: 'Human',
    background: 'Alcolyte',
    definingTrait: '',
    keyRelationship: '',
    significantEvent: '',
    majorConflict: '',
    majorAlteringEvent: '',
    immediateMotivation: 'Revenge',
    childhoodAmbition: '',
    significantPossession: 'Heirloom'
};

export const characterData = writable(initialCharacterData);