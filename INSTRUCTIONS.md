# Tummula Motors - Setup & Run Instructions

This document provides step-by-step instructions to set up and run the Tummula Motors vehicle inventory management system.

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.10+** installed
- **Node.js 18+** and npm installed
- **Git** installed

---

## Backend Setup (FastAPI)

### 1. Navigate to Backend Directory

```bash
cd backend/api
```

### 2. Create and Activate Virtual Environment

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Python Dependencies

```bash
pip install -r ../requirements.txt
```

### 4. Set Up Environment Variables

Create a `.env` file in `backend/api/` directory:

```bash
DATABASE_URL=sqlite:///./test.db
ALLOWED_ORIGINS=http://localhost:3000
```

### 5. Run Database Migrations

```bash
alembic upgrade head
```

### 6. Seed the Database

Prepopulate the database with sample vehicles from the CSV file:

```bash
python scripts/seed.py
```

### 7. Start the Backend Server

```bash
uvicorn app.main:app --reload --port 8000
```

✅ Backend is now running at `http://localhost:8000`

**API Documentation:** Visit `http://localhost:8000/docs` for Swagger UI

---

## Frontend Setup (Next.js)

### 1. Open a New Terminal

Keep the backend terminal running and open a new terminal window.

### 2. Navigate to Frontend Directory

```bash
cd frontend/tummula-motors-assessment
```

### 3. Install Node Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

✅ Frontend is now running at `http://localhost:3000`

---

## 🎯 Using the Application

### Main Features

1. **Vehicle Inventory Table** (`/`)
   - View all vehicles in a responsive table (desktop) or cards (mobile)
   - See vehicle number, VIN, manufacturer, model, and description
   - Click "Preview" to view detailed vehicle information
   - Click "Add New Vehicle" to add a car to inventory

2. **Add New Vehicle** (`/add`)
   - Fill in required fields: VIN, Manufacturer, Model
   - Optionally add description and image URLs (comma-separated)
   - Submit to add vehicle to inventory
   - Automatically redirected to home page on success

3. **Vehicle Detail Page** (`/vehicles/[id]`)
   - View vehicle images in a gallery
   - See complete vehicle information
   - Read full description
   - Navigate back to inventory

---

## 📹 Demo Video

### Test Case: Adding a New Vehicle

1. **Start on Home Page**
   - Navigate to `http://localhost:3000`
   - You should see the prepopulated vehicle inventory table

2. **Add New Vehicle**
   - Click the "Add New Vehicle" button
   - Fill in the form:
     - **VIN:** `TEST12345VIN67890`
     - **Manufacturer:** `Tesla`
     - **Model:** `Model S`
     - **Description:** `Premium electric sedan with autopilot, long range battery, and luxurious interior.`
     - **Image Links:** 
       ```
       https://images.unsplash.com/photo-1617788138017-80ad40651399,
       https://images.unsplash.com/photo-1560958089-b8a1929cea89
       ```
   - Click "Add Vehicle"

3. **Verify Addition in Table**
   - You should be automatically redirected to the home page
   - Scroll to find the newly added Tesla Model S
   - It should appear at the top of the list (newest first)

4. **View Vehicle Detail Page**
   - Click the "Preview" button for the Tesla Model S
   - Verify all information displays correctly:
     - Images appear in gallery
     - Description is shown
     - VIN, Make, and Model are displayed
     - Photo count is accurate

---

## 🛠️ Technical Implementation Details

### Architecture

**Frontend:**
- Next.js 16 (App Router) with React Server Components
- TypeScript for type safety
- Tailwind CSS 4 for styling
- Server-side data fetching for optimal performance

**Backend:**
- FastAPI for high-performance API
- SQLAlchemy ORM with Alembic migrations
- Pydantic for data validation
- CORS middleware for frontend communication
- SQLite database (easily swappable to PostgreSQL)

### Design Philosophy

