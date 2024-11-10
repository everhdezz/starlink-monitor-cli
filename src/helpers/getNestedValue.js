module.exports = (obj, inputName) => {
    if (!inputName) return null;

    return inputName.split('.').reduce((acc, part) => acc && acc[part], obj);
}