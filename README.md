# Laravel ShadCN Starter Template

A customized version of Laravel Breeze with additional features and design improvements, built using React.js and Inertia.js.

## Features
- Fully redesigned Login, Register, and Forgot Password pages.
- Added a responsive sidebar for navigation.
- Profile photo upload and bio management.
- Dark mode toggle with system preference support.
- Other core UI and functionality improvements.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/mohamdebenchikh/laravel-shadcn-starter-template.git
   ```
2. Navigate to the project directory:
   ```bash
   cd laravel-shadcn-starter-template
   ```
3. Install dependencies:
   ```bash
   composer install
   npm install && npm run build
   ```
4. Set up the `.env` file:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
5. Run migrations:
   ```bash
   php artisan migrate
   ```

## Usage

- Register a new account to explore the redesigned authentication flow.
- Customize your profile with a photo and bio.
- Toggle between light and dark modes using the built-in theme switcher.

## Features Overview

- **React.js & Inertia.js**: Frontend built with React.js powered by Inertia.js for seamless SPA-like functionality.
- **Dark Mode**: Supports light, dark, and system preferences.
- **Profile Customization**: Upload a profile photo and update your bio.
- **Sidebar Navigation**: Easy access to various sections of the application.
- **Enhanced Auth Pages**: Modern UI for Login, Register, and Forgot Password.

## License

This project is open-source under the [MIT License](LICENSE).

