# Genova.Temp

A temporary website with which to test modern front-end concepts.

## Requirements

To develop and run this project locally, ensure you have the following installed:

- **.NET Core 8 SDK** ([Download](https://dotnet.microsoft.com/download/dotnet/8.0))
- **Node.js** (LTS recommended) ([Download](https://nodejs.org/))
- **npm** (included with Node.js)
- **Visual Studio 2022** (latest version recommended)
- **Webpack** (installed via npm)

## Installation

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/Genova.Temp.git
cd Genova.Temp
```

### 2. Install Dependencies
Run the following command to install **npm dependencies**:
```sh
npm install
```

## Running the Project

### 1. Run Webpack in Watch Mode
To enable automatic SCSS compilation and live reload:
```sh
npm run dev
```

### 2. Start the ASP.NET Core Website
In **Visual Studio 2022**:
- Open the solution (`Genova.Temp.sln`).
- Set the **startup project** to the ASP.NET Core website.
- Press **F5** (Debug Mode) to start the application.

### 3. Open the Website
- The website should automatically open at `http://localhost:7170/` (or the assigned port).
- Webpack will watch for changes in SCSS files and update styles **without refreshing the page**.

## Project Structure
```
Genova.Temp/
├── Genova.Temp.sln          # Visual Studio solution file
├── Genova.Temp/             # ASP.NET Core Web Application
│   ├── Controllers/         # MVC Controllers
│   ├── Views/               # Razor Views
│   ├── wwwroot/             # Static Files (CSS, JS, etc.)
│   │   ├── -/styles/        # Compiled CSS from Webpack
│   │   ├── js/              # JavaScript files
│   ├── Startup.cs           # ASP.NET Core Configuration
│   ├── Program.cs           # Application Entry Point
├── Styles/                  # Source SCSS files
├── webpack.config.js        # Webpack Configuration
├── package.json             # npm Configuration
├── README.md                # Project Documentation
```

## Additional Notes
- If using **IIS Express**, check the assigned port in `launchSettings.json`.
- You can manually open the browser and navigate to `http://localhost:7170/` if it doesn’t open automatically.
- Modify `webpack.config.js` if you need to change Webpack’s behavior.
- If the assigned port for the ASP.NET Core website changes, update the `proxy` value in `webpack.config.js`.

## License
This project is for internal development and testing purposes. Modify as needed.

---

Enjoy coding! 🚀

