'use client';

export default function TimeSlotPicker({ slots, selectedSlot, onSelect }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
        Available Time Slots
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot;
          return (
            <button
              key={slot}
              type="button"
              onClick={() => onSelect(slot)}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${
                isSelected
                  ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-teal-500'
              }`}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}
