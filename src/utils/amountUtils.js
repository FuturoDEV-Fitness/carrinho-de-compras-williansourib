function validarAmount(amount) {
    const amountRegex = /^[0-9]+$/

    if (!amountRegex.test(amount)) {
        return null
    }
    return amount
} // valida o amount

module.exports = { validarAmount }