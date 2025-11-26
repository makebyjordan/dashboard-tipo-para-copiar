# InvoDash - Management Dashboard

A modern, professional dashboard with secure authentication and database storage using Next.js, Prisma, and PostgreSQL.

## 🚀 Features

- **Secure Authentication**: NextAuth.js with JWT and bcrypt
- **Database Storage**: PostgreSQL with Prisma ORM
- **Dashboard**: Overview of business metrics
- **Habits Management**: Track and manage your habits
- **Time Management**: Battle plans for daily productivity
- **Contacts**: Manage clients, prospects, and leads
- **Google Sheets Integration**: Connect and visualize external data
- **Protected API Routes**: Secure RESTful endpoints

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **Charts**: Recharts

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud - we recommend Neon)
- npm or yarn

## 🔧 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Your `.env` file is already configured with:
- PostgreSQL connection string (Neon)
- NextAuth secret
- Base URL

If you need to change anything, edit `.env` (not tracked by Git).

### 3. Initialize Database

The database is already connected and migrated. If you need to reset:

```bash
# View database in browser
npm run prisma:studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Create new migration
npm run prisma:migrate
```

### 4. Create Your First User

Go to http://localhost:3000/register and create an account.

Or use Prisma Studio:
```bash
npm run prisma:studio
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
Open http://localhost:3000

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
/app                  # Next.js App Router
  /api               # API routes
    /auth            # Authentication endpoints
    /habits          # Habits CRUD
    /contacts        # Contacts CRUD
    /battleplans     # Time management
    /sheets          # Google Sheets
  /login             # Login page
  /register          # Registration page
  layout.tsx         # Root layout
  page.tsx           # Home page
  globals.css        # Global styles

/components          # React components
  DashboardApp.tsx   # Main dashboard (needs migration)
  Dashboard.tsx      # Dashboard view
  Habits.tsx         # Habits management
  Contacts.tsx       # Contacts management
  (and more...)

/lib                 # Utilities
  prisma.ts          # Prisma client
  auth.ts            # NextAuth configuration
  session.ts         # Session helpers

/prisma              # Database
  schema.prisma      # Database schema

/types               # TypeScript definitions
```

## 🔐 Security Features

- ✅ Password hashing with bcrypt (cost factor 10)
- ✅ JWT-based sessions with signed tokens
- ✅ Protected routes with middleware
- ✅ User-scoped database queries
- ✅ Input validation with Zod
- ✅ Environment variables for secrets
- ✅ No sensitive data in client-side code

## 📚 API Endpoints

All endpoints require authentication except `/api/auth/*`.

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out

### Habits
- `GET /api/habits` - List user habits
- `POST /api/habits` - Create habit
- `GET /api/habits/[id]` - Get habit
- `PATCH /api/habits/[id]` - Update habit
- `DELETE /api/habits/[id]` - Delete habit

### Contacts
- `GET /api/contacts?type=[CLIENT|INTERESTED|TO_CONTACT]` - List contacts
- `POST /api/contacts` - Create contact
- (Similar CRUD operations available)

### Battle Plans
- `GET /api/battleplans` - List plans
- `POST /api/battleplans` - Create/update plan

### Google Sheets
- `GET /api/sheets` - List connected sheets
- `POST /api/sheets` - Connect new sheet
- `DELETE /api/sheets?sheetId=[id]` - Disconnect sheet

## 🔄 Migration Status

This project has been migrated from Vite to Next.js with full database integration.

**✅ Completed:**
- Database schema and migrations
- Authentication system
- API routes with security
- Login/Register pages
- Base application structure

**📝 To Do:**
- Migrate existing components to use new APIs
- Replace mock data with real database queries
- Implement real-time updates

See `MIGRATION_STATUS.md` for detailed information.

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint

# Prisma commands
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio
npm run prisma:seed      # Seed database
```

## 📖 Documentation

- `SETUP.md` - Detailed setup instructions
- `MIGRATION_STATUS.md` - Migration progress and next steps
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth Docs](https://next-auth.js.org)

## 🐛 Troubleshooting

### Database connection errors
- Check `.env` DATABASE_URL is correct
- Verify PostgreSQL is running
- Test connection in Prisma Studio

### TypeScript errors
- Run `npm install` to ensure all dependencies are installed
- Run `npm run prisma:generate` to regenerate Prisma Client
- Restart your IDE/TypeScript server

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Clear `node_modules`: `rm -rf node_modules && npm install`
- Check for any console errors

## 📄 License

MIT

## 👥 Contributing

This is a private project. For issues or suggestions, contact the development team.
