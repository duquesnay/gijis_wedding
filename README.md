# Wedding Registry with Stripe Payment Integration (TypeScript)

A wedding registry website with Stripe payment integration, built with TypeScript and Express, designed to be deployed on Heroku.

## Features

- TypeScript for type safety and better developer experience
- Responsive landing page with custom banner image
- Secure payment processing with Stripe Payment Element
- Multiple currency support (EUR, USD, GBP)
- Custom donation amounts
- Webhook handling for payment events
- Success page for completed payments

## Project Structure

```
wedding-registry-typescript/
├── src/                     # TypeScript source files
│   └── server.ts            # Express server
├── public/                  # Static files served by Express
│   ├── index.html           # Landing page
│   ├── payment.html         # Payment form page
│   ├── payment-success.html # Success page
│   ├── styles.css           # CSS styles
│   ├── banner.jpg           # Banner image
│   └── payment-qrcode.png   # QR code for payment page
├── dist/                    # Compiled JavaScript (generated)
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project dependencies
├── Procfile                 # Heroku configuration
└── .env                     # Environment variables (not committed)
```

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Stripe account
- Heroku account

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/wedding-registry-typescript.git
   cd wedding-registry-typescript
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file from the example:
   ```
   cp .env.example .env
   ```

4. Update the `.env` file with your Stripe API keys:
   ```
   STRIPE_SECRET_KEY=sk_test_your_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

5. Create a `public` directory and place your static files inside:
   ```
   mkdir -p public
   # Copy your HTML, CSS, and image files to the public directory
   ```

6. Start the development server:
   ```
   npm run dev
   ```

7. Visit `http://localhost:3000` in your browser.

### Setting up Stripe

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Dashboard
3. Update your publishable key in the payment.html file
4. Set up a webhook for your domain:
   - Go to Stripe Dashboard > Developers > Webhooks
   - Add an endpoint with the URL `https://your-domain.com/webhook`
   - Subscribe to events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the signing secret to your .env file

### Building for Production

To compile TypeScript to JavaScript:

```
npm run build
```

This will create a `dist` directory with the compiled JavaScript files.

### Deploying to Heroku

1. Create a Heroku account and install the Heroku CLI
2. Log in to Heroku:
   ```
   heroku login
   ```

3. Create a new Heroku app:
   ```
   heroku create your-wedding-registry
   ```

4. Set environment variables:
   ```
   heroku config:set STRIPE_SECRET_KEY=sk_test_your_secret_key
   heroku config:set STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   heroku config:set NODE_ENV=production
   ```

5. Deploy to Heroku:
   ```
   git push heroku main
   ```

6. Open your app:
   ```
   heroku open
   ```

## TypeScript Benefits

- **Type Safety**: Catch errors at compile time instead of runtime
- **Better IDE Support**: Auto-completion, intelligent code navigation
- **Improved Maintainability**: Self-documenting code with interfaces
- **Refactoring Support**: Safer code refactoring with immediate feedback

## Customization

- Replace `banner.jpg` with your own image
- Update the text in HTML files to personalize your wedding registry
- Modify the CSS in `styles.css` to match your wedding theme
- Generate a QR code for your payment page and save it as `payment-qrcode.png`

## Security Considerations

- Always use HTTPS in production
- Keep your Stripe secret key confidential
- Validate all inputs on the server side
- Use Stripe webhook signatures to verify events
- Implement rate limiting to prevent abuse

## License

This project is licensed under the MIT License.