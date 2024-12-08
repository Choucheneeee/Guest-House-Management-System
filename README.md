# Guest House Management System

This repository contains the following components:
1. **Admin Interface**: Angular-based interface for administrators.
2. **Client Interface**: Angular-based interface for clients.
3. **Mock Data Server**: Node.js server with mock data for testing.

---

## **Prerequisites**
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18.19.0)
- [Angular CLI](https://angular.io/cli) (v16.1.4)
- A web browser (e.g., Google Chrome)

---
## **Setup Instructions**
    git clone https://github.com/Choucheneeee/Guest-House-Management-System.git
    cd Guest-House-Management-System
## **Setting Up the Mock Data Server** 
    cd mock-data-server
    npm install
    node server.js
  The server will run on http://localhost:8081.
  
## ** Setting Up the Admin Interface**
    cd ../admin
    npm install
    ng serve --open
  The Admin interface will be accessible at http://localhost:4200.

## ** Setting Up the Client Interface **
    cd ../client
    npm install
    ng serve --open
  The Client interface will be accessible at http://localhost:4200 (will generate another port.)
