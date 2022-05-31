import { Action } from 'svelte/action';
import { Readable } from 'svelte/store';
import { SuiteResult, Suite } from 'vest';

declare type VestContext = {
    data: Readable<GenericFormData>;
    updateField: UpdateField;
    result: Readable<SuiteResult>;
    submitting: Readable<boolean>;
};
declare const getVestContext: () => VestContext;
declare type UpdateField = (name: string, value: string | number | boolean) => void;

declare type GenericFormData = {
    [key: string]: string | number | boolean;
};
declare type UseVestResult<T> = {
    action: Action<HTMLFormElement>;
    error: Readable<string>;
    submitting: Readable<boolean>;
    disabled: Readable<boolean>;
    reset: (data: T) => void;
};
declare type UseVestOptions<T extends GenericFormData> = {
    initialData: T;
    /**
     * Invoked when the user submits the form. This is where you submit the data
     * to your server. If this function throws an exception, the exception is
     * caught, converted to a string with `convertError` and put into the `$error`
     * store.
     */
    submit: (data: T) => Promise<void>;
    /**
     * When the submit function throws an error, this function converts the error
     * to a user presentable string.
     */
    convertError?: (e: unknown) => string;
};
/**
 * Example usage:
 *
 *     const { action, error, disabled, reset } = useVest<FormData>(
 *       suite,
 *       { initial: 'data' },
 *       async (data) => {
 *         // Submit the data to your server
 *       }
 *   )
 */
declare const useVest: <T extends GenericFormData>(suite: Suite<(data: T, currentField?: string | undefined) => void>, { initialData, submit, convertError, }: UseVestOptions<T>) => UseVestResult<T>;

export { GenericFormData, UseVestResult, VestContext, getVestContext, useVest };
