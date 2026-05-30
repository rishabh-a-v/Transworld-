import { Employee, Task, Department, PerformanceMetrics, Report, DashboardStats } from '../types';

const DEPARTMENTS = ['SEO', 'Marketing', 'Sales', 'HR', 'Development', 'Operations'];

const generateEmployees = (): Employee[] => {
  const employees: Employee[] = [];
  const designations = ['Senior Manager', 'Manager', 'Executive', 'Associate', 'Junior Executive'];
  const departments = DEPARTMENTS;

  for (let i = 1; i <= 50; i++) {
    const dept = departments[Math.floor(Math.random() * departments.length)];
    const manager = i > 1 ? `EMP${String(Math.floor(Math.random() * (i - 1)) + 1).padStart(3, '0')}` : 'Admin';
    
    employees.push({
      id: `EMP${String(i).padStart(3, '0')}`,
      name: `Employee ${i}`,
      email: `employee${i}@company.com`,
      department: dept,
      designation: designations[Math.floor(Math.random() * designations.length)],
      manager,
      performanceScore: Math.floor(Math.random() * 40) + 60,
      status: ['Active', 'Inactive', 'On Leave'][Math.floor(Math.random() * 3)] as any,
      joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    });
  }

  return employees;
};

const generateTasks = (employees: Employee[]): Task[] => {
  const tasks: Task[] = [];
  const priorities: ('Low' | 'Medium' | 'High' | 'Critical')[] = ['Low', 'Medium', 'High', 'Critical'];
  const statuses: ('Pending' | 'In Progress' | 'Completed' | 'Overdue')[] = ['Pending', 'In Progress', 'Completed', 'Overdue'];

  for (let i = 1; i <= 200; i++) {
    const assignedEmployee = employees[Math.floor(Math.random() * employees.length)];
    const assignedByEmployee = employees[Math.floor(Math.random() * employees.length)];
    const daysFromNow = Math.floor(Math.random() * 60) - 10;
    const dueDate = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    tasks.push({
      id: `TASK${String(i).padStart(4, '0')}`,
      title: `Task ${i} - Project Deliverable`,
      description: `This is a description for task ${i}. Important project milestone.`,
      assignedTo: assignedEmployee.id,
      assignedBy: assignedByEmployee.id,
      dueDate,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      completionPercentage: Math.floor(Math.random() * 100),
      department: assignedEmployee.department,
    });
  }

  return tasks;
};

const generateDepartments = (employees: Employee[], tasks: Task[]): Department[] => {
  return DEPARTMENTS.map(dept => {
    const deptEmployees = employees.filter(e => e.department === dept);
    const deptTasks = tasks.filter(t => t.department === dept);
    const completedTasks = deptTasks.filter(t => t.status === 'Completed').length;
    const overdueTasks = deptTasks.filter(t => t.status === 'Overdue').length;
    const avgScore = deptEmployees.length > 0 
      ? Math.round(deptEmployees.reduce((sum, e) => sum + e.performanceScore, 0) / deptEmployees.length)
      : 0;

    return {
      id: dept.toLowerCase(),
      name: dept,
      head: deptEmployees.length > 0 ? deptEmployees[0].name : 'N/A',
      teamSize: deptEmployees.length,
      averageScore: avgScore,
      tasksCompleted: completedTasks,
      overdueTasks,
      employees: deptEmployees,
    };
  });
};

const generatePerformanceMetrics = (employees: Employee[]): PerformanceMetrics[] => {
  const metrics: PerformanceMetrics[] = [];
  const months = ['January', 'February', 'March', 'April', 'May', 'June'];

  employees.forEach(emp => {
    months.forEach(month => {
      const coreJobPerf = Math.floor(Math.random() * 40) + 60;
      const taskPerf = Math.floor(Math.random() * 40) + 60;
      const finalScore = Math.round(coreJobPerf * 0.6 + taskPerf * 0.4);

      let rating = 'Critical';
      if (finalScore >= 90) rating = 'Outstanding';
      else if (finalScore >= 80) rating = 'Exceeds Expectations';
      else if (finalScore >= 70) rating = 'Meets Expectations';
      else if (finalScore >= 60) rating = 'Needs Improvement';

      metrics.push({
        employeeId: emp.id,
        coreJobPerformance: coreJobPerf,
        taskPerformance: taskPerf,
        finalScore,
        rating,
        month,
      });
    });
  });

  return metrics;
};

const generateReports = (): Report[] => {
  const reports: Report[] = [];
  
  for (let i = 0; i < 3; i++) {
    const types: ('Daily' | 'Weekly' | 'Monthly')[] = ['Daily', 'Weekly', 'Monthly'];
    const daysAgo = i * 7;
    const reportDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    reports.push({
      id: `RPT${String(i + 1).padStart(3, '0')}`,
      type: types[i],
      date: reportDate,
      departmentPerformance: DEPARTMENTS.map(dept => ({
        department: dept,
        score: Math.floor(Math.random() * 30) + 65,
      })),
      topPerformers: [],
      lowestPerformers: [],
      taskCompletionRate: Math.floor(Math.random() * 30) + 65,
      kpiAchievementRate: Math.floor(Math.random() * 30) + 65,
    });
  }

  return reports;
};

// Main data service
export class MockDataService {
  private employees: Employee[] = [];
  private tasks: Task[] = [];
  private departments: Department[] = [];
  private performanceMetrics: PerformanceMetrics[] = [];
  private reports: Report[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    this.employees = generateEmployees();
    this.tasks = generateTasks(this.employees);
    this.departments = generateDepartments(this.employees, this.tasks);
    this.performanceMetrics = generatePerformanceMetrics(this.employees);
    this.reports = generateReports();
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: string): Employee | undefined {
    return this.employees.find(e => e.id === id);
  }

  searchEmployees(query: string): Employee[] {
    const q = query.toLowerCase();
    return this.employees.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q)
    );
  }

  filterEmployeesByDepartment(department: string): Employee[] {
    return this.employees.filter(e => e.department === department);
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  filterTasksByStatus(status: string): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  filterTasksByEmployee(employeeId: string): Task[] {
    return this.tasks.filter(t => t.assignedTo === employeeId);
  }

  filterTasksByDepartment(department: string): Task[] {
    return this.tasks.filter(t => t.department === department);
  }

  getDepartments(): Department[] {
    return this.departments;
  }

  getDepartmentById(id: string): Department | undefined {
    return this.departments.find(d => d.id === id);
  }

  getPerformanceMetrics(employeeId?: string): PerformanceMetrics[] {
    if (employeeId) {
      return this.performanceMetrics.filter(m => m.employeeId === employeeId);
    }
    return this.performanceMetrics;
  }

  getReports(): Report[] {
    return this.reports;
  }

  getDashboardStats(): DashboardStats {
    const completedTasks = this.tasks.filter(t => t.status === 'Completed');
    const overdueTasks = this.tasks.filter(t => t.status === 'Overdue');
    const avgScore = Math.round(
      this.employees.reduce((sum, e) => sum + e.performanceScore, 0) / this.employees.length
    );

    const topPerformers = [...this.employees]
      .sort((a, b) => b.performanceScore - a.performanceScore)
      .slice(0, 5);

    return {
      totalEmployees: this.employees.length,
      tasksAssigned: this.tasks.length,
      tasksCompleted: completedTasks.length,
      overdueTasks: overdueTasks.length,
      averagePerformanceScore: avgScore,
      topPerformers,
    };
  }
}

export const mockDataService = new MockDataService();
