const puppeteer = require("puppeteer");

//----------------------------------------------------------------------------------------------------
//                                            XXXXXX
//----------------------------------------------------------------------------------------------------
// const BASE_URL = process.env.BASE_URL_DEV;
// const USERNAME = process.env.USERNAME;
// const PASSWORD = process.env.PASSWORD;

const youtube = async (
  BASE_URL,
  USERNAME,
  PASSWORD,
  loop1,
  loop2,
  maxSecondAdded
) => {
  try {
    const browser = await puppeteer.launch({
      // headless: true,
      executablePath: "/Applications/Google Chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(BASE_URL, { waitUntil: "networkidle2" });
    await page.waitForTimeout(1000);

    // debugger;

    //----------------------------------------------------------------------------------------------------
    //                                            XXXLOGIN--BUTTONXXX
    //-----------------------------------------------------------------------------------------------------
    let loginButton = await page.$x(
      '//a//tp-yt-paper-button//yt-formatted-string[contains(text(),"Sign in")]'
    );
    await loginButton[0].click();
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    await page.waitForTimeout(1000);
    await page.type('input[name="identifier"]', USERNAME, { delay: 700 });
    // //----------------------------------------------------------------------------------------------------
    // //                                            XXXLOGINXXX
    // //-----------------------------------------------------------------------------------------------------
    let nextLoginButton = await page.$x(
      '//button//span[contains(text(),"Next")]'
    );
    await nextLoginButton[0].click();
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    await page.waitForTimeout(5000);
    await page.type('input[name="password"]', PASSWORD, { delay: 300 });
    // //----------------------------------------------------------------------------------------------------
    // //                                            XXXPASSWORDXXX
    // //-----------------------------------------------------------------------------------------------------
    let nextPasswordButton = await page.$x(
      '//button//span[contains(text(),"Next")]'
    );
    await nextPasswordButton[0].click();
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    await page.waitForTimeout(5000);
    // //----------------------------------------------------------------------------------------------------
    // //                                            XXXPHONE_BUTTONXXX
    // //-----------------------------------------------------------------------------------------------------
    // let recoveryPhoneNumberButton = await page.$x(
    //   '//div[contains(text(),"Confirm your recovery phone number")]'
    // );
    // await recoveryPhoneNumberButton[0].click();
    // await page.waitForNavigation({ waitUntil: "networkidle2" });
    // await page.waitForTimeout(4000);
    // await page.type('input[id="phoneNumberId"]', phoneNumber, { delay: 100 });
    // //----------------------------------------------------------------------------------------------------
    // //                                            XXXNEXT-PHONEXXX
    // //-----------------------------------------------------------------------------------------------------
    // let nextPhoneNumberButton = await page.$x(
    //   '//button//span[contains(text(),"Next")]'
    // );
    // await nextPhoneNumberButton[0].click();
    // await page.waitForNavigation({ waitUntil: "networkidle2" });
    // await page.waitForTimeout(5000);
    // debugger;
    //----------------------------------------------------------------------------------------------------
    //                                            XXXXXX
    //-----------------------------------------------------------------------------------------------------
    for (let i = 0; i < loop1; i++) {
      if (i !== 0) {
        await page.goto(BASE_URL, { waitUntil: "networkidle2" });
      }
      if (i === 0) {
        let playButton = await page.$x('//button[@title="Play (k)"]');
        await playButton[0].click();
      }

      let nextButton = await page.$x('//a[@title="Next (SHIFT+n)"]');
      i++;
      for (let j = 0; j < loop2; j++) {
        await page.waitForTimeout(31000);
        let random = Math.ceil(Math.random() * maxSecondAdded * 1000);
        console.log(random, i, j);
        await page.waitForTimeout(random);
        await nextButton[0].click();
        // await page.waitForNavigation({ waitUntil: "networkidle2" });
      }
    }
    alert("I'm done for now relaunch");
    browser.close();
    //--------------------------------------------------------------------------------------
    //                                            XXXXXX
    //--------------------------------------------------------------------------------------
  } catch (error) {
    // if (error instanceof yt.puppeteer.errors.TimeoutError) {
    // Do something if this is a timeout.
    console.log(error);
    // }
  }
};
module.exports = youtube;
