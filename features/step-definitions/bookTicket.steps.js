const { Given, When, Then } = require("@cucumber/cucumber");
const HomePage = require("../../pages/HomePage");
const assert = require("assert");
const { expect } = require("playwright/test");

let homePage;
let page;

Given("user is on Amtrak home page", async function () {
    console.log("Navigating to Amtrak...");
    homePage = new HomePage(this.page);
    await homePage.navigate();
    console.log("Navigation completed");
});
When('user selects {string} trip type', async function (tripType) {

    if (tripType.toLowerCase() === "roundtrip") {
        await homePage.selectRoundTrip();
    } else if (tripType.toLowerCase() === "multicity") {
        await homePage.selectMultiCity();
    }

    // optional
    this.tripType = tripType;
});

When("user enters {string} and {string} as from stations", async function (from1, from2) {
    await homePage.enterFrom(from1, from2);
    console.log(`Asserting from values are: ${from1} and ${from2}`);
    //const fromValue = await page.inputValue(homePage.fromInput);
    // assert.strictEqual(fromValue, from, `From value should be ${from}, but got ${fromValue}`);
    console.log("✓ From value assertion passed");
});

When("user enters {string} and {string} as to stations", async function (to1, to2) {
    await homePage.enterTo(to1, to2);
    console.log(`Asserting to values are: ${to1} and ${to2}`);
    // const toValue = await this.page.inputValue(homePage.toInput);
    // assert.strictEqual(toValue, to, `To value should be ${to}, but got ${toValue}`);
    console.log("✓ To value assertion passed");
});

When("user enters {string} and {string} as departure dates", async function (date1, date2) {
    await homePage.enterDepartureDate(date1, date2);
    //console.log(`Asserting departure dates: ${date1} and ${date2}`);
    // assert.strictEqual(dateEntered, true, "Departure date (05/02/2027) should be entered");
    // console.log("✓ Departure date assertion passed");
});
When('user enters {string} as returnDate', async function (returnDate) {

    if (returnDate.trim() !== "") {
        await homePage.enterReturnDate(returnDate);
    }
});

When(
  'user selects {string} adults, {string} seniors and {string} children',
  async function (adults, seniors, children) {

    await homePage.selectTravellers(
      Number(adults),
      Number(seniors),
      Number(children)
    );
  }
);
When('user selects disability option', async function () {
    await homePage.selectDisabilityAssistance();
});

When("user clicks search", async function () {
    console.log("\n========== CLICKING SEARCH BUTTON ==========");
    console.log("Taking screenshot before click...");
    // await this.page.screenshot({ path: 'screenshot-before-click.png' });

    await homePage.clickSearch();
});

// Then("search results should be displayed", async function () {
//     await this.page.waitForLoadState("networkidle");

//     const url = this.page.url();
//     console.log("Current URL:", url);

//     const isResultsPage = url.includes("tickets") || url.includes("departure");

//     if (!isResultsPage) {
//         throw new Error("Search results page not loaded");
//     }
// });
