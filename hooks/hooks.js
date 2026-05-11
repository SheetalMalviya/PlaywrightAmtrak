const { Before, After, AfterStep, Status } = require("@cucumber/cucumber");
const { chromium } = require("playwright");
const fs = require("fs");

Before(async function () {
  this.browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });

  this.context = await this.browser.newContext({
    recordVideo: {
      dir: "reports/videos/",
      size: { width: 1280, height: 720 },
    },
  });

  this.page = await this.context.newPage();
});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    const screenshotPath = `reports/screenshots/${Date.now()}.png`;

    await this.page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    const image = fs.readFileSync(screenshotPath);

    await this.attach(image, "image/png");
  }
});

After(async function (scenario) {
  const videoPath = await this.page.video().path();

  console.log("Video saved at:", videoPath);

  await this.page.close();
  await this.context.close();
  await this.browser.close();
});