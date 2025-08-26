# 📁 InShare - Easy File Sharing Application

![InShare Logo](./frontend/images/logo.png)

InShare is a modern, web-based file sharing application that allows users to upload files and share them via email or direct links. Built with Node.js, Express, and MongoDB, it provides a seamless file sharing experience with a clean, intuitive interface.

## ✨ Features

- 🚀 **Easy File Upload** - Drag & drop or browse to upload files
- 📧 **Email Sharing** - Send file links directly via email
- 🔗 **Direct Links** - Generate shareable links for instant access
- 📱 **Responsive Design** - Works on desktop and mobile devices
- ⚡ **Real-time Progress** - See upload progress with visual indicators
- 🔒 **Secure Storage** - Files are stored securely in MongoDB
- ⏰ **Link Expiration** - Links expire after 24 hours for security
- 🎨 **Modern UI** - Clean and user-friendly interface

## 🚀 Live Demo

- **Frontend**: [InShare Application](https://your-frontend-url.com)
- **Backend API**: [InShare Backend](https://inshare-backend-sg.vercel.app)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database for file metadata and user data
- **Multer** - File upload middleware
- **Nodemailer** - Email service
- **EJS** - Template engine for download pages
- **UUID** - Unique identifier generation

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling with modern features
- **Vanilla JavaScript** - Interactive functionality
- **XMLHttpRequest** - File upload with progress tracking

### Deployment
- **Vercel** - Backend hosting
- **MongoDB Atlas** - Cloud database

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Gmail account (for email functionality)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sahilgupta2175/inshare-project.git
   cd inshare-project/Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see [Configuration](#-configuration))

5. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Open in browser**
   - Open `index.html` in your web browser
   - Or serve with a local server like Live Server

## ⚙️ Configuration

Create a `.env` file in the Backend directory with the following variables:

```env
# Server Configuration
PORT=8080

# Database
ATLAS_MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/inshare

# Application URL
APP_BASE_URL=http://localhost:8080

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# CORS Settings
ALLOWED_CLIENTS=http://localhost:8080,http://127.0.0.1:5500
```

### Gmail Setup for Email Functionality

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → App passwords
   - Generate password for "Mail"
   - Use this password in `EMAIL_PASS`

## 🎯 Usage

### For Users

1. **Upload a File**
   - Visit the InShare application
   - Drag & drop a file or click "Browse" to select
   - Wait for upload completion

2. **Share the File**
   - Copy the generated link to share directly
   - Or use the email form to send via email
   - Recipients can download the file using the link

3. **Download Files**
   - Click on shared links to access download page
   - Files are available for 24 hours

### For Developers

1. **File Upload API**
   ```javascript
   POST /api/files
   Content-Type: multipart/form-data
   
   FormData: {
     myfile: [File object]
   }
   ```

2. **Email Sharing API**
   ```javascript
   POST /api/files/send
   Content-Type: application/json
   
   {
     "uuid": "file-uuid",
     "sender": "sender@email.com",
     "receiver": "receiver@email.com"
   }
   ```

## 📡 API Endpoints

### File Operations
- `POST /api/files` - Upload a new file
- `POST /api/files/send` - Send file via email
- `GET /files/:uuid` - View file download page
- `GET /files/download/:uuid` - Download file

### Static Assets
- `GET /css/*` - CSS files
- `GET /images/*` - Image assets
- `GET /favicon.ico` - Favicon

## 📁 Project Structure

```
inshare-project/
├── Backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   └── file.js             # File schema
│   ├── routes/
│   │   ├── file.js             # File upload & email routes
│   │   ├── show.js             # File display route
│   │   └── download.js         # File download route
│   ├── services/
│   │   ├── mailService.js      # Email service
│   │   └── emailTemplate.js    # Email HTML template
│   ├── views/
│   │   └── download.ejs        # Download page template
│   ├── public/
│   │   ├── css/
│   │   └── images/
│   ├── uploads/                # File storage (local dev)
│   ├── server.js              # Main server file
│   ├── vercel.json            # Vercel deployment config
│   └── package.json
├── frontend/
│   ├── images/
│   │   ├── logo.png
│   │   ├── file.svg
│   │   └── ...
│   ├── index.html             # Main HTML file
│   ├── style.css              # Styles
│   └── index.js               # Frontend JavaScript
└── README.md
```

## 🌟 Key Features Explained

### File Upload
- **Drag & Drop**: Modern drag-and-drop interface
- **Progress Tracking**: Real-time upload progress
- **File Validation**: Size limits and type checking
- **Memory Storage**: Uses MongoDB for file storage (Vercel compatible)

### Email Integration
- **Gmail SMTP**: Secure email sending via Gmail
- **Custom Templates**: Beautiful HTML email templates
- **Error Handling**: Comprehensive error management

### Security
- **File Expiration**: Links expire after 24 hours
- **UUID Generation**: Secure file identifiers
- **Input Validation**: Server-side validation for all inputs

## 🚀 Deployment

### Backend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Frontend
- Can be deployed on any static hosting service
- Update API endpoints in `index.js` to point to your backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sahil Gupta**
- GitHub: [@Sahilgupta2175](https://github.com/Sahilgupta2175)
- Email: guptasahil2175@gmail.com

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this project
- Inspired by modern file sharing solutions
- Built as part of learning full-stack development

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the author directly.

---

⭐ **Star this repository if you found it helpful!**
