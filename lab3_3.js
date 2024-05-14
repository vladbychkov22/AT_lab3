const { Builder, By, Key, until } = require('selenium-webdriver');

async function testKievWiki() {
    let driver = await new Builder().forBrowser('firefox').build();

    try {

        await driver.get('https://uk.wikipedia.org');

        await driver.findElement(By.name('search')).sendKeys('Київ', Key.RETURN);

        await driver.wait(until.elementLocated(By.id('firstHeading')), 10000);

        await driver.wait(until.elementLocated(By.xpath('//img[contains(@src, "Герб_Києва.png")]')), 10000);
        const coatOfArms = await driver.findElement(By.xpath('//img[contains(@src, "Герб_Києва.png")]'));
        console.log('Зображення герба Києва присутнє:', await coatOfArms.isDisplayed());

        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "населення")]//parent::tr/td')), 10000);
        const population = await driver.findElement(By.xpath('//*[contains(text(), "населення")]//parent::tr/td'));
        console.log('Кількість населення:', await population.getText());

        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "°C")][contains(text(), "квітень")]')), 10000);
        const aprilTemp = await driver.findElement(By.xpath('//*[contains(text(), "°C")][contains(text(), "квітень")]'));
        console.log('Середня температура в квітні:', await aprilTemp.getText());

        await driver.wait(until.elementLocated(By.linkText('Епідемія коронавірусу')), 10000);
        const covidSection = await driver.findElement(By.linkText('Епідемія коронавірусу'));
        console.log('Підрозділ "Епідемія коронавірусу" присутній:', await covidSection.isDisplayed());

        await driver.wait(until.elementLocated(By.xpath('//*[contains(text(), "Густота населення")]//parent::tr/td')), 10000);
        const density = await driver.findElement(By.xpath('//*[contains(text(), "Густота населення")]//parent::tr/td'));
        console.log('Густота населення:', await density.getText());

    } finally {
        await driver.quit();
    }
}

testKievWiki();
