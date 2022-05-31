import { getContext, setContext } from 'svelte';
import { writable, derived, get } from 'svelte/store';

const vestContextKey = {};
const getVestContext = () => getContext(vestContextKey);

/// Converts a writable store to a readable.
const readableFrom = (writable) => ({
    subscribe: writable.subscribe,
});
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
const useVest = (suite, { initialData, submit, convertError = (e) => `${e}`, }) => {
    suite.reset();
    const error = writable('');
    const submitting = writable(false);
    const data = writable({ ...initialData });
    for (const key of Object.keys(initialData)) {
        const value = initialData[key];
        if (value) {
            suite(initialData, key);
        }
    }
    const result = writable(suite.get());
    const disabled = derived([submitting, result], ([submitting, result]) => {
        return !result.isValid() || submitting;
    });
    const reset = (newData) => {
        data.set(newData);
        suite.reset();
    };
    const updateField = (name, value) => {
        data.update((data) => ({ ...data, [name]: value }));
        const newData = get(data);
        result.set(suite(newData, name));
    };
    setContext(vestContextKey, {
        data,
        result,
        updateField,
        submitting,
    });
    const internalSubmit = async () => {
        if (get(submitting))
            return;
        error.set('');
        const submittedData = get(data);
        const result = suite(submittedData);
        if (result.hasErrors())
            return;
        try {
            submitting.set(true);
            await submit(submittedData);
        }
        catch (e) {
            console.error(e);
            error.set(convertError(e));
        }
        finally {
            submitting.set(false);
        }
    };
    const action = (node) => {
        node.addEventListener('submit', (e) => {
            e.preventDefault();
            void internalSubmit();
        });
    };
    return {
        action,
        error: readableFrom(error),
        submitting: readableFrom(submitting),
        disabled,
        reset,
    };
};

export { getVestContext, useVest };
//# sourceMappingURL=index.js.map
