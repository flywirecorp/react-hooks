declare function useIdleTimer({ events, interval, timeout, }?: {
    events?: string[] | undefined;
    interval?: number | undefined;
    timeout?: number | undefined;
}): {
    idle: boolean;
    reset: () => void;
    timeleft: number;
};
export default useIdleTimer;
