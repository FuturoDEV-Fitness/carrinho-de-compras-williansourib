function validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return null;
    }
    return email
} // valida o email

module.exports = { validarEmail }