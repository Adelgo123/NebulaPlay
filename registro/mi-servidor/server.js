import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post("/submit", async (req, res) => {
  const token = req.body["h-captcha-response"];

  const result = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: "ES_96fba520d40140cc84d2392557ceabef",
      response: token
    })
  });

  const data = await result.json();

  if (data.success) {
    res.send("Verificación correcta");
  } else {
    res.send("Verificación fallida");
  }
});

app.listen(5500, () => console.log("Servidor en http://localhost:5500"));
