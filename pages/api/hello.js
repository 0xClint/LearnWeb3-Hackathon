// pages/api/your-endpoint.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Handle your POST request here
      res.status(200).json({ message: 'POST request received successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
