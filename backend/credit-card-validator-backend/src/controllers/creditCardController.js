class CreditCardController {
    validateCard(req, res) {
        const { cardNumber } = req.body;
        if (!cardNumber) {
            return res.status(400).json({ error: 'Card number is required' });
        }

       
        if (cardNumber.length < 13 || cardNumber.length > 19) {
            return res.status(400).json({ error: 'Length is not valid for a credit card number' });
        }

        const isValid = this.validateLuhn(cardNumber);
        if (isValid) {
            return res.status(200).json({ valid: true });
        } else {
     
            const base = cardNumber.slice(0, -1);
            const correctLastDigit = this.calculateCheckDigit(base);
            return res.status(200).json({
                valid: false,
                correctLastDigit,
                suggestion: base + correctLastDigit
            });
        }
    }

    suggestDigit(req, res) {
        const { cardNumber } = req.body;
        if (!cardNumber || cardNumber.length !== 15) {
            return res.status(400).json({ error: 'Card number must be 15 digits long' });
        }

        const checkDigit = this.calculateCheckDigit(cardNumber);
        return res.status(200).json({ suggestedDigit: checkDigit });
    }


    validateLuhn(cardNumber) {
        let sum = 0;
        const nDigits = cardNumber.length;
        const parity = (nDigits - 2) % 2;
        for (let i = 0; i < nDigits; i++) {
            let digit = parseInt(cardNumber.charAt(i), 10);
            if (i % 2 === parity) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
        }
        return sum % 10 === 0;
    }

    calculateCheckDigit(cardNumber) {
        
        let sum = 0;
        const nDigits = cardNumber.length + 1; 
        const parity = (nDigits - 2) % 2;
        for (let i = 0; i < cardNumber.length; i++) {
            let digit = parseInt(cardNumber.charAt(i), 10);
            if (i % 2 === parity) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
        }
      
        const mod = sum % 10;
        return mod === 0 ? 0 : 10 - mod;
    }
}

module.exports = CreditCardController;