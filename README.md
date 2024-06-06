# ESG Dashboard Case Study 📊🌍
## Overview
Welcome to the ESG Dashboard Case Study! This project is a fork from Kiosk's case study repository, aimed at building a comprehensive and user-friendly dashboard for Environmental, Social, and Governance (ESG) data. The goal is to provide insightful visualizations that are accessible and easy to understand.

## Project Context
Kiosk is developing an ESG reporting tool to help companies comply with CSRD. The dashboard is a crucial component of this tool, enabling clients to visualize their ESG data meaningfully and drive change. This project involves creating the front-end from scratch, focusing on enhancing user experience and visual clarity for ESG reporting.

## Task Description
### Provided by Kiosk
As part of the case study, I was tasked to:

1. Create an Interactive Dashboard:
* Visualize ESG indicators including total revenue, total CO₂ emissions, total headcount, and gender parity ratio (female headcount / total headcount).
* Allow users to select time granularity (yearly or monthly) and time boundaries.
* Enable filtering metrics by dimensions (e.g., only show data from France).

2. Backend Integration:
* Handle data fetching from provided API endpoints for dimensions and indicators.

### My Implementation
In this project, I focused on:
* **Building the front-end from scratch** using React, TypeScript, and TailwindCSS.
* **Ensuring visual clarity** by scaling different indicators appropriately and using separate Y-axes where necessary.
* **Enhancing user experience** with interactive elements for time granularity and date range selection.
* **Using React Select and Ant Design** for improved UI components.

### Project Status
* 🚧**Work in Progress**: The project is still ongoing, with several enhancements and refinements planned.
* ⏱**Time Spent**: Approximately 6 hours have been spent on this project so far.

### Technologies Used
* ⚛️ **React**
* 🔧 **TypeScript**
* 💅 **TailwindCSS**
* 🧩 **Ant Design**
* ⚡ **Vite**
* 🔗 **Axios**
* 📊 **Recharts**
* 🔽 **React Select**

## Challenges Faced
* **API and Data Handling**: Adapting to changes in the backend API, dealing with CORS issues, managing data fetching and handling.
* **Data Management**: Filtering data based on user input, ensuring correct data display, planning to integrate TanStack.
* **Data Scaling and Visualization**: Scaling ESG indicators, ensuring visibility and clarity, optimizing performance, and ensuring responsiveness.
* **UI and UX Enhancements**: Implementing UI components and charts using unfamilliar tools like Recharts and Ant Design. 

## Future Work
* **Integrating TanStack Query for State Management**: To improve state management across the application.
* **Improving UI**: Enhancing the responsiveness, improve styling and interactivity of the user interface.
* **Improving Code Architecture**: Refactoring the codebase to improve modularity and ease of deployment.

## How to Use
### Installation
1. Clone the repository:
```
git clone https://github.com/sludovicdelys/case_studies.git
```

2. Navigate to the project directory:
```
cd esg-dashboard-case-study
```
3. Install dependencies:
```
npm install
```

### Running the Project
To start the development server, run:
```
npm run dev
```

The dashboard will be available at http://localhost:5173/.

### Building the Project
To build the project for production, run:
```
npm run build
```

### Previewing the Production Build
To preview the production build locally, run:
```
npm run preview
```

### Linting the Code
To lint the codebase, run:
```
npm run lint
```

## Contributing
Contributions are welcome! If you have suggestions for improvements or encounter any issues, please feel free to submit a pull request or open an issue on GitHub.

## License
This project is licensed under the MIT License.

Thank you for visiting the ESG Dashboard Case Study repository. Your feedback and contributions are greatly appreciated! 🌟
