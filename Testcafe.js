
//Test successful login with valid credentials.//		
const { Selector } = require('testcafe');

fixture("Login Test")
    .page("https://beta.deepthought.education/login");

test("Successful Login with Valid Credentials", async t => {
    const usernameField = Selector('input[name="email"]');
    const passwordField = Selector('input[name="password"]');
    const loginButton = Selector('button[type="submit"]');
    
    // Enter valid credentials and submit
    await t
        .typeText(usernameField, "your-email@example.com")
        .typeText(passwordField, "your-password")
        .click(loginButton);
    
    // Assertion for successful login
    const welcomeMessage = Selector(".dashboard-title"); // Replace with the actual selector for the welcome message
    await t.expect(welcomeMessage.exists).ok();
});

//Test unsuccessful login attempts with invalid credentials.		//
const { Selector } = require('testcafe');

fixture("Login Test - Unsuccessful Login").page("https://beta.deepthought.education/login");

test("Unsuccessful Login with Invalid Credentials", async (t) => {
    // Select username and password fields
    const usernameField = Selector('input[name="username"]');
    const passwordField = Selector('input[name="password"]');
    
    // Select the submit button
    const submitButton = Selector('button[type="submit"]');
    
    // Enter invalid credentials and submit
    await t
        .typeText(usernameField, "invalid-username")
        .typeText(passwordField, "invalid-password")
        .click(submitButton);
    
    // Check for error message
    const errorMessage = Selector(".error-message"); // Update with actual selector for error message
    await t.expect(errorMessage.exists).ok();
});



//Validate that appropriate error messages are displayed for invalid login attempt//

const { Selector } = require('testcafe');

fixture("Login Test - Invalid Login Error Messages").page("https://beta.deepthought.education/login");

test("Invalid Login with Blank Credentials", async (t) => {
    const submitButton = Selector('button[type="submit"]');
    
    await t.click(submitButton);
    
    const errorMessage = Selector(".error-message"); // Update with actual selector for error message
    await t.expect(errorMessage.innerText).contains("Please enter a username");
});

test("Invalid Login with Incorrect Username", async (t) => {
    const usernameField = Selector('input[name="username"]');
    const passwordField = Selector('input[name="password"]');
    const submitButton = Selector('button[type="submit"]');
    
    await t
        .typeText(usernameField, "invalid-username")
        .typeText(passwordField, "valid-password")
        .click(submitButton);
    
    const errorMessage = Selector(".error-message"); // Update with actual selector for error message
    await t.expect(errorMessage.innerText).contains("Invalid username or password");
});

test("Invalid Login with Incorrect Password", async (t) => {
    const usernameField = Selector('input[name="username"]');
    const passwordField = Selector('input[name="password"]');
    const submitButton = Selector('button[type="submit"]');
    
    await t
        .typeText(usernameField, "valid-username")
        .typeText(passwordField, "invalid-password")
        .click(submitButton);
    
    const errorMessage = Selector(".error-message"); // Update with actual selector for error message
    await t.expect(errorMessage.innerText).contains("Invalid username or password");
});

test("Invalid Login with Both Incorrect Credentials", async (t) => {
    const usernameField = Selector('input[name="username"]');
    const passwordField = Selector('input[name="password"]');
    const submitButton = Selector('button[type="submit"]');
    
    await t
        .typeText(usernameField, "invalid-username")
        .typeText(passwordField, "invalid-password")
        .click(submitButton);
    
    const errorMessage = Selector(".error-message"); // Update with actual selector for error message
    await t.expect(errorMessage.innerText).contains("Invalid username or password");
});

//On successful login, validate that the user is redirected to the dashboard screen.//
const { Selector } = require('testcafe');

fixture("Login Test - Successful Login").page("https://beta.deepthought.education/login");

test("Successful Login Redirects to Dashboard", async (t) => {
    // Select username and password fields
    const usernameField = Selector('input[name="username"]');
    const passwordField = Selector('input[name="password"]');
    
    // Select the submit button
    const submitButton = Selector('button[type="submit"]');
    
    // Enter valid credentials and submit
    await t
        .typeText(usernameField, "your-valid-username")
        .typeText(passwordField, "your-valid-password")
        .click(submitButton);
    
    // Wait for the redirection to complete and check the current URL
    await t.expect(Selector('body').innerText).contains("Dashboard");
});


Cross-Browser Testing

//Configure the TestCafe tests to run on at least two different browsers (e.g., Chrome and Firefox)	
import { Selector } from 'testcafe';

fixture('Login Test')
    .page('https://dev.deepthought.education/login');

test('Login with valid credentials', async t => {
    // Test logic here
    const usernameInput = Selector('input[name="username"]');
    const passwordInput = Selector('input[name="password"]');
    const loginButton = Selector('button[type="submit"]');

    await t
        .typeText(usernameInput, 'yourUsername')
        .typeText(passwordInput, 'yourPassword')
        .click(loginButton);

});

// Run the test on Chrome and Firefox
test('Run on Chrome and Firefox', async t => {
    await t
        .useRole(yourUserRole)  // If authentication is needed
        .wait(1000) // Wait for some time if needed
        .switchToBrowser('chrome')
        .navigateTo('https://dev.deepthought.education/login')
        .wait(1000) // Wait for some time if needed
        // Perform your test actions for Chrome
        .switchToBrowser('firefox')
        .navigateTo('https://dev.deepthought.education/login')
        .wait(1000) // Wait for some time if needed
        // Perform your test actions for Firefox
});

//Run the test cases and validate if processes work consistently across the chosen browsers.
import { Selector } from 'testcafe';

fixture('Login Test')
    .page('https://dev.deepthought.education/login');

test('Login consistency across Chrome and Firefox', async t => {
    const usernameInput = Selector('input[name="username"]');
    const passwordInput = Selector('input[name="password"]');
    const loginButton = Selector('button[type="submit"]');
    const successMessage = Selector('.success-message');

    // Test on Chrome
    await t
        .useRole(yourUserRole)  // If authentication is needed
        .typeText(usernameInput, 'yourUsername')
        .typeText(passwordInput, 'yourPassword')
        .click(loginButton)
        .expect(successMessage.exists).ok('Login successful message not found on Chrome');

    // Test on Firefox
    await t
        .useRole(yourUserRole)  // If authentication is needed
        .navigateTo('https://dev.deepthought.education/login')
        .typeText(usernameInput, 'yourUsername')
        .typeText(passwordInput, 'yourPassword')
        .click(loginButton)
        .expect(successMessage.exists).ok('Login successful message not found on Firefox');
});

	