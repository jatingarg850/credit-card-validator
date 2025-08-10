function validateLuhn(cardNumber) {
    const digits = cardNumber.split('').map(Number);
    const checksum = digits.reverse().reduce((acc, digit, index) => {
        if (index % 2 === 1) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        return acc + digit;
    }, 0);
    return checksum % 10 === 0;
}

function calculateCheckDigit(cardNumber) {
    const digits = cardNumber.split('').map(Number);
    const checksum = digits.reverse().reduce((acc, digit, index) => {
        if (index % 2 === 1) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        return acc + digit;
    }, 0);
    return (10 - (checksum % 10)) % 10;
}

module.exports = {
    validateLuhn,
    calculateCheckDigit
};