const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/firefox');

async function runTest() {
    let options = new Options();
    let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();

    try {
        await driver.get('https://www.google.com');

        const title = await driver.getTitle();
        console.log('Title of the page is:', title);
        if (title === "Google") {
            console.log("Test Passed: The title is correct");
        } else {
            console.log("Test Failed: The title is incorrect");
        }

        const logo = await driver.findElement(By.id('hplogo'));
        const logoIsDisplayed = await logo.isDisplayed();
        console.log('Logo is displayed:', logoIsDisplayed);

        const searchBox = await driver.findElement(By.name('q'));
        const searchBoxIsEnabled = await searchBox.isEnabled();
        console.log('Search box is enabled:', searchBoxIsEnabled);

        const searchButton = await driver.findElement(By.name('btnK'));
        const searchButtonIsDisplayed = await searchButton.isDisplayed();
        console.log('Search button is displayed:', searchButtonIsDisplayed);

        const gmailLink = await driver.findElement(By.linkText('Gmail'));
        const gmailLinkIsDisplayed = await gmailLink.isDisplayed();
        console.log('Gmail link is displayed:', gmailLinkIsDisplayed);

    } finally {
        await driver.quit();
    }
}

runTest();