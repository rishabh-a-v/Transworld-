# Performance Management System - Frontend

A modern, professional HR and performance management dashboard built with React, TypeScript, Tailwind CSS, and React Router.

## Overview

This is a comprehensive frontend application for tracking employee performance, managing tasks, monitoring KPIs, and generating reports. The system provides HR managers with tools to evaluate employee performance, assign tasks, and analyze departmental metrics.

## Features

### 1. **Login Page**
- Secure email/password authentication
- Remember me functionality
- Corporate branding
- Demo credentials info (email: demo@company.com, any password)

### 2. **Dashboard**
- Key Performance Indicators (KPIs) display
- Total employees, tasks, and completion metrics
- Real-time performance statistics
- Task status distribution (pie chart)
- Department performance comparison (bar chart)
- Monthly performance trends (line chart)
- Top 5 performers list

### 3. **Employee Management**
- Browse all 50 employees with detailed information
- Search by name, email, or ID
- Filter by department
- View detailed employee profiles
- Performance score badges
- Employment status tracking

### 4. **Task Management**
- Comprehensive task list (200 mock tasks)
- Filter by status: Pending, In Progress, Completed, Overdue
- Filter by department
- Filter by assigned employee
- Task priority indicators (Low, Medium, High, Critical)
- Progress tracking per task
- Search functionality

### 5. **Performance Analytics**
- Performance scoring model: 60% Core Job + 40% Task Performance
- Rating categories:
  - Outstanding (90-100)
  - Exceeds Expectations (80-89)
  - Meets Expectations (70-79)
  - Needs Improvement (60-69)
  - Critical (<60)
- Monthly performance trends
- Performance distribution charts
- Department rankings
- Top and bottom performers lists
- Visual progress indicators

### 6. **Department Management**
- 6 departments: SEO, Marketing, Sales, HR, Development, Operations
- Department summary cards with key metrics
- Head of department information
- Team size and performance scores
- Task completion tracking
- Comparison table of all departments

### 7. **Reports**
- Daily, Weekly, and Monthly reports
- Department performance summaries
- Top and bottom performers lists
- Task completion rates
- KPI achievement rates
- Export options (PDF, Excel, CSV - UI only)

### 8. **Settings**
- Profile management
- Security settings (password change, 2FA)
- Notification preferences
- General preferences (language, theme, timezone)
- Tabbed interface for organization

### 9. **Navigation**
- Responsive sidebar navigation
- Top navigation bar with notifications
- Mobile-friendly hamburger menu
- User profile dropdown
- Active route highlighting

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 3** - Styling
- **React Router v6** - Routing
- **Recharts** - Data visualization
- **Lucide Icons** - Icon library
- **React Scripts** - Build tooling

## Project Structure

```
performance-mgmt/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── KPICard.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── DataTable.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   ├── Modal.tsx
│   │   ├── SearchBar.tsx
│   │   ├── PerformanceBadge.tsx
│   │   └── index.ts
│   ├── pages/               # Page components
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── EmployeesPage.tsx
│   │   ├── TasksPage.tsx
│   │   ├── PerformancePage.tsx
│   │   ├── DepartmentsPage.tsx
│   │   ├── ReportsPage.tsx
│   │   ├── SettingsPage.tsx
│   │   └── index.ts
│   ├── layouts/             # Layout components
│   │   └── MainLayout.tsx
│   ├── hooks/               # Custom hooks
│   │   └── ProtectedRoute.tsx
│   ├── data/                # Mock data
│   │   └── mockData.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── services/            # API services (for future backend)
│   ├── App.tsx
│   ├── App.css
│   └── index.css
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Mock Data

The application includes realistic mock data:
- **50 Employees** - Across 6 departments with varying designations and performance scores
- **6 Departments** - SEO, Marketing, Sales, HR, Development, Operations
- **200 Tasks** - With various statuses, priorities, and completion percentages
- **Performance Metrics** - Monthly performance scores for all employees
- **Reports** - Daily, Weekly, and Monthly report samples

## Installation & Running

### Prerequisites
- Node.js 14+ and npm

### Setup

```bash
# Navigate to project
cd performance-mgmt

