# WanderWise AI

Welcome to WanderWise AI, your personal AI-powered travel agent. This application leverages generative AI to create personalized travel itineraries based on your destination and duration of stay. Whether you're looking for inspiration or a detailed plan for your next trip, WanderWise AI is here to help.

## Core Features

-   **AI Itinerary Generation**: Enter a city and the number of days for your visit, and our AI will generate a custom travel plan for you.
-   **Itinerary Revision**: Not satisfied with the suggestion? Click the 'Revise' button to get a new, alternative itinerary.
-   **Default Itineraries**: Explore curated travel plans for popular destinations like Paris, Tokyo, and Rome to get inspired for your next adventure.
-   **Detailed Suggestions**: Each itinerary includes day-by-day activities, including spots to visit, things to do, ticket information, interesting facts, and recent reviews.

## Tech Stack

This project is built with a modern, robust technology stack:

-   **Next.js**: A React framework for building fast, server-rendered applications.
-   **React**: A JavaScript library for building user interfaces.
-   **Genkit (Google AI)**: Powers the generative AI features for creating and revising itineraries.
-   **TypeScript**: For static typing and improved code quality.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **Shadcn/ui**: A collection of beautifully designed, reusable components.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or newer)
-   npm or yarn

### Installation & Running

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/wanderwise-ai.git
    cd wanderwise-ai
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your Google AI API key:
    ```
    GOOGLE_API_KEY=your_google_ai_api_key
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## How it Works

The application uses AI agents defined in the `src/ai/flows` directory. These are server-side functions that communicate with the Google AI platform via Genkit to generate content.

-   `generate-travel-itinerary.ts`: Creates an itinerary from scratch based on user input.
-   `revise-travel-itinerary.ts`: Takes an existing itinerary and user preferences to create a new version.
-   `populate-default-itineraries.ts`: Generates the curated itineraries displayed on the homepage.

### A Note on "Personal MCP Server"

The user asked about a "personal MCP server regarding the city details". This application does not require a personal server for city data. The AI models used (like Google's Gemini) are pre-trained on a vast amount of text and data from the internet, which includes extensive knowledge about cities, landmarks, and travel information. The application securely communicates with Google's AI services via APIs, which are managed by the Genkit library, to access this knowledge and generate itineraries.

The `getLocationDetails` tool in `src/ai/tools/location-tools.ts` is currently a **simulation** that uses hardcoded data for popular landmarks. This allows the AI to create realistic schedules without needing a real-time Maps API key. This design makes it easy to integrate a real data source in the future without changing the core AI logic.