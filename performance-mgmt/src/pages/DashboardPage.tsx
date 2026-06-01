import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Clock3,
  Loader,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { KPICard, Badge } from '../components';
import { MainLayout } from '../layouts/MainLayout';
import { taskService } from '../services/taskService';
import { employeeService } from '../services/employeeService';
import { departmentService } from '../services/departmentService';
import type { Task } from '../services/taskService';
import type { Employee } from '../services/employeeService';
import type { Department } from '../services/departmentService';

export const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [taskData, empData, deptData] = await Promise.all([
        taskService.getAll(),
        employeeService.getAll(),
        departmentService.getAll(),
      ]);
      setTasks(taskData);
      setEmployees(empData);
      setDepartments(deptData);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    const completedTasks = tasks.filter(t => t.status === 'COMPLETED');
    const overdueTasks = tasks.filter(t => t.status === 'OVERDUE');
    const avgScore = employees.length > 0 ? Math.round(
      employees.reduce((sum, e) => sum + e.performanceScore, 0) / employees.length
    ) : 0;

    const topPerformers = [...employees]
      .sort((a, b) => b.performanceScore - a.performanceScore)
      .slice(0, 5);

    return {
      totalEmployees: employees.length,
      tasksAssigned: tasks.length,
      tasksCompleted: completedTasks.length,
      overdueTasks: overdueTasks.length,
      averagePerformanceScore: avgScore,
      topPerformers,
    };
  }, [tasks, employees]);

  // Task completion chart data
  const taskChartData = useMemo(() => {
    const statuses = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'OVERDUE'];
    return statuses.map(status => ({
      name: status,
      count: tasks.filter(t => t.status === status).length,
    }));
  }, [tasks]);

  // Department performance data
  const deptChartData = useMemo(() => {
    return departments.map(dept => ({
      name: dept.name,
      score: dept.averageScore || 0,
    }));
  }, [departments]);

  // Monthly trends data
  const monthlyTrends = [
    { month: 'Jan', performance: 72, tasks: 165 },
    { month: 'Feb', performance: 75, tasks: 178 },
    { month: 'Mar', performance: 78, tasks: 192 },
    { month: 'Apr', performance: 80, tasks: 205 },
    { month: 'May', performance: 82, tasks: 218 },
    { month: 'Jun', performance: 85, tasks: 225 },
  ];

  const recentActivity = useMemo(() => {
    return tasks.slice(0, 6).map((task, index) => {
      const employee = stats.topPerformers[index % stats.topPerformers.length];
      return {
        id: task.id,
        title: task.status === 'COMPLETED' ? 'Task completed' : task.status === 'OVERDUE' ? 'Task overdue' : 'Task updated',
        description: `${employee?.name ?? 'Team member'} - ${task.title}`,
        time: `${index + 1}h ago`,
        status: task.status,
      };
    });
  }, [tasks, stats.topPerformers]);

  const COLORS = ['#0ea5e9', '#3b82f6', '#1e40af', '#1e3a8a'];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin" size={32} />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
          <AlertCircle className="text-red-600" size={20} />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="p-6 md:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your performance summary.</p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <KPICard
            title="Total Employees"
            value={stats.totalEmployees}
            icon={<Users size={24} />}
            color="blue"
            trend={2}
          />
          <KPICard
            title="Tasks Assigned"
            value={stats.tasksAssigned}
            icon={<BarChart3 size={24} />}
            color="green"
            trend={5}
          />
          <KPICard
            title="Tasks Completed"
            value={stats.tasksCompleted}
            icon={<CheckCircle2 size={24} />}
            color="purple"
            trend={8}
          />
          <KPICard
            title="Overdue Tasks"
            value={stats.overdueTasks}
            icon={<AlertCircle size={24} />}
            color="orange"
            trend={-3}
          />
          <KPICard
            title="Avg Performance"
            value={`${stats.averagePerformanceScore}%`}
            icon={<TrendingUp size={24} />}
            color="purple"
            trend={1}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Task Completion Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Status Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }: any) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {taskChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Department Performance Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deptChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="performance" stroke="#0ea5e9" strokeWidth={2} />
              <Line type="monotone" dataKey="tasks" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Performers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h2>
            <div className="space-y-4">
              {stats.topPerformers.map((emp, idx) => (
                <div key={emp.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{emp.name}</p>
                      <p className="text-sm text-gray-600">{emp.designation}</p>
                    </div>
                  </div>
                  <Badge variant="success">{emp.performanceScore}%</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <div className="mt-1 w-9 h-9 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                    <Clock3 size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
