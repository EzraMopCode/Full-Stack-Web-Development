# Clinic Diary

## The brief

**Problem.** Small clinics run their daily schedule on a paper diary or a
shared spreadsheet — it's slow to search, easy to double-book, and nobody
can see it from more than one desk at once.

**User.** A clinic receptionist, working from the front desk. They need to
see today's booked appointments at a glance, filter by date or doctor,
open one appointment to see its details, and book a new one without
accidentally double-booking a doctor's time slot.

**Screens & data.**

| Screen | Data it needs |
| --- | --- |
| Home | None — just a way in |
| Diary | Appointments for a given date/doctor |
| Appointment detail | One appointment record |
| Booking | The doctor list, and it writes a new appointment |
| Staff sign-in | None — demo auth, any name signs in |

## Route map

| Path | Renders | Dynamic? | Guarded? |
| --- | --- | --- | --- |
| `/` | Home | no | no |
| `/diary` | Diary (reads `?date=` & `?doctor=`) | no | no |
| `/appointments/:id` | Appointment detail | yes (`:id`) | no |
| `/book` | Booking form | no | yes — redirects to `/login` |
| `/login` | Staff sign-in | no | no |
| `*` | Not found | no | no |

## Where each required topic lives

| Day | Where |
| --- | --- |
| 26–27 | `Layout`, `DiaryFilters`, `AppointmentList` / `AppointmentCard` — composition, props, keyed list |
| 28 | `DiaryFilters`, `Booking` — controlled inputs and events |
| 29 | `useAppointments`, `AppointmentDetail` — fetch in an effect with `AbortController` cleanup |
| 30 | `useAppointments` (custom hook), `AuthContext` (context) |
| 31 | `App.jsx` — nested routes under `Layout`, dynamic `:id` route, guarded `/book` |
| 32 | `AuthContext` / `useAuth` |
| 33 | `Booking` + `validate.js` — validation and touched-field error messages |
| 34 | `ErrorBoundary` around the Diary route, `React.lazy` on the Booking route |

## Running it

```bash
npm install
npm run dev
```

Then open the printed local URL. `npm run build` produces a production
build; `npm run preview` serves it locally.

## Notes

- The API in `src/api/appointments.js` is a mock with an artificial delay,
  so loading states are visible. Uncomment the `throw` line inside
  `fetchAppointments` to rehearse the error state.
- Staff sign-in is a demo: typing any name signs you in, to keep the
  capstone scoped to the frontend rather than a real auth backend.
