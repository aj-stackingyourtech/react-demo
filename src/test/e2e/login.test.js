const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

const options = new chrome.Options();
options.addArguments('headless','disable-gpu');

const chromeDriver = new webdriver.Builder().forBrowser('chrome').setChromeOptions(options).build();

chromeDriver.navigate().to(`https://yellow-sand-098426110.azurestaticapps.net`)
    .then(() => chromeDriver.findElement(webdriver.By.className(`MuiButtonBase-root`)).click())
    .then(() => chromeDriver.findElements(webdriver.By.css(`li`)))
    .then(elements => elements[1].click())
    .then(() => chromeDriver.wait(webdriver.until.elementLocated(webdriver.By.id(`email`))))
    .then(() => chromeDriver.findElement(webdriver.By.id(`email`)).sendKeys(`aj@thirteendelta.com`))
    .then(() => chromeDriver.findElement(webdriver.By.id(`password`)).sendKeys(`Mu$t@rD1!`))
    .then(() => chromeDriver.findElement(webdriver.By.id(`next`)).click())
    .then(() => chromeDriver.wait(webdriver.until.elementLocated(webdriver.By.css(`h6`))))
    .then(() => chromeDriver.findElement(webdriver.By.css(`h6`)).getText())
    .then(text => expect(text).to.equal(`Welcome, A.J.`))
    .then(() => chromeDriver.quit());