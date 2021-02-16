import { localStore } from './localStore';
import { writable } from 'svelte/store';

export const theme = localStore('dan.my.id theme', 'dark');
export const posts = writable([]);
