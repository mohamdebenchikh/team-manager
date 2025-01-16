# Team Manager

Team Manager is a web application that allows users to manage teams, collaborate, and organize tasks effectively. The app is built using **Laravel 11** for the backend and **React (with Inertia.js)** for the frontend, providing a modern and seamless user experience.

## Features

- **Team Management**:
  - Create and manage teams.
  - Invite other users to join a team.
  - Accept or decline invitations.

- **Task Management**:
  - Create, view, update, and delete tasks.
  - Assign tasks to specific team members.

- **Authentication & Profiles**:
  - User authentication with email/password.
  - Profile management with photo upload and bio.

- **Email Notifications**:
  - Send invitation emails to users.
  - Notify already registered users about invitations.
  - Allow invitees to accept or decline invitations directly.

- **Modern User Interface**:
  - Built with [shadcn/ui](https://shadcn.dev/) for a polished and modern theme.
  - Frontend built with React and Inertia.js for a responsive and dynamic experience.

## Technologies Used

- **Backend**: Laravel 11
- **Frontend**: React, Inertia.js, shadcn/ui
- **Database**: (Specify your database, e.g., MySQL, PostgreSQL, SQLite)
- **Email Service**: (Specify the email service used, e.g., SMTP, Mailgun)
- **Others**: Laravel Sanctum for authentication, file uploads for profile photos.

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mohamdebenchikh/team-manager.git
   cd team-manager
   ```

2. **Install Dependencies**:
   ```bash
   composer install
   npm install
   ```

3. **Set Up Environment**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update `.env` with your database and email service configuration.

4. **Generate Application Key**:
   ```bash
   php artisan key:generate
   ```

5. **Run Database Migrations**:
   ```bash
   php artisan migrate
   ```

6. **Start the Development Server**:
   - Backend:
     ```bash
     php artisan serve
     ```
   - Frontend (using Vite):
     ```bash
     npm run dev
     ```

## Usage

1. Register or log in to the application.
2. Create a team and invite members via email.
3. Manage tasks within your team and assign them to members.
4. Accept or decline team invitations via email or in-app notifications.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).

---

Feel free to customize this README file as needed!

