function formatarContact(contact) {
    contact = contact.replace(/[^\d]+/g, '');

    if (contact.length === 10) {
        return contact.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (contact.length === 11) {
        return contact.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else {
        return null;
    }
}

module.exports = { formatarContact }