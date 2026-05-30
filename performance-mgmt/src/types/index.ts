export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  manager: string;
  performanceScore: number;
  status: 'Active' | 'Inactive' | 'On Leave';
  joinDate: string;
  image?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  dueDate: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  completionPercentage: number;
  department: string;
}

export interface KPI {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  department: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  teamSize: number;
  averageScore: number;
  tasksCompleted: number;
  overdueTasks: number;
  employees: Employee[];
}

export interface PerformanceMetrics {
  employeeId: string;
  coreJobPerformance: number;
  taskPerformance: number;
  finalScore: number;
  rating: string;
  month: string;
}

export interface Report {
  id: string;
  type: 'Daily' | 'Weekly' | 'Monthly';
  date: string;
  departmentPerformance: {
    department: string;
    score: number;
  }[];
  topPerformers: Employee[];
  lowestPerformers: Employee[];
  taskCompletionRate: number;
  kpiAchievementRate: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface DashboardStats {
  totalEmployees: number;
  tasksAssigned: number;
  tasksCompleted: number;
  overdueTasks: number;
  averagePerformanceScore: number;
  topPerformers: Employee[];
}
