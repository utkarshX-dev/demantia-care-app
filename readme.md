# 💊 Dementia Care Support Website

A full-stack web application designed to assist dementia patients and their caregivers. The platform offers medicine reminders, appointment alerts, and a caregiver monitoring portal.

---

## 💡 Features

- 🕰️ Medicine intake reminders
- 📅 Appointment scheduling
- 🧑‍🤝‍🧑 Caregiver monitoring portal
- 📈 Simple and user-friendly interface

---

## ⚙️ Tech Stack

| Area        | Tech Used                |
|-------------|--------------------------|
| Frontend    | HTML, CSS, JavaScript    |
| Backend     | Node.js, Express.js      |
| Database    | MongoDB, Mongoose        |
| Testing     | Postman / Fetch API      |
| Deployment  | (To be decided)          |

---

## 🗂️ Project Structure
dementia-care-app/
├── backend/
│   ├── server.js                # Main Express server file
│   ├── models/
│   │   └── Reminder.js          # Mongoose schema for medicine reminders
│   ├── routes/
│   │   └── reminderRoutes.js    # API routes for reminders
│   └── controllers/
│       └── reminderController.js # (Optional) Business logic for routes
│
├── frontend/
│   ├── index.html               # Main HTML file
│   ├── styles.css               # CSS styling
│   └── app.js                   # JavaScript for frontend logic (fetch, events)
│
├── .env                          # Environment variables (MongoDB URI, etc.)
├── package.json                  # Node.js dependencies
└── README.md                     # Project documentation

