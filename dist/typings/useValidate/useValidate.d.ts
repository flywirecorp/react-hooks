export declare enum actionTypes {
    VALIDATION_SUCCESS = "VALIDATION_SUCCESS",
    VALIDATION_ERROR = "VALIDATION_ERROR"
}
declare type Errors = {
    [key: string]: string[];
};
declare type Data = {
    [key: string]: string | boolean | null;
};
declare type Constraints = {
    [key: string]: {
        [key: string]: unknown;
    };
};
declare type Options = {
    onError?: (errors: Errors) => void;
    onSuccess?: () => void;
};
declare function useValidate(data?: Data, constraints?: Constraints, { onError, onSuccess }?: Options): {
    validate: () => boolean;
    errors: Errors;
    isValid: boolean;
};
export default useValidate;
