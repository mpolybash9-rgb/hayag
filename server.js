const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

app.post('/api/public/visit', (req, res) => {
  res.json({ ok: true });
});

app.use(express.static(path.join(__dirname), {
  extensions: ['html'],
  index: 'index.html',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mp3')) {
      res.setHeader('Content-Type', 'audio/mpeg');
    }
  }
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
