function validarId(id) {
    const idRegex = /^[0-9]+$/

    if (!idRegex.test(id)) {
        return null
    }
    return id
}

module.exports = { validarId }