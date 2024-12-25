import { Webhook } from 'svix';
import { headers } from 'next/headers';

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    return new Response(
      'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local',
      { status: 500 }
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = headers(); // Removed unnecessary `await`
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response(
      `Error: Missing Svix headers (${
        !svix_id ? 'svix-id' : !svix_timestamp ? 'svix-timestamp' : 'svix-signature'
      })`,
      { status: 400 }
    );
  }

  // Get body
  let payload;
  try {
    payload = await req.json();
  } catch (err) {
    console.error('Error parsing JSON payload:', err);
    return new Response('Error: Invalid JSON payload', { status: 400 });
  }

  const body = JSON.stringify(payload);

  let evt;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', { status: 400 });
  }

  // Log event for debugging
  console.log(`Received webhook with ID ${evt.data.id} and event type ${evt.type}`);
  console.log('Webhook payload:', body);

  // Handle specific events
  switch (evt.type) {
    case 'user.created':
      console.log('User created with ID:', evt.data.id);
      break;
    case 'user.updated':
      console.log('User updated with ID:', evt.data.id);
      break;
    default:
      console.log(`Unhandled event type: ${evt.type}`);
  }

  // Return success response
  return new Response(JSON.stringify({ success: true, eventType: evt.type }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
