const express = require("express");
const router = express.Router();

const sendgridAPIKey = process.env.SENDGRID_API_KEY

router.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body)

    // Validate the input data
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Please enter a name, email, and message.' })
      }
    }

    // Send the email using SendGrid
    const response = await axios.post('https://api.sendgrid.com/v3/mail/send', {
      personalizations: [
        {
          to: [{ email: 'your-email@example.com' }],
          subject: 'New Contact Form Submission'
        }
      ],
      from: { email: data.email },
      content: [
        {
          type: 'text/plain',
          value: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
        }
      ]
    }, {
      headers: {
        Authorization: `Bearer ${sendgridAPIKey}`
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' })
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    }
  }
}

module.exports = router;