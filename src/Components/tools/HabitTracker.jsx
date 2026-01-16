import React, { useState, useEffect } from 'react';
import { Target, Plus, Check, Trash2, Calendar } from 'lucide-react';

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  // Load habits from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('habit-tracker-data');
    if (saved) {
      try {
        setHabits(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load habits:', e);
      }
    }
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habit-tracker-data', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, {
        id: Date.now(),
        name: newHabit,
        completed: [],
        createdAt: new Date().toISOString()
      }]);
      setNewHabit('');
    }
  };

  const toggleToday = (habitId) => {
    const today = new Date().toDateString();
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const completed = habit.completed.includes(today)
          ? habit.completed.filter(d => d !== today)
          : [...habit.completed, today];
        return { ...habit, completed };
      }
      return habit;
    }));
  };

  const deleteHabit = (habitId) => {
    setHabits(habits.filter(h => h.id !== habitId));
  };

  const getStreak = (habit) => {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toDateString();
      
      if (habit.completed.includes(dateStr)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    
    return streak;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-slate-50 rounded-2xl p-4">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addHabit()}
            placeholder="Add a new habit..."
            className="w-full h-14 px-5 rounded-xl border-2 border-slate-200 focus:border-teal-500 focus:outline-none transition-colors text-base"
          />
          <button
            onClick={addHabit}
            className="w-full h-14 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add
          </button>
        </div>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No habits yet. Add one to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {habits.map(habit => {
            const today = new Date().toDateString();
            const isCompletedToday = habit.completed.includes(today);
            const streak = getStreak(habit);

            return (
              <div
                key={habit.id}
                className="bg-white rounded-2xl border border-slate-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">{habit.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                      <span>🔥 {streak} day streak</span>
                      <span>✓ {habit.completed.length} total</span>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <button
                  onClick={() => toggleToday(habit.id)}
                  className={`w-full h-14 rounded-xl transition-colors font-medium flex items-center justify-center gap-2 ${
                    isCompletedToday
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isCompletedToday ? (
                    <>
                      <Check className="w-5 h-5" />
                      Completed Today!
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5" />
                      Mark as Done
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
