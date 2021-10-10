declare type FieldValue = string | boolean | null;
declare type FieldValues = {
    [key: string]: FieldValue;
};
declare type DirtyFields = {
    [key: string]: boolean;
};
declare function useFormState(initialValues?: FieldValues): {
    update: (name: string, value: FieldValue) => void;
    updateAll: (newFields?: FieldValues) => void;
    reset: (values?: FieldValues) => void;
    values: FieldValues;
    dirtyFields: DirtyFields;
};
export default useFormState;
