import express from 'express';
import fs from 'fs/promises';

const app = express();
const PORT = process.env.PORT || 4174;
const dataFile = new URL('./guest-data.json', import.meta.url);

const loadGuests = async () => {
  try {
    const raw = await fs.readFile(dataFile, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
};

const saveGuests = async (guests) => {
  await fs.writeFile(dataFile, JSON.stringify(guests, null, 2), 'utf8');
};

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/api/guests', async (req, res) => {
  const guests = await loadGuests();
  res.json(guests);
});

app.post('/api/signup', async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required.' });
  }

  const guests = await loadGuests();
  const normalizedEmail = email.toLowerCase();
  const nextGuests = [
    { name, email: normalizedEmail, phone },
    ...guests.filter((guest) => guest.email.toLowerCase() !== normalizedEmail),
  ];

  await saveGuests(nextGuests);
  res.json(nextGuests);
});

app.listen(PORT, () => {
  console.log(`Rekova API server listening on http://localhost:${PORT}`);
});
