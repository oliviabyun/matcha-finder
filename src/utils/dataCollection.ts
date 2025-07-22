// Data collection utilities for Google Sheets and Airtable integration

export interface QuizSubmission {
  timestamp: string;
  experience: string;
  drinkStyle: string;
  priceRange: string;
  continent: string;
  tastePreferences: string[];
  source: string;
  recommendations: string[];
}

// Google Sheets Integration
export async function submitToGoogleSheets(submission: QuizSubmission): Promise<boolean> {
  try {
    // Replace with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission)
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to submit to Google Sheets:', error);
    return false;
  }
}

// Airtable Integration
export async function submitToAirtable(submission: QuizSubmission): Promise<boolean> {
  try {
    // Replace with your Airtable configuration
    const AIRTABLE_BASE_ID = 'YOUR_AIRTABLE_BASE_ID';
    const AIRTABLE_TABLE_NAME = 'Quiz Responses';
    const AIRTABLE_API_KEY = 'YOUR_AIRTABLE_API_KEY';
    
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [{
          fields: {
            'Timestamp': submission.timestamp,
            'Experience Level': submission.experience,
            'Drink Style': submission.drinkStyle,
            'Price Range': submission.priceRange,
            'Continent': submission.continent,
            'Taste Preferences': submission.tastePreferences.join(', '),
            'Source': submission.source,
            'Recommendations': submission.recommendations.join(', ')
          }
        }]
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to submit to Airtable:', error);
    return false;
  }
}

// Webhook Integration (for services like Zapier, Make.com, etc.)
export async function submitToWebhook(submission: QuizSubmission): Promise<boolean> {
  try {
    // Replace with your webhook URL
    const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE';
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission)
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to submit to webhook:', error);
    return false;
  }
}

// Main submission function that tries multiple methods
export async function submitQuizData(submission: QuizSubmission): Promise<void> {
  console.log('Quiz submission data:', submission);
  
  // Try submitting to all configured services
  const results = await Promise.allSettled([
    submitToGoogleSheets(submission),
    submitToAirtable(submission),
    submitToWebhook(submission)
  ]);
  
  // Log results for debugging
  results.forEach((result, index) => {
    const service = ['Google Sheets', 'Airtable', 'Webhook'][index];
    if (result.status === 'fulfilled' && result.value) {
      console.log(`✅ Successfully submitted to ${service}`);
    } else {
      console.log(`❌ Failed to submit to ${service}`);
    }
  });
}