The UI is inspired by **Carvana's** modern, clean aesthetic:
- Blue accent colors (#2563eb)
- Gradient backgrounds (slate to blue)
- Card-based layouts with shadows
- Smooth transitions and hover effects
- Mobile-first responsive design
- Clean typography and generous spacing

### Key Features Implemented

✅ **Server-side rendering** for vehicle list and details  
✅ **Client-side form** with validation and error handling  
✅ **Responsive design** (desktop table, mobile cards)  
✅ **Empty states** when no vehicles exist  
✅ **Image galleries** with thumbnails  
✅ **Loading states** during form submission  
✅ **Error handling** with user-friendly messages  
✅ **404 pages** for non-existent vehicles  
✅ **CSV data seeding** for prepopulation  
✅ **CORS configuration** for cross-origin requests  
✅ **API documentation** with Swagger UI  

---

## 🔧 Troubleshooting

### Backend Not Starting

**Issue:** `ModuleNotFoundError` when running uvicorn

**Solution:**
```bash
# Ensure virtual environment is activated
cd backend/api
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r ../requirements.txt
```

### Frontend Fetch Errors

**Issue:** "Failed to fetch vehicles" or CORS errors

**Solution:**
- Verify backend is running on port 8000
- Check `.env` file has `ALLOWED_ORIGINS=http://localhost:3000`
- Restart both servers

### Database Migration Issues

**Issue:** Alembic migration fails

**Solution:**
```bash
# Delete existing database and start fresh
cd backend/api
rm test.db  # if using SQLite
alembic upgrade head
python scripts/seed.py
```

### Port Already in Use

**Issue:** Port 3000 or 8000 already in use

**Solution:**
```bash
# For frontend - use a different port
npm run dev -- -p 3001

# For backend - specify different port
uvicorn app.main:app --reload --port 8001

# Update ALLOWED_ORIGINS in .env accordingly
```

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/vehicles` | List all vehicles |
| GET | `/vehicles/{id}` | Get vehicle by ID |
| POST | `/vehicles` | Create new vehicle |
| GET | `/health` | Health check |
| GET | `/docs` | API documentation |

---

## 🎨 Design Highlights

- **Gradient backgrounds** for visual depth
- **Card-based layouts** for content organization
- **Shadow layers** for hierarchy
- **Rounded corners** for modern feel
- **Blue accent** (#2563eb) for CTAs and links
- **Hover animations** for interactivity
- **Mobile-first** responsive breakpoints
- **Custom scrollbars** for consistency

---

## 📝 Testing Checklist

- [x] View vehicle inventory table
- [x] Add new vehicle with all fields
- [x] Add vehicle with only required fields
- [x] View vehicle detail page
- [x] Navigate between pages
- [x] Test form validation (empty required fields)
- [x] Test duplicate VIN error handling
- [x] Test responsive design on mobile
- [x] Test image gallery display
- [x] Test 404 page for invalid vehicle ID

---

## 🚀 Production Considerations

For production deployment, consider:

1. **Database:** Migrate from SQLite to PostgreSQL
2. **Environment Variables:** Use secure secret management
3. **CORS:** Restrict origins to production domain
4. **API Rate Limiting:** Add rate limiting middleware
5. **Image Hosting:** Use CDN for vehicle images
6. **Authentication:** Add user authentication system
7. **Monitoring:** Implement logging and error tracking
8. **Caching:** Add Redis for API response caching

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)

---

## 👨‍💻 Development Notes

**Time Investment:** ~8 hours

**Key Decisions:**
- Used SQLite for quick setup (easily swappable to PostgreSQL)
- Server Components for SEO and performance
- Tailwind CSS for rapid, consistent styling
- Comprehensive error handling for better UX
- Mobile-first responsive design approach

**Future Enhancements:**
- Vehicle update/delete functionality
- Advanced search and filtering
- Pagination for large inventories
- Image upload with S3/Cloudinary
- Vehicle comparison feature
- User authentication and roles

---

## 📧 Contact

For questions or issues, please create an issue in the repository.

---

**Built with ❤️ for Tummula Motors**

