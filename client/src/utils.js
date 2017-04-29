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

module.exports.colorMap = {
    '#008080': 'teal',
    '#ff0000': 'red',
    '#ffa500': 'orange',
    '#ffff00': 'yellow',
    '#808000': 'olive',
    '#008000': 'green',
    '#0000ff': 'blue',
    '#ee82ee': 'violet',
    '#800080': 'purple',
    '#ffc0cb': 'pink',
    '#a52a2a': 'brown',
    '#000000': 'black'
};

module.exports.hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};