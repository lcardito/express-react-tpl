import moment from "moment";

module.exports.formatValue = (value, key) => {
    if (key.toLowerCase().indexOf('date') !== -1) {
        return moment(value).format('MMMM YYYY');
    }
    return value;
};

module.exports.formatInput = (value, key) => {
    if (key.toLowerCase().indexOf('date') !== -1) {
        return moment(value).format('YYYY-MM-DD');
    }
    return value;
};

module.exports.getInputType = (key) => {
    let type = key.toLowerCase();
    if (type.indexOf('date') !== -1) {
        return 'date';
    } else if (type.indexOf('password') !== -1) {
        return 'password';
    }
    return 'text';
};