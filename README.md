# WeatherAI

**WeatherAI** is a full-stack web application that shows the current weather for a given city and provides an AI-generated tip or advice based on that weather. It features a sleek user interface with both dark and light themes and runs entirely on your local machine, integrating with external APIs (OpenWeatherMap for weather data and OpenAI for generating advice) without the need for any external server deployment.

**Key Features:**

- Fetches real-time weather data by city name from the OpenWeatherMap API.
- Generates a personalized weather-related advice or tip using the OpenAI API.
- Provides a responsive user interface built with React, including a toggle for Dark/Light mode.
- Runs completely locally – the Node.js backend and React frontend.

---

## Project Structure

The project repository is divided into two main folders, each representing a sub-project:

- **`weather-ai-b` (Backend):** This folder contains the Node.js backend server. It’s a lightweight Express-based API server that handles incoming requests from the frontend. The backend reads configuration from an `.env` file (for API keys and the server port) and processes requests by calling external services:
    - **OpenWeatherMap API:** For retrieving current weather data for the requested city.
    - **OpenAI API:** For generating a suggestion or tip based on the weather information.
      The server combines the data (weather + AI-generated tip) into a JSON response and sends it back to the frontend. All backend logic (fetching data, calling APIs, formatting responses) resides here. The backend runs locally on the port specified in the `.env` file (see **Example .env** below).

- **`weather-ai-f` (Frontend):** This folder contains the React frontend application. It is a single-page application that provides the user interface:
    - Users can enter a city name into a search field. Upon submission, the frontend makes a GET request to the backend (using Axios) to fetch weather info and the AI-generated advice.
    - The UI displays the current weather (temperature, conditions, etc.) along with the tip from OpenAI. It also includes a toggle switch to change between dark mode and light mode for better user experience.
    - A configuration file `config.js` in the frontend (located in the `utils` or similar directory) defines the base URL of the backend API. This ensures the frontend knows where to send requests (e.g., `http://localhost:5000` or another port, as configured).
    - The React app was bootstrapped with a standard setup, so you'll find typical directories like `src/` (for source code, components, hooks, etc.) and `public/` (for static files). Styles are written in Sass (`.sass` files) for convenient styling, and some state is managed with React's Context/Reducer (for example, to handle the search state and results).

Each sub-project has its own `package.json` with dependencies. This separation of backend and frontend means you can manage and run them independently. The two parts communicate via HTTP requests (REST API calls) on your local machine.

---

## Installation and Running

To run **WeatherAI** locally, you will need to set up and launch both the backend server and the frontend development server separately. Make sure you have **Node.js** and **npm** installed on your system before you begin.

**1. Clone the repository:**

If you haven’t already, clone this project to your local machine using Git, or download the repository ZIP and extract it. Then navigate into the project directory.

```bash
git clone https://github.com/bromscandium/weather-ai.git
cd weather-ai
```

**2. Backend Setup (`weather-ai-b`):**

