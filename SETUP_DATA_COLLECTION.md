# Data Collection Setup Guide

This guide will help you set up data collection for the Matcha Finder Quiz using Google Sheets, Airtable, or webhooks.

## Option 1: Google Sheets (Recommended for simplicity)

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet called "Matcha Quiz Responses"
3. Add these column headers in row 1:
   - A1: Timestamp
   - B1: Experience Level
   - C1: Drink Style
   - D1: Price Range
   - E1: Continent
   - F1: Taste Preferences
   - G1: Source
   - H1: Recommendations

### Step 2: Create Google Apps Script
1. In your Google Sheet, go to `Extensions > Apps Script`
2. Replace the default code with this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.experience,
      data.drinkStyle,
      data.priceRange,
      data.continent,
      data.tastePreferences.join(', '),
      data.source,
      data.recommendations.join(', ')
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Save the script and click "Deploy" > "New deployment"
4. Choose "Web app" as the type
5. Set "Execute as" to "Me" and "Who has access" to "Anyone"
6. Click "Deploy" and copy the Web App URL

### Step 3: Update the Code
In `src/utils/dataCollection.ts`, replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your Web App URL.

## Option 2: Airtable

### Step 1: Create Airtable Base
1. Go to [Airtable](https://airtable.com)
2. Create a new base called "Matcha Quiz"
3. Create a table called "Quiz Responses" with these fields:
   - Timestamp (Date & time)
   - Experience Level (Single select)
   - Drink Style (Single select)
   - Price Range (Single select)
   - Continent (Single select)
   - Taste Preferences (Long text)
   - Source (Single select)
   - Recommendations (Long text)

### Step 2: Get API Credentials
1. Go to [Airtable API documentation](https://airtable.com/api)
2. Select your base to get the Base ID
3. Get your API key from [Account settings](https://airtable.com/account)

### Step 3: Update the Code
In `src/utils/dataCollection.ts`, replace:
- `YOUR_AIRTABLE_BASE_ID` with your Base ID
- `YOUR_AIRTABLE_API_KEY` with your API key

## Option 3: Webhook (Zapier, Make.com, etc.)

### Step 1: Create a Webhook
1. In Zapier or Make.com, create a new automation
2. Set the trigger to "Webhook" and copy the webhook URL
3. Configure the action to send data to your preferred destination (Google Sheets, email, etc.)

### Step 2: Update the Code
In `src/utils/dataCollection.ts`, replace `YOUR_WEBHOOK_URL_HERE` with your webhook URL.

## Testing

After setup, test the integration by:
1. Completing the quiz
2. Checking your chosen destination for the submitted data
3. Verifying all fields are populated correctly

## Security Notes

- Keep your API keys secure and never commit them to public repositories
- Consider using environment variables for production deployments
- For Google Sheets, the Apps Script approach is secure as it doesn't expose credentials