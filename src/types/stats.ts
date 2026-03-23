/**
 * Character stats for Monsterhearts 2.
 * Each stat ranges from -3 to +3.
 */
export interface Stats {
    /** Attractiveness, charm, and social manipulation */
    hot: number;
    /** Composure, calculation, and emotional distance */
    cold: number;
    /** Mystery, danger, and supernatural power */
    dark: number;
    /** Aggression, impulsiveness, and physical threat */
    volatile: number;
}
