# Animation URL server example

`animation_url` is Opensea´s solution to the problem on how to render dynamic NFTs or simply how to display non-image based media. Not all marketplaces implement it but when Opensea´s market share was more dominant, it was used as a de-facto standard.

The way it works is the frontend will check for a valid `animation_url` first and then fallback to the `image` attribute if it cant find any. It injects an iframe in the web where you can display GLTF, GLB, WEBM, MP4, M4V, OGV, and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA. Max size is 100MB.

Most interesting, it also lets you render arbitrary HTML so you can make interactive NFTs (Or a full webpage if you want to) with the only restriction being that the scripts cant access browser extensions (probably a good idea). So no, you can´t go full NFT-ception and start minting NFTs from your NFTs.

*Note: this is only Opensea's implementation, other marketplaces might differ, if they support `animation_url` at all.*

## Serving HTML from a server

We will focus on how to serve arbitrary HTML that can also interact with the user in some capacity, as this is the most fun application of `animation_url`

We will set up an Express server with a single route `token/:id` where `id` is meant to be our NFT tokenID. For this quick experiment we will create NFTs that run computer generated art using [p5.js](https://p5js.org/), a popular drawing library. 

Our route will return an HTML template that runs our script. The token Id in the params will be used as the seed of the artwork, ensuring each time the endpoint is called we get the same initial state (therefore making the NFTs both unique and consistent). To add interactivity to the piece, each time the user clicks on the canvas the dots will be "scared away" and move outwards from the cursor, while at the same time changing the initial seed phrase, altering colors and motion.

![GIF demo](/demo.gif)

## Run the project 
```javascript
npm install
```
```javascript
npm run dev
```

The application will run on port 8080 you can use any url like http://localhost:8080/token/<TOKEN_ID> to see the rendered program.