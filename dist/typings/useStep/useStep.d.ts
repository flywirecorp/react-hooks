declare type Step = {
    id: string;
};
declare type StepProps = {
    steps: Step[];
    initialStep?: number;
};
declare function useStep({ steps, initialStep }: StepProps): {
    complete: (step?: number | string) => void;
    completed: string[];
    index: number;
    navigation: {
        next: () => void;
        prev: () => void;
        go: (step: number | string) => void;
    };
    step: Step;
    uncomplete: (step?: number | string) => void;
    reset: (step?: number) => void;
};
export default useStep;
