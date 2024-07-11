function validarEFormatarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return null;
    }
    return email
}

module.exports = { validarEFormatarEmail }