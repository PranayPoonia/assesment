export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password, role } = req.body;

        // Add logic for handling registration (e.g., saving to a database)
        return res.status(200).json({ message: 'Registration successful' });
    } else {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
