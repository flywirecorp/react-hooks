import { useState } from 'react';

const FIRST_STEP = 0;

type Step = {
  id: string;
};

type StepProps = {
  steps: Step[];
  initialStep?: number;
};

function useStep({ steps, initialStep = FIRST_STEP }: StepProps) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [index, setIndex] = useState(initialStep);
  const step = steps[index];
  const inRange = (index: number | string) => {
    if (typeof index === 'number') {
      if (index < FIRST_STEP) return FIRST_STEP;
      if (index >= steps.length) return steps.length - 1;
      return index;
    }

    return steps.findIndex(step => step.id === index) || FIRST_STEP;
  };

  const go = (step: number | string) => setIndex(inRange(step));
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  const complete = (step: number | string = index) => {
    const index = inRange(step);
    const id = steps[index].id;

    setCompleted([...new Set([...completed, id])]);
  };

  const uncomplete = (step: number | string = index) => {
    const index = inRange(step);
    const stepId = steps[index].id;

    setCompleted(completed.filter(id => id !== stepId));
  };

  const reset = (step = initialStep) => {
    setIndex(step);
    setCompleted([]);
  };

  return {
    complete,
    completed,
    index,
    navigation: { next, prev, go },
    step,
    uncomplete,
    reset,
  };
}

export default useStep;
