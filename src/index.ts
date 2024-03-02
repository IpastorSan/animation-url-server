import express from 'express';

const app = express();

app.use(express.json());


app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/token/:id", (req, res) => {
    const {id} = req.params;

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>p5.js with Seed</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
    </head>
    <body>
      <script>
        let seed = ${id};
        
        function setup() {
          createCanvas(windowWidth, windowHeight);
          randomSeed(seed);
          noLoop();
        }
        
        function draw() {
          background(220);
          for (let i = 0; i < width; i += 20) {
            for (let j = 0; j < height; j += 20) {
              fill(random(255), random(255), random(255));
              ellipse(i, j, 20, 20);
            }
          }
        }
      </script>
    </body>
    </html>
  `;
  
  res.send(htmlContent);
})

// Listen on a port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});