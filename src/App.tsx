import { useState, useEffect } from 'react';
import { DiceRoller } from './components/common/DiceRoller';
import { StatTracker } from './components/common/StatTracker';
import { HarmExperienceTracker } from './components/common/HarmExperienceTracker';
import { TextTracker } from './components/common/TextTracker';

/**
 * Represents the character's core statistics
 * @interface Stats
 * @property {number} hot - The character's Hot stat
 * @property {number} cold - The character's Cold stat
 * @property {number} dark - The character's Dark stat
 * @property {number} volatile - The character's Volatile stat
 */
interface Stats {
  hot: number;
  cold: number;
  dark: number;
  volatile: number;
}

/**
 * Represents the complete character data
 * @interface CharacterData
 * @property {string} name - The character's name
 * @property {Stats} stats - The character's Hot, Cold, Dark, and Volatile stats
 * @property {number} harm - The character's current harm level
 * @property {number} experience - The character's current experience points
 * @property {string} strings - The character's strings
 * @property {string} conditions - The character's current conditions
 */
interface CharacterData {
  name: string;
  stats: Stats;
  harm: number;
  experience: number;
  strings: string;
  conditions: string;
}

/**
 * Default character data used when no saved data exists
 */
const DEFAULT_CHARACTER: CharacterData = {
  name: '',
  stats: {
    hot: 0,
    cold: 0,
    dark: 0,
    volatile: 0,
  },
  harm: 0,
  experience: 0,
  strings: '',
  conditions: ''
};

/**
 * Loads character data from localStorage
 * @returns {CharacterData} The loaded character data or default values
 */
const loadCharacter = (): CharacterData => {
  const savedData = localStorage.getItem('monsterhearts-character');
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (e) {
      console.error('Failed to parse saved character data', e);
    }
  }
  return DEFAULT_CHARACTER;
};

/**
 * Main application component for the Monsterhearts 2 character sheet
 * Features:
 * - Character name and stats management
 * - Dice rolling system
 * - Harm and experience tracking
 * - Strings and conditions tracking
 * - Automatic data persistence
 */
function App() {
  const initialCharacter = loadCharacter();
  const [stats, setStats] = useState<Stats>(initialCharacter.stats);
  const [finalRoll, setFinalRoll] = useState<{ total: number; statName: string } | null>(null);
  const [characterName, setCharacterName] = useState<string>(initialCharacter.name);
  const [harm, setHarm] = useState<number>(initialCharacter.harm);
  const [experience, setExperience] = useState<number>(initialCharacter.experience);
  const [strings, setStrings] = useState<string>(initialCharacter.strings);
  const [conditions, setConditions] = useState<string>(initialCharacter.conditions);

  // Save character data when it changes
  useEffect(() => {
    const characterData: CharacterData = {
      name: characterName,
      stats,
      harm,
      experience,
      strings,
      conditions
    };
    localStorage.setItem('monsterhearts-character', JSON.stringify(characterData));
  }, [characterName, stats, harm, experience, strings, conditions]);

  /**
   * Handles dice roll results
   * @param {Object} result - Roll result
   * @param {[number, number]} result.dice - Individual dice values
   * @param {number} result.total - Total roll value
   * @param {number} result.stat - Stat value used
   * @param {string} result.statName - Name of stat used
   */
  const handleRoll = (result: { dice: [number, number]; total: number; stat: number; statName: string }) => {
    console.log('Roll result:', result);
    setFinalRoll({ total: result.total, statName: result.statName });
  };

  /**
   * Clears current roll result
   */
  const clearRoll = () => {
    setFinalRoll(null);
  };

  /**
   * Resets all character data to default values
   */
  const resetCharacter = () => {
    if (window.confirm('Are you sure you want to reset your character data?')) {
      setCharacterName(DEFAULT_CHARACTER.name);
      setStats(DEFAULT_CHARACTER.stats);
      setHarm(DEFAULT_CHARACTER.harm);
      setExperience(DEFAULT_CHARACTER.experience);
      setStrings(DEFAULT_CHARACTER.strings);
      setConditions(DEFAULT_CHARACTER.conditions);
      localStorage.removeItem('monsterhearts-character');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:text-gray-100">
      <header className="bg-gradient-to-r from-blood-red to-red-900 text-white p-6 text-center shadow-md">
        <h1
          className="text-3xl font-yataghan tracking-wide"
          style={{
            fontFamily: '"Yataghan-Regular", serif',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
          }}
        >
          Monsterhearts 2 Player Sheet
        </h1>
      </header>
      <main className="container mx-auto p-6 max-w-6xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <div className="mb-8">
            <h2
              className="text-2xl font-semibold font-fontin mb-4 text-center tracking-wide"
              style={{ fontFamily: '"Fontin-Regular", serif' }}
            >
              Character
            </h2>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  value={characterName}
                  onChange={(e) => setCharacterName(e.target.value)}
                  placeholder="Enter character name..."
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blood-red text-lg text-center"
                  style={{ fontFamily: '"Fontin-Regular", serif' }}
                />
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column: Dice Roller and Stats */}
            <div>
              <div className="mb-8">
                <h2
                  className="text-2xl font-semibold font-fontin mb-6 text-center tracking-wide"
                  style={{ fontFamily: '"Fontin-Regular", serif' }}
                >
                  Dice Roller
                </h2>
                <DiceRoller stats={stats} onRoll={handleRoll} onNewRoll={clearRoll} />
              </div>

              {finalRoll && (
                <div className="mb-8 text-center">
                  <div className="inline-block px-6 py-3 bg-gray-700 rounded-lg shadow-inner">
                    <p
                      className="text-xl font-fontin text-white"
                      style={{ fontFamily: '"Fontin-Regular", serif' }}
                    >
                      Result with <span className="text-white font-bold bg-blood-red px-2 py-0.5 rounded">{finalRoll.statName}</span>:
                      <span className="ml-2 text-2xl">{finalRoll.total}</span>
                    </p>
                  </div>
                </div>
              )}

              <div>
                <h2
                  className="text-2xl font-semibold font-fontin mb-6 text-center tracking-wide"
                  style={{ fontFamily: '"Fontin-Regular", serif' }}
                >
                  Stats
                </h2>
                <StatTracker initialStats={stats} onStatChange={setStats} />
              </div>
            </div>

            {/* Middle column: Harm and Experience */}
            <div>
              <h2
                className="text-2xl font-semibold font-fontin mb-6 text-center tracking-wide"
                style={{ fontFamily: '"Fontin-Regular", serif' }}
              >
                Status
              </h2>
              <HarmExperienceTracker
                initialHarm={harm}
                initialExperience={experience}
                onHarmChange={setHarm}
                onExperienceChange={setExperience}
              />
            </div>

            {/* Right column: Strings and Conditions */}
            <div className="space-y-8">
              <TextTracker
                label="Strings"
                initialText={strings}
                onTextChange={setStrings}
              />
              <TextTracker
                label="Conditions"
                initialText={conditions}
                onTextChange={setConditions}
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-sm text-gray-500 dark:text-gray-400 mt-8">
        <p style={{ fontFamily: '"Fontin-Regular", serif' }}>
          A character sheet for Monsterhearts 2
        </p>
        <button
          onClick={resetCharacter}
          className="mt-2 text-xs text-gray-500 hover:text-blood-red transition-colors"
        >
          Reset Character
        </button>
      </footer>
    </div>
  );
}

export default App;