# Install dependencies (already done)
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Production Build

```bash
npm run build
```

## Usage

### Login
- Navigate to the login page (default on startup)
- Email: `demo@company.com`
- Password: Any value
- Check "Remember me" to persist session

### Dashboard
- View KPI metrics and performance trends
- Charts display task completion and department performance
- Top performers section shows best employees

### Employees
- Search for employees by name, email, or ID
- Filter by department
- Click "View" to see detailed employee information
- View performance scores and employment status

### Tasks
- Browse all tasks with filtering options
- Track progress with completion percentages
- Monitor priority levels and status
- Filter by employee, department, or status

### Performance
- View performance scoring methodology
- Analyze monthly trends for sample employee
- Check performance distribution across company
- Review department rankings and employee lists

### Departments
- View department cards with key metrics
- See team member avatars
- Compare department performance in table view
- Track task completion and overdue tasks

### Reports
- Download report summaries (UI ready for backend)
- View department performance metrics
- Check task completion and KPI achievement rates

### Settings
- Update profile information
- Change password (UI ready for backend)
- Manage notification preferences
- Set language, theme, and timezone

## Responsive Design

- **Desktop (1024px+)** - Full sidebar navigation, multi-column layouts
- **Tablet (768px-1024px)** - Collapsible sidebar, 2-column grids
- **Mobile (<768px)** - Full-width layout, hamburger menu, single-column

## Components Library

### Reusable Components

1. **KPICard** - Display key metrics with icons and trends
2. **ProgressBar** - Visual progress indicators with percentage
3. **Badge** - Status and category labels
4. **Button** - Consistent button styling with variants
5. **DataTable** - Sortable table with pagination support
6. **Sidebar** - Navigation menu (responsive)
7. **Navbar** - Top navigation with user profile
8. **Modal** - Dialog for detailed information
9. **SearchBar** - Search input with icon
10. **PerformanceBadge** - Performance rating display

## Color Scheme

- **Primary Blue** - #0ea5e9 (main actions)
- **Success Green** - #10b981 (positive metrics)
- **Warning Yellow** - #f59e0b (caution status)
- **Danger Red** - #ef4444 (critical issues)
- **Neutral Gray** - #6b7280 (secondary text)

## Performance Scoring Model

```
Final Score = (Core Job Performance × 0.60) + (Task Performance × 0.40)

Rating Scale:
- 90-100: Outstanding
- 80-89: Exceeds Expectations
- 70-79: Meets Expectations
- 60-69: Needs Improvement
- <60: Critical
```

## Future Enhancements

The codebase is architected for easy backend integration:

1. **Authentication**
   - Replace mock auth with JWT/OAuth
   - Connect to real user endpoints

2. **Data Services**
   - Replace `mockDataService` with API calls
   - Implement data caching with React Query

3. **Real-time Updates**
   - WebSocket integration for live metrics
   - Notification system

4. **Export Functionality**
   - PDF generation with react-pdf
   - Excel export with xlsx library

5. **Advanced Features**
   - File upload for documents
   - Email integration
   - Calendar view for tasks
   - Performance goal setting

## Architecture Notes

- **Clean Component Structure** - Separated into reusable, presentational components
- **Type Safety** - Full TypeScript coverage
- **Mock Data Service** - Easy to swap with real API calls
- **Protected Routes** - Authentication wrapper ready for implementation
- **Responsive Layouts** - Mobile-first design approach
- **Tailwind Utilities** - Custom components with Tailwind CSS

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is created for demonstration purposes.

---

**Ready for Backend Integration** ✅

This frontend is production-ready and fully compatible with:
- Node.js + Express backend
- PostgreSQL database
- RESTful API architecture
- JWT authentication

Simply replace the `mockDataService` calls with actual API endpoints to connect to your backend infrastructure.
