const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware pour parsing JSON
app.use(bodyParser.json());

// Données test en mémoire
let contacts = [
    { id: '1', name: 'Maya', email: 'maya@example.ru', phone: '1234567890' },
    { id: '2', name: 'Dylan', email: 'dylan@example.com', phone: '0987654321' }
];

// Validation email
const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

// Routes
// GET /contacts
app.get('/contacts', (req, res) => {
    res.status(200).json(contacts);
});

// GET /contacts/:id
app.get('/contacts/:id', (req, res) => {
    const contact = contacts.find(c => c.id === req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found' });
    res.status(200).json(contact);
});

// POST /contacts
app.post('/contacts', (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid name or email' });
    }
    const newContact = { id: (contacts.length + 1).toString(), name, email, phone };
    contacts.push(newContact);
    res.status(201).json(newContact);
});

// PUT /contacts/:id
app.put('/contacts/:id', (req, res) => {
    const { name, email, phone } = req.body;
    const contactIndex = contacts.findIndex(c => c.id === req.params.id);

    if (contactIndex === -1) return res.status(404).json({ error: 'Contact not found' });
    if (!name || !email || !isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid name or email' });
    }

    contacts[contactIndex] = { id: req.params.id, name, email, phone };
    res.status(200).json(contacts[contactIndex]);
});

// DELETE /contacts/:id
app.delete('/contacts/:id', (req, res) => {
    const contactIndex = contacts.findIndex(c => c.id === req.params.id);

    if (contactIndex === -1) return res.status(404).json({ error: 'Contact not found' });

    contacts.splice(contactIndex, 1);
    res.status(204).send();
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
