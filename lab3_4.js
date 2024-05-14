const { Builder, By, Key, until } = require('selenium-webdriver');

async function testKievWiki() {
    let driver = await new Builder().forBrowser('firefox').build();

    try {

        await driver.get('https://uk.wikipedia.org');

        await driver.findElement(By.name('search')).sendKeys('Київ', Key.RETURN);

        await driver.wait(until.elementLocated(By.id('firstHeading')), 10000);

        const landmarks = await driver.findElements(By.css('.landmarks-list li'));
        console.log('Кількість архітектурних пам яток:', landmarks.length);
        if (landmarks.length > 20) {
            console.log('Тест пройдено: кількість пам яток більше 20');
        } else {
            console.log('Тест не пройдено: кількість пам яток 20 або менше');
        }

    } finally {
        await driver.quit();
    }
}

testKievWiki();
