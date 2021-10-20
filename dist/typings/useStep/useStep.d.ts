declare type Step = {
    id: string;
};
declare type StepProps = {
    steps: Step[];
    initialStep?: number;
};
declare function useStep({ steps, initialStep }: StepProps): {
    complete: (completeStep?: number | string) => void;
    completed: string[];
    index: number;
    navigation: {
        next: () => void;
        prev: () => void;
        go: (nextStep: number | string) => void;
    };
    step: Step;
    uncomplete: (uncompleteStep?: number | string) => void;
    reset: (resetStep?: number) => void;
};
export default useStep;
