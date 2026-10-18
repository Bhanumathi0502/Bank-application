# MyBank - Banking Application

## 1. Project Title

**MyBank - Banking Application**

## 2. Description / Motivation

MyBank is a web-based banking management application developed to demonstrate basic banking operations through a simple and user-friendly interface.

The main purpose of this project is to make basic account management easier and to demonstrate how a banking application can be developed using web technologies.

This project is designed for students and users who want to understand basic banking operations and frontend web development.

The application allows users to create bank accounts, deposit money, withdraw money, view account details, search for accounts, and view transaction history.

This project was developed as part of a coding assignment to practice application development, JavaScript functionality, data handling, and responsive user interface design.

## 3. Installation Guidelines

### Prerequisites

Before running the application, make sure you have:

- Visual Studio Code
- Node.js (only if required by your project setup)
- A modern web browser
- Live Server extension for Visual Studio Code
- Git (for cloning the repository)

### Step 1: Clone the Repository

Clone the project from GitHub using the following command:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### Step 2: Open the Project Folder

```bash
cd Banking-Application
```

### Step 3: Open in Visual Studio Code

Open the project folder in Visual Studio Code.

### Step 4: Run the Application

Open the `public` folder and locate `index.html`.

Right-click the file and select **Open with Live Server**.

The application will open in your default web browser.

**Note:** The current frontend demonstration does not require a backend server or database. If your existing project uses a backend API, follow the backend installation instructions for that project instead.

## 4. Screenshots

Screenshots of the application demonstrate its user interface and main features.

### Home Page

The home page displays the dashboard, account summary, total balance, transaction count, and quick action buttons.

![MyBank Home Page](screenshots/home.png)

### Create Account

Users can create a new bank account by entering the account holder's name, account number, and initial balance.

![MyBank Create Account](screenshots/create-account.png)

### Deposit Money

Users can select an account and deposit money into it.

![MyBank Deposit](screenshots/deposit.png)

### Withdraw Money

Users can withdraw money from an account, subject to the available balance.

![MyBank Withdraw](screenshots/withdraw.png)

### All Accounts

Users can view all registered accounts, search by name or account number, and delete an account record.

![MyBank All Accounts](screenshots/accounts.png)

### Transaction History

Users can view recorded deposits and withdrawals, including the account details, transaction type, amount, and date.

![MyBank Transactions](screenshots/transactions.png)

**Screenshot instructions:** Create a folder named `screenshots` in the main project directory. Save the corresponding screenshots using the filenames shown above. The images must be uploaded to GitHub for them to appear in the README.

## 5. Technologies Used

The project uses the following technologies:

- **HTML5:** Creates the structure of the application.
- **CSS3:** Provides styling, layout, and responsive design.
- **JavaScript:** Implements account management and banking operations.
- **Browser Local Storage:** Stores demonstration data in the browser, if used by the current implementation.
- **Git:** Tracks source code changes.
- **GitHub:** Hosts the project repository.
- **Visual Studio Code:** Used for development and testing.

## 6. Features

The main features of MyBank include:

1. **Home Dashboard:** Displays account summaries and quick actions.
2. **Create Account:** Creates a new bank account record.
3. **Deposit Money:** Adds money to an existing account.
4. **Withdraw Money:** Deducts money from an account when sufficient funds are available.
5. **All Accounts:** Displays account details, including name, account number, and balance.
6. **Search Accounts:** Searches for accounts by name or account number.
7. **Delete Account:** Removes an account record.
8. **Transaction History:** Displays recorded deposits and withdrawals.
9. **Form Validation:** Checks user input and prevents duplicate account numbers.
10. **Responsive Design:** Adapts the interface to different screen sizes.
11. **Data Persistence:** Retains demonstration records in browser Local Storage when that storage mechanism is used.

## 7. Future Enhancements

The following improvements can be considered for future versions:

- User registration and login.
- Secure authentication and authorization.
- Backend API integration.
- Database integration using MongoDB.
- Money transfers between accounts.
- Improved transaction history and filtering.
- Account statements and downloadable reports.
- Automated unit and integration testing.
- Stronger server-side validation and security controls.

## 8. License

This project is intended for educational purposes.

The project owner can choose an appropriate open-source license, such as the MIT License, before publishing the project.

If the project is released under the MIT License, include the standard MIT License text in a file named `LICENSE` in the root directory.

## 9. Important Note

MyBank is a student demonstration project and is not intended for real banking transactions.

If the current implementation uses browser Local Storage, the data is stored locally in the browser and is not automatically shared across devices or users. A production banking application requires a secure backend, persistent database, proper authentication, authorization, and additional security measures.

## 10. Author

**Project:** MyBank - Banking Application

**Purpose:** Coding Assignment 7 - Review Your README

**Repository:** Add your GitHub repository URL here.
