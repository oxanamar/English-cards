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
  A dedicated table enables users to manage their vocabulary dynamically. Words can be added with real-time validation to ensure no field is left empty, edited to update existing entries, and deleted when no longer needed. This feature is powered by a backend API that synchronizes changes in real time.

- **Progress Tracking**:  
  The app tracks the number of words users have learned. Progress is displayed prominently, motivating users to continue learning and achieve their language goals.

- **Responsive Design**:
  Built with mobile-first principles, the app ensures a seamless experience across devices, allowing users to learn on the go.

## 🛠️ Tech Stack

### **Frontend**

- **React.js:**  
  Used for building dynamic, reusable, and interactive UI components.

- **React Router:**  
  Enables client-side routing and navigation between different pages.

- **MobX:**  
  Utilized for state management, providing reactive updates to the application's state.

- **CSS Modules:**  
  Scoped CSS for styling components, ensuring no global namespace conflicts.

- **React Icons:**  
  Integrated for adding scalable vector icons to enhance the UI.

### **Backend API**

- **Axios:**  
  For handling HTTP requests to the API, performing CRUD operations efficiently.

- **Custom REST API:**  
  The app interacts with a REST API hosted at [http://itgirlschool.justmakeit.ru/api/words](http://itgirlschool.justmakeit.ru/api/words) to manage vocabulary data.


## 👩🏼‍🎨 Design Choices

- **Use of MobX for State Management:**  
  MobX was chosen for its simplicity and ease of integration with React components. Its observable state and action-based updates make it well-suited for managing dynamic data like the word list.

- **Dynamic Flashcard Design:**  
  The flashcards use active recall principles to enhance memory retention. The toggle functionality for translations ensures that users engage actively with the content.

- **Separation of Concerns:**  
  The project follows a modular structure, with separate files for components, state management, and styles. This improves maintainability and scalability.


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
  
`src/stores/WordStore.js`
 - Purpose:
   Manages the state of words using MobX. Handles CRUD operations for words and communicates with the API.
 - Key Features:
   - `fetchWords`: Fetches all words from the API.
   - `addWord`: Sends a POST request to add a new word.
   - `updateWord`: Updates an existing word via the API.
   - `deleteWord`: Deletes a word by ID using the API.
   - Utilizes MobX's `makeAutoObservable` for reactive state management and `runInAction` to update state safely.
  
`src/context/WordContext.js`
 - Purpose:
    Provides a global context for accessing `WordStore` across the application.
 - Key Features:
   - Creates a React context for `WordStore`.
   - Wraps the application in `WordProvider`, allowing child components to access the word store.
  
`src/data.js`
 - Purpose:
    Contains static sample data for testing or fallback purposes.
 - Key Features:
   - Includes an array of objects representing words with their `id`, `english`, `transcription`, `russian`, `tags`, and `tags_json`.
   - Useful for initializing the application or testing features without relying on the API.


## 🔮 Future Enhancements

- **User Accounts:**  
  Integrating user accounts would allow learners to save their progress and access their vocabulary on different devices.

- **Advanced Analytics:**  
  Adding detailed progress tracking and statistics, such as time spent learning and accuracy rates, would provide more insights into user performance.

- **Word Categories:**  
  Grouping words into categories like "Business", "Travel", and "Everyday Vocabulary" would help users focus on specific areas.

- **Speech Recognition:**  
  Integrating a speech recognition feature would let users practice pronunciation and improve their speaking skills.

## Installation and Setup

#### Step 1: Clone the Repository
Clone the project to your local machine using the following command:

```bash
git clone https://github.com/oxanamar/English-cards.git
cd English-cards
```

#### Step 2: Install dependencies
Navigate to the project directory and install all necessary dependencies:

```bash
npm install
```

#### Step 3: Start the development server
Run the following command to start the application locally:

```bash
npm start
```

#### Step 4: Open your browser and go to `http://localhost:3000` to explore the English Cards app! 🎉






