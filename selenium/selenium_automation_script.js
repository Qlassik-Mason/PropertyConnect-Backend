const { Builder, By, Key, until } = require("selenium-webdriver");

async function testpropertyconnectApp() {
  // Launch Chrome browser
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    //  Open the website
    await driver.get("https://your-real-estate-app.com");

    //User Login
    console.log("Testing Login...");
    await driver.findElement(By.name("email")).sendKeys("testuser@example.com");
    await driver.findElement(By.name("password")).sendKeys("testpassword", Key.RETURN);
    await driver.wait(until.urlContains("dashboard"), 5000); // Wait for dashboard to load
    console.log("Login successful!");

    //  Search Property by Location
    console.log("Testing Property Search by location...");
    await driver.findElement(By.name("search")).sendKeys("New York", Key.RETURN);
    await driver.wait(until.elementLocated(By.className("property-card")), 5000); // Wait for results
    console.log("Property search successful!");

    // Add Property
    console.log("Testing Add Property...");
    await driver.get("https://your-real-estate-app.com/add-property");
    await driver.findElement(By.name("title")).sendKeys("Luxury Apartment");
    await driver.findElement(By.name("price")).sendKeys("2500");
    await driver.findElement(By.name("location")).sendKeys("123 Main Street, New York");
    await driver.findElement(By.id("submit-button")).click();

    await driver.wait(until.alertIsPresent(), 5000); // Wait for confirmation alert
    console.log( "Property added successfully!");
  } catch (error) {
    console.error(" Test Failed:", error);
  } finally {
    await driver.quit(); // Close the browser
  }
}

// Run the test
testpropertyconnectApp();
