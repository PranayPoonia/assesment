export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        // Add logic for handling login (validate, check credentials)
        // For simplicity, assume login is successful
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
