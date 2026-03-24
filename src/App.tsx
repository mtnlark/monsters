import { useState, useEffect } from 'react';
import { DiceRoller } from './components/common/DiceRoller';
import { StatTracker } from './components/common/StatTracker';
import { HarmExperienceTracker } from './components/common/HarmExperienceTracker';
import { TextTracker } from './components/common/TextTracker';
import { useCharacter } from './hooks/useCharacter';

function App() {
  const {
    character,
    updateName,
    updateStats,
    updateHarm,
    updateExperience,
    updateStrings,
    updateConditions,
    resetCharacter,
  } = useCharacter();

  const [finalRoll, setFinalRoll] = useState<{ total: number; statName: string } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? saved === 'true' : true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  const handleRoll = (result: { dice: [number, number]; total: number; stat: number; statName: string }) => {
    setFinalRoll({ total: result.total, statName: result.statName });
  };

  const clearRoll = () => {
    setFinalRoll(null);
  };

  const handleResetCharacter = () => {
    if (window.confirm('Are you sure you want to reset your character data?')) {
      resetCharacter();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-gradient-to-r from-blood-red to-red-900 text-white p-4 sm:p-6 shadow-md">
        <div className="container mx-auto max-w-6xl flex items-center justify-between">
          <h1
            className="text-2xl sm:text-3xl font-yataghan tracking-wide"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
          >
            Monsterhearts 2
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-button bg-white/10 hover:bg-white/20 transition-colors duration-150 touch-target flex items-center justify-center"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Sticky character name on mobile */}
      <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sm:relative sm:bg-transparent sm:dark:bg-transparent sm:backdrop-blur-none sm:border-none">
        <div className="container mx-auto max-w-6xl p-4 sm:p-6 sm:pb-0">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <input
                type="text"
                value={character.name}
                onChange={(e) => updateName(e.target.value)}
                placeholder="Character name..."
                maxLength={50}
                className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-button text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blood-red text-lg text-center font-fontin"
                aria-label="Character name"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-4 sm:p-6 max-w-6xl">
        {/* Main content grid - responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Dice Roller - always first on mobile */}
          <div className="md:col-span-1 lg:col-span-1 order-1">
            <div className="card-elevated">
              <h2 className="component-label text-center mb-4">Dice Roller</h2>
              <DiceRoller stats={character.stats} onRoll={handleRoll} onNewRoll={clearRoll} />
            </div>

            {finalRoll && (
              <div className="mt-4 text-center final-roll-result">
                <div className={`inline-block px-6 py-4 rounded-card border-2 shadow-xl ${
                  finalRoll.total >= 10
                    ? 'bg-green-900/20 border-green-600 dark:border-green-500'
                    : finalRoll.total <= 6
                      ? 'bg-red-900/20 border-blood-red'
                      : 'bg-gradient-to-br from-blood-red/20 to-red-900/20 border-blood-red'
                }`}>
                  <p className="text-lg font-fontin text-gray-700 dark:text-gray-200 mb-1">
                    with <span className="font-bold uppercase">{finalRoll.statName}</span>
                  </p>
                  <div className="text-5xl font-bold text-gray-900 dark:text-white">
                    {finalRoll.total}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats - second on mobile */}
          <div className="md:col-span-1 lg:col-span-1 order-2">
            <div className="card">
              <h2 className="component-label text-center mb-4">Stats</h2>
              <StatTracker stats={character.stats} onStatChange={updateStats} />
            </div>
          </div>

          {/* Harm & Experience - third on mobile */}
          <div className="md:col-span-2 lg:col-span-1 order-3 lg:order-3">
            <div className="card">
              <h2 className="component-label text-center mb-4">Status</h2>
              <HarmExperienceTracker
                harm={character.harm}
                experience={character.experience}
                onHarmChange={updateHarm}
                onExperienceChange={updateExperience}
              />
            </div>
          </div>

          {/* Strings - fourth on mobile */}
          <div className="md:col-span-1 lg:col-span-1 order-4 lg:order-4">
            <TextTracker
              label="Strings"
              value={character.strings}
              onChange={updateStrings}
            />
          </div>

          {/* Conditions - fifth on mobile */}
          <div className="md:col-span-1 lg:col-span-2 order-5 lg:order-5">
            <TextTracker
              label="Conditions"
              value={character.conditions}
              onChange={updateConditions}
            />
          </div>
        </div>
      </main>

      <footer className="text-center p-4 text-sm text-gray-500 dark:text-gray-500">
        <button
          onClick={handleResetCharacter}
          className="btn-tertiary"
        >
          Reset Character
        </button>
      </footer>
    </div>
  );
}

export default App;
