# 🚀 Quick Start Guide - Indradhanu AICRS

## Prerequisites
- Node.js v16+ installed
- MongoDB installed and running
- Git (optional)

## Installation Steps

### 1. Install Dependencies

Open PowerShell in the project root directory (`d:\Indradhanu`) and run:

```powershell
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```powershell
Copy-Item .env.example .env
```

Edit `.env` and update these values:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure random string
- Add your API keys if you have them

### 3. Start MongoDB

Make sure MongoDB is running:

**Option A: Run PowerShell as Administrator (Recommended for Service)**
```powershell
# Right-click PowerShell and select "Run as Administrator"
# Then run:
net start MongoDB
```

**Option B: Start MongoDB Manually (No Admin Rights Needed)**
```powershell
# Navigate to MongoDB bin directory (adjust path if different)
cd "C:\Program Files\MongoDB\Server\6.0\bin"
.\mongod.exe

# Or if MongoDB is in PATH, just run:
mongod
```

**Option C: Use MongoDB Atlas (Cloud - No Local Install)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string and update in `.env` file
- Example: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/indradhanu`

### 4. Run the Application

**Option A: Run both frontend and backend together (recommended)**
```powershell
npm run dev
```

**Option B: Run separately**

Terminal 1 (Backend):
```powershell
npm run server
```

Terminal 2 (Frontend):
```powershell
cd client
npm run dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health-check

## Project Structure

```
Indradhanu/
├── client/                 # React frontend (Vite + Tailwind)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Main application pages
│   │   ├── services/      # API service layer
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── config/           # Database configuration
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   └── server.js         # Express server
├── .env                  # Environment variables (create this)
├── .env.example          # Environment template
├── package.json          # Root package.json
└── README.md            # Main documentation
```

## Available Pages

1. **Dashboard** (`/`) - Overview of all systems
2. **Health Nexus** (`/health`) - Disease outbreak predictions
3. **Marine Twin** (`/marine`) - Marine ecosystem monitoring
4. **Circular Optimizer** (`/circular`) - Waste optimization
5. **Policy Simulator** (`/policy`) - Policy testing
6. **Data Hub** (`/data`) - Data ingestion status
7. **About** (`/about`) - System information

## API Endpoints

### Health
- `GET /api/health` - All health data
- `GET /api/health/predictions` - Predictions
- `GET /api/health/alerts` - Active alerts
- `POST /api/health` - Submit data

### Marine
- `GET /api/marine` - All marine data
- `GET /api/marine/ecosystem` - Ecosystem status
- `POST /api/marine/scenario` - Run scenario

### Circular Economy
- `GET /api/circular` - All circular data
- `GET /api/circular/waste-streams` - Waste streams
- `POST /api/circular/optimize` - Run optimization

### Policy
- `GET /api/policy` - All simulations
- `POST /api/policy` - Create simulation
- `POST /api/policy/:id/run` - Run simulation

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `net start MongoDB`
- Check MONGODB_URI in .env file
- For local MongoDB: `mongodb://localhost:27017/indradhanu`

### Port Already in Use
- Backend (5000): Change PORT in .env
- Frontend (3000): Change port in client/vite.config.js

### Module Not Found
- Run `npm install` in root directory
- Run `npm install` in client directory

## Next Steps

1. **Add Sample Data**: Use the API endpoints to add sample data
2. **Customize**: Modify components in `client/src/components`
3. **Extend API**: Add new routes in `server/routes`
4. **Deploy**: Follow deployment guide in README.md

## Support

For issues or questions:
- Check README.md for detailed documentation
- Review error messages in browser console
- Check server logs in terminal

---

Built with ❤️ for a sustainable future
