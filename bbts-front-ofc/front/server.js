const express = require('express');
const path = require('path');
const app = express();

const distPath = path.join(__dirname, 'dist/seu-projeto');

app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Frontend rodando na porta ${PORT}`);
});
