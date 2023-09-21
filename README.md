# Music App

Develop an elegant React.js Music Application.

Thank you [Javascript Mastery](https://www.youtube.com/@javascriptmastery) for the guide 💪

## System Requirements

To get started with development, you need to install few tools

1. git

   `git` version 2.13.1 or higher. Download [git](https://git-scm.com/downloads) if you don't have it already.

   To check your version of git, run:

   ```shell
    git --version
   ```

2. node

   `node` version 16.15.1 or higher. Download [node](https://nodejs.org/en/download/) if you don't have it already.

   To check your version of node, run:

   ```shell
    node --version
   ```

3. npm

   `npm` version 5.6.1 or higher. You will have it after you install node.

   To check your version of npm, run:

   ```shell
    npm --version
   ```

## Setup

To set up a development environment, please follow these steps:

1. Clone the repo

   ```shell
    git clone https://github.com/JhymerMartinez/MusicApp.git
   ```

2. Change directory to the project directory

   ```shell
   cd MusicApp
   ```

3. Install the dependencies

   ```shell
    npm install
   ```

   If you get an error, please check the console for more information.

   If you don't get an error, you are ready to start development.

4. Connect to the [Deezer API](https://developers.deezer.com/api)

   In order to consume the [Deezer API](https://developers.deezer.com/api) you have to configure a proxy or if you prefer, you can use this [Express JS app](https://github.com/JhymerMartinez/MusicAppBackend.git) that we can use as a proxy .

5. Set the Environment Variables

   Create a `.env` file in the root directory of the project. Add the following environment variables to the file:

   ```shell
   VITE_API_BASE_URL=http://localhost:8000
   ```

   _Note:_ The value of `VITE_API_BASE_URL` should be the URL of the proxy server you created in the previous step.

6. Run the app

   ```shell
   npm run dev
   ```

   Project will be running in the browser.

   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
