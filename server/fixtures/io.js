const process = require('process');

module.exports = class Input {
    constructor() {
        this.options = process.argv.filter((opt) => opt.match(/^--.*/g)).map((opt) => opt.replace('--', ''))
        this.arguments = process.argv.filter((opt) => opt.match('--'))
    }

    option(arg) {
        return this.options.filter((opt) => opt == arg).length === 1;
    }
}