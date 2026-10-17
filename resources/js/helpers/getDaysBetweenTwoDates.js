export function getDaysBetweenTwoDates (startingDate, endingDate) {
    const firstDate = new Date(startingDate).getTime();
    const secondDate = new Date(endingDate).getTime();
    const difference = secondDate - firstDate;

    // This result is now in milliseconds so we have to convert it to days.
    // (1000 milliseconds _ (60 minutes _ 60 seconds) * 24 hours);

    const numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
    return numberOfDays;
};
