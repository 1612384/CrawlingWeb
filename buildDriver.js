
const {Builder, until} = require('selenium-webdriver');


let driver = new Builder()
    .forBrowser('firefox')
    .usingServer(process.env.SELENIUM_REMOTE_URL || 'http://localhost:4444/wd/hub')
    .build();

module.exports = driver;