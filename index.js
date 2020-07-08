const myModule = require('./myModule');
const express = require('express');

const app = express();

app.get('/accueil', async (req, res) => {
  res.sendFile('paccueil_view.html', {root: __dirname })}
);


app.get('/action', async (req, res) => {
  //on va recuperer les données du formulaire
  const data = { 
    date : req.query.date,
    //les autres données vont ici
  };

  //utiliser le module pour faire qqch avec puppeteer
  const titleVideo = await myModule.findData(data);

  //afficher les donnes du formulaire
  res.json({data, titleVideo})
});



app.listen(8081, () => console.log('listening bitch'));
