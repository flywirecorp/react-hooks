declare function useLocalStorageState(key: string, defaultValue?: unknown, { serialize, deserialize }?: {
    serialize?: {
        (value: any, replacer?: ((this: any, key: string, value: any) => any) | undefined, space?: string | number | undefined): string;
        (value: any, replacer?: (string | number)[] | null | undefined, space?: string | number | undefined): string;
    } | undefined;
    deserialize?: ((text: string, reviver?: ((this: any, key: string, value: any) => any) | undefined) => any) | undefined;
}): any[];
export default useLocalStorageState;
