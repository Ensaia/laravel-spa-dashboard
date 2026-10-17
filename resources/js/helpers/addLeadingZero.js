export const addLeadingZero = (number) => {
    if (number > 0 && number < 10) {
        return number.toString().padStart(2, '0');
    }
    return number.toString();
}