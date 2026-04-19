import { getContext, setContext } from "svelte";

const KEY = "step-counter";

export function initStepCounter() {
  const counter = { count: 1 };
  setContext(KEY, {
    next: () => counter.count++,
    reset: () => {
      counter.count = 1;
    },
  });
}

export function getStepCounter() {
  return getContext<{ next: () => number; reset: () => void }>(KEY);
}
