# BCCP

### Business Accreditation and Certification Platform

## This is a web application built with Django and React.

## Installation

1. Clone the repository: `git clone https://github.com/Satyam-79/BCCP-ITS_SIH.git`
2. Change to the project directory: `cd BCCP-ITS_SIH`
3. Change to the backend directory: `cd backend`
4. Install backend dependencies: `pip install -r requirements.txt`
5. Change to the frontend directory: `cd ..\frontend`
6. Install frontend dependencies: `npm install`

## Usage

1. Start the Django development server:
   ```
   cd backend
   python manage.py runserver
    ```

2. In a separate terminal, start the React development server:
    ```
    cd frontend
    npm start
    ```

3. Open your browser and visit: `http://localhost:8000`

## API
product create require 
```
    {
    "name":"Boxes",
    "description":"Cardboard boxex of size 3x4x3",
    "tags":["cardboard","Wooden Box"]
    }
```
with auth token in the header

register require as json
```
    email:user2@mail.com
    password:pY8JFRzCUPD4m9f
    password2:pY8JFRzCUPD4m9f
    customer:False
    first_name:user
    last_name:two
```
