import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
// import Stripe from 'stripe';
// import { Buffer } from 'buffer';

// Load environment variables from .env file
dotenv.config();

// // Initialize Stripe with the secret key
// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error('STRIPE_SECRET_KEY is required in environment variables');
// }

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2023-08-16', // Specify the Stripe API version
// });

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Define types for payment intent request
// interface PaymentIntentRequest {
//   amount: number;
//   currency: string;
//   email?: string;
//   name?: string;
//   message?: string;
// }
//
// // Define types for webhook event
// interface WebhookEventType {
//   id: string;
//   type: string;
//   data: {
//     object: any;
//   };
// }

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://js.stripe.com", "'unsafe-inline'","https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "https://cdnjs.cloudflare.com", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'", "https://api.stripe.com"],
      frameSrc: ["'self'", "https://js.stripe.com", "https://hooks.stripe.com"],
      fontSrc: ["'self'", "https://cdnjs.cloudflare.com"]
    }
  }
}));

// Middleware for CORS and parsing JSON for regular routes
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Stripe webhook secret for verifying webhook events
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Route to create a payment intent
// app.post('/create-payment-intent', async (req: Request, res: Response) => {
//   try {
//     const { amount, currency, email, name, message } = req.body as PaymentIntentRequest;
//
//     // Validate the input
//     if (!amount || amount <= 0) {
//       return res.status(400).json({ error: 'Invalid amount' });
//     }
//
//     if (!currency) {
//       return res.status(400).json({ error: 'Currency is required' });
//     }
//
//     // Create metadata object
//     const metadata: Record<string, string> = {};
//     if (name) metadata.name = name;
//     if (message) metadata.message = message;
//
//     // Convert amount to cents/smallest currency unit
//     // For most currencies like EUR, USD, GBP, this is cents (multiply by 100)
//     const unitAmount = Math.round(parseFloat(amount.toString()) * 100);
//
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: unitAmount,
//       currency: currency.toLowerCase(),
//       automatic_payment_methods: {
//         enabled: true,
//       },
//       metadata: metadata,
//       receipt_email: email || undefined,
//       description: "Wedding Registry Contribution"
//     });
//
//     // Return the client secret
//     res.status(200).json({
//       clientSecret: paymentIntent.client_secret
//     });
//
//   } catch (error) {
//     console.error('Error creating payment intent:', error);
//     res.status(500).json({ error: 'Failed to create payment. Please try again later.' });
//   }
// });

// For Stripe webhook, we need the raw body to verify the signature
// app.post('/webhook',
//   express.raw({ type: 'application/json' }),
//   async (req: Request, res: Response) => {
//     const sig = req.headers['stripe-signature'];
//
//     if (!sig || !endpointSecret) {
//       return res.status(400).send('Webhook signature or secret is missing');
//     }
//
//     let event: WebhookEventType;
//
//     try {
//       // Verify the webhook signature
//       const rawBody = req.body;
//       event = stripe.webhooks.constructEvent(
//         rawBody instanceof Buffer ? rawBody : Buffer.from(JSON.stringify(rawBody)),
//         sig,
//         endpointSecret
//       ) as WebhookEventType;
//     } catch (err: any) {
//       console.error(`Webhook Error: ${err.message}`);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }
//
//     // Handle the event
//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         const paymentIntent = event.data.object;
//         console.log(`Payment succeeded: ${paymentIntent.id}`);
//
//         // Here you could:
//         // - Send a confirmation email
//         // - Update a database record
//         // - Notify the couple of a new contribution
//
//         break;
//       case 'payment_intent.payment_failed':
//         const failedPayment = event.data.object;
//         console.log(`Payment failed: ${failedPayment.id}`);
//
//         // Handle failed payment
//
//         break;
//       default:
//         // Unexpected event type
//         console.log(`Unhandled event type: ${event.type}`);
//     }
//
//     // Return a 200 response to acknowledge receipt of the event
//     res.status(200).json({received: true});
//   }
// );

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Route for success page
// app.get('/payment-success.html', (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, '../public', 'payment-success.html'));
// });

// Default route - serve the main page
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
