'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function DiaryFilters({ date, doctor, doctors }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key, val) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set(key, val);
    } else {
      params.delete(key);
    }
    router.push(`/diary?${params.toString()}`);
  };

  return (
    <div className="filters">
      <label>
        Date
        <input
          type="date"
          value={date}
          onChange={(e) => handleFilterChange('date', e.target.value)}
        />
      </label>
      <label>
        Doctor
        <select
          value={doctor}
          onChange={(e) => handleFilterChange('doctor', e.target.value)}
        >
          <option value="">All doctors</option>
          {doctors.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
