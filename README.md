# Chemical Compounds Web Application

A web application for managing and exploring chemical compounds, developed using Angular, Node.js/Express.js, and MySQL. This app allows users to browse a gallery of compounds, view detailed information, add, edit, or delete compounds, and features search, sort, pagination, and a responsive design for seamless use across devices.

This project includes the following deliverables as part of the assignment submission:

- **Source Code**: The complete project code is hosted on GitHub: (https://github.com/TINOREJI/chemical-compound-app-tino.)
- **API Documentation**: A Postman collection documenting the backend API endpoints is available in the repository:(https://github.com/TINOREJI/chemical-compound-app-tino/blob/main/Chemical%20Compounds%20App%20Tino's.postman_collection.json) 
- **Screen Recording**: A video demonstrating the app’s functionality (pagination, navigation, edit workflow, and responsive design) is included in the repository: (https://drive.google.com/file/d/1FUVbx5HbBpioH2biY_xQkhz7KYTVkhkq/view?usp=drive_link)

## Features

- **Compound Gallery**: View compounds in a grid layout with pagination (10 items per page).
- **Dynamic Routing**: Access detailed compound pages (e.g., `/compounds/1`).
- **CRUD Operations**: Add, edit, and delete compounds through an intuitive edit page.
- **Search and Sort**: Filter compounds by name and sort by name (ascending or descending).
- **Responsive Design**: Optimized for desktop, tablet, and mobile screens.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Git**: To clone the repository.
- **Node.js and npm**: Version 18.x recommended (used during development).
- **MySQL**: Ensure MySQL Server is running on `localhost:3306` (default port).
- **Angular CLI**: Required for the frontend (`npm install -g @angular/cli@19.2.13`).

## Setup Instructions

Follow these steps to set up and run the app locally.

### 1. Clone the Repository

Clone the project from GitHub and navigate to the project directory:

```bash
git clone https://github.com/TINOREJI/chemical-compound-app-tino.git
cd chemical-compound-app-tino
```

### 2. Verify Directory Structure

Ensure your project directory matches the following structure:

```
chemical-compound-app-tino/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   └── compound-schema.js
│   ├── routes/
│   │   └── compounds.js
│   ├── scripts/
│   │   └── import-csv.js
│   │   └── db-creation.js
│   ├── csv-file/
│   │   └── compound.csv
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   └── app/
│   ├── angular.json
│   └── package.json
└── README.md
```

### 3. Set Up the Database

1. **Install and Start MySQL**  
   Ensure MySQL is installed and running on `localhost:3306`. Log in to MySQL to verify:

   ```bash
   mysql -uroot -p
   ```

   Enter your MySQL root password (configure one if not set).

2. **Create the Database**  
   Create a database named `chemical_compounds`:

   ```sql
   CREATE DATABASE chemical_compounds;
   ```
   OR
    ```
   node scripts/db-creation.js
   ```

4. **Import Schema and Data**  
   The `import-csv.js` script will set up the database schema and import initial data from `compounds.csv`:

   ```bash
   cd backend
   node scripts/import-csv.js
   ```
    ![image](https://github.com/user-attachments/assets/349b3809-e286-494f-b3b4-4565d7298488)

   This script creates the `compounds` table and populates it with 30 compounds.

   To verify the data, connect to MySQL:

   ```bash
   mysql -uroot -p
   ```

   Enter your password, then:

   ```sql
   USE chemical_compounds;
   SELECT * FROM compounds;
   ```

   You should see 30 compounds (e.g., “Ammonium,” “Methylammonium Iodide,” etc.).
    ![image](https://github.com/user-attachments/assets/5312c6b0-ddaa-456e-8f51-886c752cb5cb)

   

### 4. Run the Backend

1. **Install Dependencies**  
   From the `backend` directory, install the required Node.js packages:

   ```bash
   cd backend
   npm install
   ```

2. **Start the Backend**  
   Launch the backend server:

   ```bash
   npm start
   ```
    ![image](https://github.com/user-attachments/assets/0b40ac33-e9c5-4d40-ae5d-7c34f93e2f37)

   The backend will run on `http://localhost:3000`. Look for logs confirming “Database connected” and “Server running on port 3000”.

   Test the backend by visiting `http://localhost:3000/compounds?page=1&limit=10` in your browser. You should see a JSON response with a list of compounds:
    ![image](https://github.com/user-attachments/assets/af98a2a4-4440-4d9e-b5b2-a0895b6c863d)

   
### 5. Run the Frontend

1. **Install Dependencies**  
   Navigate to the `frontend` directory and install the required packages:

   ```bash
   cd ../frontend
   npm install
   ```

2. **Start the Frontend**  
   Launch the Angular development server:

   ```bash
   ng serve
   ```
    
   The frontend will run on `http://localhost:4200`.

   Open `http://localhost:4200` in your browser to access the compound gallery:

   ![image](https://github.com/user-attachments/assets/99b7242f-1c3c-4282-8ac0-4135aa7eb7ef)
   
   


### 6. Access the Application

- **Frontend**: Visit `http://localhost:4200` to explore the compound gallery, featuring pagination, search, and sort functionality.
 ![image](https://github.com/user-attachments/assets/af7d25f5-9ed9-4eef-87ed-27912d24ee0e)
 ![image](https://github.com/user-attachments/assets/6eed00e5-2a9e-47e9-abf5-8b5f12b4e4ef)
![image](https://github.com/user-attachments/assets/72d74ddc-59ae-4900-9cbf-069d33fe9ea4)
![image](https://github.com/user-attachments/assets/5c85bb38-dbe8-45a4-9d39-b1b9a4de4324)
![image](https://github.com/user-attachments/assets/82c9094b-b15a-4b35-be1d-f5834f0c159f)

- **Backend**: Access API endpoints like `http://localhost:3000/compounds?page=1&limit=10` to retrieve compound data.

## Project Structure

- **`backend/`**: Node.js/Express.js backend with MySQL integration.
  - `index.js`: Entry point for the backend server.
  - `routes/compounds.js`: API routes for compound CRUD operations.
  - `config/database.js`: Database configuration using Sequelize.
  - `models/compound-schema.js`: Sequelize model for the `compounds` table.
  - `scripts/import-csv.js`: Script to initialize the database and import data from `compounds.csv`.
  - `compounds.csv`: Initial dataset containing 30 compounds.
- **`frontend/`**: Angular frontend with Angular Material.
  - `src/app/`: Contains Angular components, services, and modules.
  - `src/app/services/compound.service.ts`: Service for interacting with the backend API.

## Screen Recording

A screen recording showcasing the app’s functionality is included in the GDrive Link:

- **File**: `Chemical_Compounds_Demo.mp4`
- **Features Demonstrated**:
  - **Pagination**: Navigating through pages in the compound gallery.
  - **Navigation**: Moving between the gallery, details, and edit pages.
  - **Edit Workflow**: Editing a compound and verifying the update.
  - **Responsive Design**: Displaying the app on a mobile viewport.

To view, open `Chemical_Compounds_Demo.mp4` in a media player.

![Screen recording preview](images/screen-recording-preview.png)

## Troubleshooting

- **Database Connection Issues**:
  - Ensure MySQL is running on `localhost:3306`.
  - Verify your MySQL root password matches the one in `backend/config/database.js`.
  - Check backend logs for connection errors.
- **Frontend Not Loading**:
  - Confirm the backend is running on `http://localhost:3000`.
  - Ensure `CompoundService` in `frontend/src/app/services/compound.service.ts` points to `http://localhost:3000/compounds`.
- **Backend API Errors**:
  - Verify the database is populated (`node scripts/import-csv.js`).
  - Check backend logs for errors.

