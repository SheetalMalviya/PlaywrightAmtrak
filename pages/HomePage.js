const { expect } = require("@playwright/test");
const { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000); // 60 seconds
class HomePage {
    constructor(page) {
        //homepage locators and methods
        this.page = page;
        this.tripType = "oneway";
        this.allowAllButton = this.page.locator("#onetrust-accept-btn-handler");
        this.travelSelection = this.page.locator("//button[@amt-auto-test-id='fare-finder-travel-selection']");
        this.roundTrip = this.page.locator("//button[@amt-auto-test-id='fare-finder-round-trip-tab']");
        this.multicity = this.page.locator("//button[@amt-auto-test-id='fare-finder-multi-city-tab']");
        this.fromInput = this.page.locator("#am-form-field-control-0");
        this.toInput = this.page.locator("#am-form-field-control-2");
        this.departureDateInput = this.page.locator("//input[@amt-auto-test-id='fare-finder-depart-date-oneway']");
        this.departureDateInputRoundTrip = this.page.locator("//input[@amt-auto-test-id='fare-finder-return-date-roundtrip']").nth(2);
        this.returnDateInput = this.page.locator("//input[@amt-auto-test-id='fare-finder-return-date-roundtrip']").nth(3);
        this.searchBtn = this.page.locator(
            "//button[@amt-auto-test-id='fare-finder-findtrains-button']"
        ).nth(0);
        this.travellers = this.page.locator("//button[@amt-auto-test-id='traveler-dropdown-button']");
        this.adultMinus = this.page.locator("//button[@amt-auto-test-id='traveler-component-adult-dcr-button'][@data-type='minus']");
        this.adultPlus = this.page.locator("//button[@amt-auto-test-id='traveler-component-adult-incr-button'][@data-type='plus']");
        this.childMinus = this.page.locator("//button[@amt-auto-test-id='traveler-component-child-dcr-button'][@data-type='minus']");
        this.childPlus = this.page.locator("//button[@amt-auto-test-id='traveler-component-child-incr-button'][@data-type='plus']");
        this.seniorMinus = this.page.locator("//button[@amt-auto-test-id='traveler-component-senior-dcr-button'][@data-type='minus']");
        this.seniorPlus = this.page.locator("//button[@amt-auto-test-id='traveler-component-senior-incr-button'][@data-type='plus']");
        this.travellerDoneBtn = this.page.locator("#traveler-dropdown-done-button");
        this.totalPassengersCount = this.page.locator("#totalPassengersCount");
        this.disabilityCheckbox=this.page.locator("#needAssistance").nth(0);
        this.multiCitiesFrom1=this.page.locator("#am-form-field-control-26");
        this.multiCitiesTo1=this.page.locator("#am-form-field-control-28");
        this.multiCitiesFrom2=this.page.locator("#am-form-field-control-32");
        this.multiCitiesTo2=this.page.locator("#am-form-field-control-34");

    }
//Page actions
    async navigate() {
        await this.page.goto("https://aemstage.amtrak.com/home", {
            waitUntil: "domcontentloaded",   // or "commit"
            timeout: 60000
        });
        await this.allowAllButton.click();;
    }
    //Page actions for selecting trip types
    async selectRoundTrip() {
        await this.travelSelection.click();
        await this.roundTrip.click();
        this.tripType = "roundtrip";
        await this.page.waitForTimeout(5000);
    }

    async selectMultiCity() {
        await this.travelSelection.click();
        await this.multicity.click();
        this.tripType = "multicity";
         //await this.multiCitiesFrom.nth(0).waitFor({
        //state: "visible"});
    }

    async enterFrom(location1,location2) {
        if (this.tripType === "multicity") {
      //  await this.multiCitiesFrom.nth(0).waitFor({ state: "visible" });
       // await this.multiCitiesTo.nth(1).waitFor({ state: "visible" });
        await this.multiCitiesFrom1.fill(location1);
       await this.multiCitiesFrom2.fill(location2);
        }
        else {
            await this.fromInput.fill(location1);
        }
    }

    async enterTo(location1,location2) {
        if (this.tripType === "multicity") {
        //await this.multiCitiesTo.nth(0).waitFor({ state: "visible" });
       // await this.multiCitiesTo.nth(1).waitFor({ state: "visible" });
            await this.multiCitiesTo1.fill(location1);
            await this.multiCitiesTo2.fill(location2);
        }
        else {
            await this.toInput.fill(location1);
        }
        await this.page.waitForTimeout(2000);
    }

    async enterDepartureDate(date1,date2) {
        if (this.tripType === "multicity") {
            await this.departureDateInput.nth(0).fill(date1);
            await this.departureDateInput.nth(1).fill(date2);
        } else if (this.tripType === "roundtrip") {
            await this.departureDateInputRoundTrip.fill(date1);
        } else {
            await this.departureDateInput.fill(date1);
        }
        await this.page.keyboard.press('Tab');
    }


    async enterReturnDate(date) {
        await this.returnDateInput.fill(date);
        // IMPORTANT: blur field properly
        await this.page.keyboard.press('Tab');

        // Wait for UI to stabilize (not fixed timeout)
        // await this.page.waitForLoadState("networkidle");
    }
   
    async selectTravellers(adults, seniors, children) {

        await this.travellers.click();

        const currentAdults = 1;

        // adults
        if (adults > currentAdults) {
            for (let i = 0; i < adults - currentAdults; i++) {
                await this.adultPlus.click();
            }
        } else {
            for (let i = 0; i < currentAdults - adults; i++) {
                await this.adultMinus.click();
            }
        }

        // seniors
        for (let i = 0; i < seniors; i++) {
            await this.seniorPlus.click();
        }

        // children
        for (let i = 0; i < children; i++) {
            await this.childPlus.click();
        }

        await this.travellerDoneBtn.click();
    }
    async selectDisabilityAssistance(needAssistance) {
     await this.disabilityCheckbox.check();
    }
    async clickSearch() {
        // await this.searchBtn.waitFor({ state: "visible" });
        //await this.searchBtn.waitFor({ state: "attached" });
        await expect(this.searchBtn).toBeEnabled({ timeout: 5000 });

        await this.searchBtn.click();
    }
}

module.exports = HomePage;