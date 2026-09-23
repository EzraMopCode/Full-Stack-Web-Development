import { useEffect, useState } from "react";
import { fetchAppointments } from "../api/appointments.js";

export function useAppointments({ date, doctor }) {
  const [state, setState] = useState({ data: [], status: "loading", error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ ...s, status: "loading", error: null }));

    fetchAppointments({ date, doctor, signal: controller.signal })
      .then((data) => setState({ data, status: "success", error: null }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setState({ data: [], status: "error", error: err.message });
      });

    return () => controller.abort();
  }, [date, doctor]);

  return state;
}
