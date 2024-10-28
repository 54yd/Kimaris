# AR Animal Interaction Website 🐾

Welcome to the **AR Animal Interaction Website**! This platform provides an engaging experience where you can interact with various animals using Augmented Reality (AR) and enjoy a variety of audio interactions. Learn about the features below to explore the fun! 🚀

## Features ✨

1. **Place and Interact with 3D Animals in AR**
   - Offline-Compatible. The latest technology of ServiceWorker(WorkBox) can this App run offline (partially)
   - Place virtual 3D animals onto real-world surfaces using your mobile device. 🐘🐅
   - Animals are  interactive (only default page, not AR mode): touch their tummies repeatedly, and you can play game with them, by dialogue and sounds! 😄

2. **Animal HP and Battle Game Mode**

   - Each animal has its own HP (Health Points). Reduce their HP by interacting with them. 💥
   - Engage in battle game mode: YOU vs 🐯 like Pokemon.

3. **Smooth Surface Detection**

   - The app detects land surfaces for realistic AR animal placement. Animals adjust seamlessly to your environment. 📀✨

4. **Real-Time Audio Manipulation**

   - Enjoy real-time audio effects that change dynamically with each interaction. The pitch and speed of the audio will adjust based on game stage (I made this API as implementation.)

## Key Technologies Used 🚀

- **ARKit and React Native**: These technologies power the augmented reality experience and allow for smooth integration with mobile devices. 📱
- **React Hooks**: For state management and seamless interaction within the app. ⚛️
- **Web Audio API**: For real-time pitch and speed audio manipulation, delivering customized audio effects.

## How to Use 🐾

1. **Launch the App** 🚀

   - Open the AR Animal Interaction app on your mobile device.

2. **Place an Animal** 🐅

   - Point your camera towards a flat surface, and once detected, place the animal of your choice by tapping on your screen.

3. **Interact with the Animal** 👋

   - Touch the animal's tummy to see it react! Each interaction may reduce its HP, bringing a game-like element to the experience. 🟤

4. **Battle Mode** ⚔️

   - Enable multiple animals, interact with them, and watch them battle! This is a unique feature that sets our app apart from other AR experiences.

5. **Explore Audio Reactions** 🎙️

   - Play with the animals and notice the pitch and speed of the sound change based on how you interact. Every animal has its unique set of sounds that adapt in real-time.

## Why This App Stands Out 🌟

- **AR 3D Animals**: You can put animals wherever you want, making the experience much more immersive. 🐾
- **HP-Based Interaction**: Animals have health points, opening up possibilities for competitive play and creative interactions. 🎮
- **Custom Animations and Audio**: Users can choose different animations for each animal, and the audio experience adapts to those animations, providing a fully immersive experience. 🎵
- **Rich Audio Features**: The inclusion of real-time audio manipulation makes interactions feel dynamic. Different pitch, speed, and sound effects for each animal interaction add depth to the user experience.
- **PWA(SPA)+offline-Compatible**: The latest technology of ServiceWorker(WorkBox) can this App run offline(partially, because 3D model is loaded from the server in order to prevent size limitation)
## Installation 📱

1. Clone the repository:

   ```bash
   git clone https://github.com/username/AR-Animal-Interaction.git
   ```

2. Install dependencies:

   ```bash
   cd AR-Animal-Interaction
   npm install
   ```

3. Run the app:

   ```bash
   npm start
   ```

Feel free to explore the different features and immerse yourself in this unique AR experience with interactive animals and dynamic sounds!

