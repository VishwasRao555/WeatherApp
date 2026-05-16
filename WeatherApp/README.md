# 🌦️ WeatherApp

A modern and responsive weather application built using **React + Vite** that provides real-time weather updates for cities around the world using the OpenWeatherMap API.

---

## 🚀 Features

- 🌍 Search weather by city name
- 🌡️ Real-time temperature updates
- 💨 Wind speed and humidity details
- ☁️ Dynamic weather condition icons
- ⚡ Fast and optimized performance with Vite
- 📱 Fully responsive design
- 🎨 Clean and modern user interface

---

# 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| ⚛️ React | Frontend Framework |
| ⚡ Vite | Build Tool & Development Server |
| 🎨 CSS3 | Styling & Responsive Design |
| 🌐 OpenWeatherMap API | Fetching Weather Data |
| 📦 JavaScript (ES6+) | Application Logic |

---

# 📂 Project Architecture

```bash
WeatherApp/
│
├── public/
│
├── src/
│   ├── assets/              # Weather icons & images
│   ├── components/          # Reusable React components
│   │   └── Weather.jsx
│   │
│   ├── App.jsx              # Main App component
│   ├── main.jsx             # Entry point
│   ├── App.css              # Main styling
│   └── index.css            # Global styles
│
├── package.json
├── vite.config.js
└── README.md
```

---

# ⚙️ How the Project Works

1. User enters a city name
2. React handles the input
3. API request is sent to OpenWeatherMap
4. Weather data is fetched dynamically
5. UI updates instantly with:
   - Temperature
   - Humidity
   - Wind Speed
   - Weather Condition

---

# 🔑 API Integration

This project uses the OpenWeatherMap API.

Example API Request:

```js
https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=YOUR_API_KEY
```

---

# 💻 Run the Project Locally

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/weatherapp.git
```

---

## 2️⃣ Navigate into the Project Folder

```bash
cd weatherapp
```

---

## 3️⃣ Install Dependencies

```bash
npm install
```

---

## 4️⃣ Create API Key

- Visit https://openweathermap.org/
- Create a free account
- Generate your API key

---

## 5️⃣ Add Environment Variable

Create a `.env` file in the root folder and add:

```env
VITE_APP_ID=your_api_key_here
```

---

## 6️⃣ Run the Development Server

```bash
npm run dev
```

The application will start on:

```bash
http://localhost:5173
```

---

# 📸 Screenshots

Add your project screenshots here.

```bash
screenshots/
├── home.png
└── weather-result.png
```

---

# 🌟 Future Improvements

- 📍 Current location weather
- 🌙 Dark mode
- 📅 7-day forecast
- 🌐 Multi-language support
- 🗺️ Weather maps integration

---

# 📚 Learning Outcomes

Through this project, I learned:

- React component architecture
- API integration using Fetch API
- State management with React Hooks
- Responsive UI development
- Environment variables in Vite
- Dynamic rendering of real-time data

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to your branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

VISHWAS RAO   