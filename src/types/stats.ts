/**
 * Represents character's Hot, Cold, Dark, and Volatile stats
 * @interface Stats
 * @property {number} hot - Character's Hot stat
 * @property {number} cold - Character's Cold stat
 * @property {number} dark - Character's Dark stat
 * @property {number} volatile - Character's Volatile stat
 */
export interface Stats {
    hot: number;
    cold: number;
    dark: number;
    volatile: number;
}
