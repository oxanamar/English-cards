# English Cards 🔠📚 

#### Video Demo: https://youtu.be/LlFKP6RJas4
#### Description: English Cards is an interactive web application designed for English language learners of all levels. The app serves as a personal vocabulary manager and interactive flashcard game, offering a unique blend of structured learning and gamified elements. Users can explore, manage, and practice a customizable collection of English words. Unlike traditional learning methods, English Cards emphasizes engagement and efficiency by integrating dynamic flashcards, real-time updates, and progress tracking into a single intuitive interface.

<div style="display: flex; justify-content: space-between; align-items: center;">
  <img src="https://github.com/user-attachments/assets/d17f7675-8351-43ac-b3cb-52f8b83c65c8" alt="eng-cards1" width="45%" style="margin-right: 10px;" />
  <img src="https://github.com/user-attachments/assets/d7f1f871-ba8a-448e-be9f-62d57bd90a7f" alt="eng-cards2" width="45%" />
</div>


## ✨ Features

- **Dynamic Flashcards**:  
  Users can navigate through a set of vocabulary cards, each featuring an English word, its transcription, and its translation. Cards are displayed one at a time to mimic traditional flashcards, with a "Check" button to reveal the translation. Clicking the translation toggles back to the "Check" button, encouraging active recall.

- **CRUD Table for Word Management**:  
  A dedicated table enables users to manage their vocabulary dynamically. Words can be added with real-time validation to ensure no field is left empty, edited to update existing entries, and deleted when no longer needed.

- **Progress Tracking**:  
  The app tracks the number of words users have learned. Progress is displayed prominently, motivating users to continue learning and achieve their language goals.

- **Responsive Design**:
  Built with mobile-first principles, the app ensures a seamless experience across devices, allowing users to learn on the go.

## 🛠️ Tech Stack

<img align="left" alt="React.js" width="26px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style="padding-right:10px;" />

<br>
<br>


## 📂 File-by-File Explanation
`src/components/App.jsx`
 - Purpose:
   The root component of the application. It sets up routing for the application and provides global state management via the WordProvider context.
 - Key Features:
   Wraps the entire app in the WordProvider to manage the word state globally.
   - Configures routes:
     - / renders the Table component for CRUD operations.
     - /game renders the Game component for vocabulary practice.
     - Any other route (*) renders the ErrorPage for a 404 error.
    
`src/components/Header/Header.jsx`
 - Purpose:
   Displays the navigation header with links to the home page and the game page.
 - Key Features:
   - Provides navigation buttons for easy access to different parts of the app.
   - Displays the logo as a clickable element to redirect to the home page.
   - Uses responsive design to adjust for different screen sizes.

`src/components/Table/Table.jsx`
 - Purpose:
   Allows users to manage their vocabulary through a CRUD interface (Create, Read, Update, Delete).
 - Key Features:
   - Displays a table with columns for ID, English word, transcription, Russian translation, and tags.
   - Provides input fields to add new words with validation to ensure all fields are filled.
   - Allows users to edit and delete existing words in the table.
   - Synchronizes all operations with the backend API using WordContext.
   - Highlights empty fields with a red border when validation fails.
  
`src/components/Game/Game.jsx`
 - Purpose:
   Implements an interactive flashcard game to help users practice their vocabulary.
 - Key Features:
   - Displays one word card at a time, showing the English word and transcription.
   - Reveals the translation when the "CHECK" button is clicked.
   - Allows toggling back to the "CHECK" button by clicking on the translation.
   - Tracks the number of learned words and provides navigation between cards.
   - Fully integrated with the backend to fetch vocabulary dynamically.
  
`src/components/ErrorPage/ErrorPage.jsx`
 - Purpose:
   Handles undefined routes in the application by displaying a user-friendly 404 error message.
 - Key Features:
   - Displays a simple "404 Not Found" message.
  
`src/components/ErrorPage/ErrorPage.jsx`
 - Purpose:
   Handles undefined routes in the application by displaying a user-friendly 404 error message.
 - Key Features:
   - Displays a simple "404 Not Found" message.
   - Ensures a smooth user experience for invalid or broken links.


## Installation and Setup

#### Step 1: Clone the Repository
```bash
git clone https://github.com/oxanamar/English-cards.git
cd English-cards
```

#### Step 2: Install dependencies
Inside the project directory, run the following command to install Express and other dependencies:
```bash
npm install
```

#### Step 3: Start the development server
```bash
npm start
```

#### Step 4: Open your browser and go to `http://localhost:3000` to see the project in action 🙌🏻