- **Configure Environment:** Before running the backend, create a `.env` file inside the `weather-ai-b` directory with the required API keys and settings (see the [Example .env](#example-env) section below for details). This includes your OpenAI and OpenWeatherMap API keys, and the port number for the server.
- **Install Dependencies:** In a terminal, navigate to the `weather-ai-b` folder and install the required Node.js packages:
  ```bash
  cd weather-ai-b
  npm install
  ```

  You can run the server directly with Node:
  ```bash
  node server.js
  ```
  The server should now be running on the port you specified in the `.env` (for example, **http://localhost:5000**). It will listen for requests and respond with weather data and AI-generated tips.

**3. Frontend Setup (`weather-ai-f`):**

- **Configure API URL:** Ensure that the frontend knows where the backend is running. Open the `weather-ai-f/utils/config.js` (or the appropriate config file in the frontend source) and verify that the `BASE_API_URL` points to your backend’s URL and port. For example, if your backend runs on port 5000, `BASE_API_URL` might be:
  ```js
  export const BASE_API_URL = "http://localhost:5000";
  ```
  If you changed the port or are running on a different host, update this accordingly. This step is crucial so that the React app’s API calls reach the backend correctly.
- **Install Dependencies:** In a new terminal (still in the project root or a separate window), navigate to the `weather-ai-f` directory and install its dependencies:
  ```bash
  cd weather-ai-f
  npm install
  ```
- **Start the Frontend Dev Server:** Once dependencies are installed, start the React development server:
  ```bash
  npm run dev
  ```
  This will launch the React application, usually on **http://localhost:3000** by default (create-react-app's default port). It should automatically open your web browser to the correct address; if not, you can manually open a browser and navigate to `http://localhost:3000`.

**4. Using the Application:**

- With both the backend and frontend running, you can now use WeatherAI. In the web application (http://localhost:3000), type the name of a city into the input field and press **Enter**.
- The frontend will send a request to the backend (e.g., to `http://localhost:5000?location=YourCity`) with the city name as a parameter.
- After a brief loading period, you should see the current weather information for that city displayed (temperature, weather conditions, etc.), along with a suggestion or tip generated by the AI. For example, if the city is experiencing rain, the tip might be something like "It's rainy – remember to carry an umbrella!" (the exact message is generated dynamically by OpenAI).
- You can toggle between Light and Dark themes using the switch in the interface. This preference is saved in your browser (using local storage) so that the app remembers your chosen theme.
- If you encounter any errors (e.g., an invalid city name or network issues), the app will display an error message. In that case, you can correct the input or try again.

**5. Stopping the Servers:**

- To stop the backend server, go to the terminal where it’s running and press **Ctrl+C**.
- To stop the React development server, do the same in its terminal. Both servers will shut down.

Now you have WeatherAI up and running locally. You can experiment by searching for different cities and observing the advice given by the AI for each weather condition!

---

## Example .env

The backend server (`weather-ai-b`) requires a `.env` file for configuration. Below is an example of what the `.env` file should contain, with placeholders for your actual API keys:

```bash
OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
WEATHER_API_KEY=YOUR_OPENWEATHERMAP_API_KEY_HERE
PORT=5000
```

**Explanation of each variable:**

- **OPENAI_API_KEY:** Your API key for the OpenAI service, used to authenticate requests to the OpenAI API. You can obtain this by creating an account on OpenAI’s platform and generating a secret API key.
- **WEATHER_API_KEY:** Your API key for OpenWeatherMap, used to fetch weather data. Sign up on the OpenWeatherMap website to get a free API key for current weather data.
- **PORT:** The port number on which the Node.js backend server will run. In this example, we use `5000`. You can choose a different port if needed (especially if 5000 is in use), but make sure to also update the frontend configuration (`BASE_API_URL`) to match the new port.

---

## Technologies Used

WeatherAI is built with a modern web development stack and integrates external services. The key technologies and libraries used in this project include:

- **Node.js & Express:** The runtime and web framework for building the backend API server. Express handles routing and request processing for the backend.
- **React:** The library used for building the frontend user interface. React components render the search input, results, and theme toggling functionality.
- **Axios:** Used on the frontend (and potentially on the backend) for making HTTP requests. The React app uses Axios to send requests to the backend API.
- **Sass (Syntactically Awesome Style Sheets):** Used for styling the React application. Sass allows writing cleaner and more modular CSS for the UI (the project includes `.sass` files for styles).
- **OpenWeatherMap API:** An external service providing weather data. The backend calls OpenWeatherMap’s API endpoints (using the `WEATHER_API_KEY`) to retrieve current weather information for the requested city.
- **OpenAI API:** An external service (from OpenAI) used to generate text-based advice or tips. The backend uses the OpenAI API (with the `OPENAI_API_KEY`) to create a short suggestion based on the weather. This could be implemented using OpenAI’s GPT-3/GPT-4 models to produce a human-like tip (e.g., advice on clothing or precautions for the weather).
- **dotenv:** A Node.js library (if used) to load environment variables from the `.env` file. This simplifies configuration management for the backend.

All these technologies work together to deliver the functionality of WeatherAI. The choice of a separate backend and frontend gives flexibility in development and a clear separation of concerns: React handles the user experience, while Node/Express handles external API communication and forms the bridge between the UI and external services.

---