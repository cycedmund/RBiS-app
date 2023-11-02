# RBiS

## Problem Statement

RBiS is an application designed to improve the training experience for RBS 70 trainees and instructors within the RSAF. The app aims to streamline the following two aspects:

### Trainee Parade State and Location Tracking:

**Problem:** The current process relies on Telegram group chats for disseminating trainee parade state and location information. This process is prone to delays and inaccuracies, potentially affecting training schedules.

![Telegram Screenshot](/client/public/assets/telegram.jpeg)

**RBiS:** Simplifies this process by providing a platform where trainees can effortlessly update and access their parade state and current location information.

### Equipment Management:

**Problem:** In the existing system, trainees manually record equipment usage and track its movement in and out of the shared store.

**RBiS:** Trainees will have the ability to indicate which equipment is currently in use and when it has been returned to the store, all through a simple user interface.

## Table of Contents

- [Problem Statement](#problem-statement)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Links](#links)
- [Features](#features)
  - [Instructor](#instructor)
  - [Trainee](#trainee)
- [Main Codes](#main-codes)
  - [Favourite Controller](#favourite-controller)
  - [Favourite React Component](#favourite-react-component)
- [Share the Experience](#share-the-experience)
  - [Biggest Challenge](#biggest-challenge)
  - [Key Learnings/Takeaways](#key-learningstakeaways)
- [Acknowledgements](#acknowledgements)

## Screenshots

**Main:**

![App Screenshot](/client/public/assets/screenshotrbis1.jpeg)

**Course:**

![App Screenshot](/client/public/assets/screenshotrbis2.jpeg)

**Equipment:**

![App Screenshot](/client/public/assets/screenshotrbis3.jpeg)

## Tech Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB, Mongoose

## Links

- [RBiS](https://rbis-app.onrender.com)

- [Trello](https://trello.com/b/zdQEvmtg/rbisstored-rbs)

- [ERD](https://lucid.app/lucidchart/69b7405d-8d68-4d45-9646-ee41d7367808/edit?view_items=LyeFk._RdPCk&invitationId=inv_e6e71243-2b61-4925-a2ad-ff1d1f6d0775)

## Features

- Cross Platform (almost there)

#### Instructor

1. Manage Equipment (Add, Update, Delete)
2. Track Equipment Check-ins and Check-outs
3. Add Equipment Descriptions
4. Assign to or Remove from Courses
5. Delete Courses and Trainees
6. Appoint In-Charge (Course and Weapon Store) for Weeks
7. View Course and Equipment Overviews

#### Trainee

1. Check in and out Equipment
2. Add Equipment Descriptions
3. Edit Parade State and Location
4. Course IC: Update All Trainees' Status and Location (Not Targeted Individual)
5. View Equipment Status
6. Weapon Store IC: Manage Equipment (Check-in, Check-out, Add Description)
7. View Course and Equipment Overviews

## Next Steps

1. Implement sgID for Authentication and Authorization.
2. Enhance the app's mobile experience.
3. Provide crucial equipment information, such as servicing details.
4. Integrate equipment forecast for the day and training schedule.
5. Include a "Report Sick" status with a remarks column to indicate duration.
6. Develop a user activities page to track individual actions, ensuring better accountability and store management.
7. Introduce notifications to keep users informed about specific events.

## Main Codes

### Favourite Controller:

- Don't have a specific favorite, but the most challenging one was dealing with the equipment controller. My data design was poor, which caused a lot of issues. I ended up having my equipment units referenced, which I probably shouldn't have. This led to difficulties when I needed to access parent categories from the internal array, causing problems during mapping.

### Favourite React Component:

- Again, I don't have a favorite, but the most challenging one was creating the form with Swal. I had to build the HTML form in Swal, which, in hindsight, was not the best decision. I ended up using JavaScript to get it to work for the HTML in Swal. This was a struggle for me because I had forgotten a lot about DOM manipulation.

## Share the Experience

### Biggest Challenge

- My biggest challenge was dealing with the equipment data structure.
  - Made the mistake of referencing equipment units, which caused difficulties when I needed to access parent categories.
  - This led to issues during data mapping.

### Key Learnings/Takeaways:

- Importance of creating a wireframe.

  - Resulted in a less organized layout.
  - I learned that proper planning and wireframing are crucial for a smoother development process.

- Importance of data design, especially in terms of referencing and data structure.
  - My structure wasn't well-planned, which led to complex data retrieval and manipulation.
  - Probably should have embedded the Equipment Units.

## Acknowledgements

- [A lot of Googling](https://google.com)
- [Stack Overflow](https://stackoverflow.com/)
- [Quotes to motivate myself to push through Project 4](https://www.countryliving.com/life/g32102614/never-give-up-quotes/)
