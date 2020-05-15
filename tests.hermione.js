const assert = require('chai').assert;

describe('page index render', function() {
    it('should find right title', function() {
        return this.browser
            .url('http://localhost:3000/')
            .getText('.header__logo')
            .then(function(title) {
                assert.equal(title, 'School CI Server');
            });
    });
});

describe('page settings render', function() {
    it('should find right title', function() {
        return this.browser
            .url('http://localhost:3000/settings')
            .getText('.header__logo')
            .then(function(title) {
                assert.equal(title, 'School CI Server');
            });
    });
});

describe('page history render', function() {
    it('should find right title', function() {
        return this.browser
            .url('http://localhost:3000/history')
            .getText('.header__logo')
            .then(function(title) {
                assert.equal(title, 'bemdev/ci-server');
            });
    });

    it('should run build modal open', function() {
        return this.browser
            .url('http://localhost:3000/history')
            .click('.header__control .button:nth-child(1)')
            .waitForVisible('.modal');
    });

    it('should settings modal open', function() {
        return this.browser
            .url('http://localhost:3000/history')
            .click('.header__control .button:nth-child(2)')
            .waitForVisible('.modal');
    });
});
