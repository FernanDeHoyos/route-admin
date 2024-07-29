import { useState, useCallback } from 'react';

export const useForm = (initialForm = {}, validate = () => ({})) => {
    const [formState, setFormState] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const onReset = useCallback(() => {
        setFormState(initialForm);
        setErrors({});
    }, [initialForm]);

    const onInputChange = useCallback(({ target }) => {
        const { name, value, files } = target;

        if (name === 'Imagen' && files) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormState(prevState => ({
                    ...prevState,
                    [name]: reader.result
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

        const validationErrors = validate({ ...formState, [name]: value });
        setErrors(validationErrors);
    }, [formState, validate]);

    const onFieldReset = useCallback((fieldName) => {
        setFormState(prevState => ({
            ...prevState,
            [fieldName]: initialForm[fieldName] || ''
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [fieldName]: undefined
        }));
    }, [initialForm]);

    return {
        ...formState,
        formState,
        errors,
        onInputChange,
        onReset,
        onFieldReset
    };
};
