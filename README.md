# Pokemon

# Technologies Used
C# Dev Kit
.net SDK https://dotnet.microsoft.com/en-us/download
React SDK https://react.dev/learn/installation
npm(node package manager)

# commands to create this project

# API
dotnet new webapi -o PokemonAPI
dotnet add package Microsoft.AspNetCore.Cors
dotnet add package Newtonsoft.Json


# FrontEnd
npx create-react-app pokemon-dashboard
npm install axios react-router-dom

# Testing (doesnt pass due to configuration and running out of time)
npm install --save-dev @babel/core @babel/preset-env babel-jest @babel/preset-react

# commands to run project
dotnet run -- on backend directory
npm start -- on frontend directory

# ports
backend - 5000 || 5001
frontend - 3000 || 3001