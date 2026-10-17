export const displayValidationError = (errors, key) => {
    let message
    if (Object.hasOwn(errors, key)) {
        for (const error of Object.values(errors[key])) {
            message = error
        }
    }
    return message;
};