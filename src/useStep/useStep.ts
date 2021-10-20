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
  const [index, setIndex] = useState<number>(initialStep);
  const step = steps[index];
  const inRange = (index: number | string) => {
    if (typeof index === 'number') {
      if (index < FIRST_STEP) return FIRST_STEP;
      if (index >= steps.length) return steps.length - 1;
      return index;
    }

    return steps.findIndex(step => step.id === index) || FIRST_STEP;
  };

  const go = (nextStep: number | string) => setIndex(inRange(nextStep));
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  const complete = (completeStep: number | string = index) => {
    const completeStepIndex = inRange(completeStep);
    const id = steps[completeStepIndex].id;

    setCompleted([...new Set([...completed, id])]);
  };

  const uncomplete = (uncompleteStep: number | string = index) => {
    const uncompleteStepIndex = inRange(uncompleteStep);
    const stepId = steps[uncompleteStepIndex].id;

    setCompleted(completed.filter(id => id !== stepId));
  };

  const reset = (resetStep = initialStep) => {
    setIndex(resetStep);
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
