//Regex de connexion
module.exports = {
    validEmail(string_) {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,15}$/.test(string_)) {
            return ({ error: 'L\'email n\'est pas saisie correctement' });
        }
        return true;
    },
    validPassword(string_) {
        if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/.test(string_)) {
            return ({ error: 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre (8 caractères minimum)' });
        }
        return true;
    }
}



