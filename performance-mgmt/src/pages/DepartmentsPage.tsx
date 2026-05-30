import React, { useMemo } from 'react';
import { Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge, PerformanceBadge, KPICard } from '../components';
import { MainLayout } from '../layouts/MainLayout';
import { mockDataService } from '../data/mockData';

export const DepartmentsPage: React.FC = () => {
  const departments = useMemo(() => mockDataService.getDepartments(), []);
  const allEmployees = useMemo(() => mockDataService.getEmployees(), []);

  return (
    <MainLayout>
      <div className="p-6 md:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600 mt-2">View department performance and team details</p>
        </div>

        {/* Department Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map(dept => (
            <div key={dept.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">{dept.name}</h2>
                <p className="text-sm text-gray-600 mt-1">Head: {dept.head}</p>
              </div>

              {/* Performance Badge */}
              <div className="mb-4">
                <PerformanceBadge score={dept.averageScore} size="md" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Team Size</p>
                  <p className="text-2xl font-bold text-gray-900">{dept.teamSize}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Tasks Completed</p>
                  <p className="text-2xl font-bold text-green-600">{dept.tasksCompleted}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Overdue Tasks</p>
                  <p className="text-2xl font-bold text-red-600">{dept.overdueTasks}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Avg Score</p>
                  <p className="text-2xl font-bold text-blue-600">{dept.averageScore}%</p>
                </div>
              </div>

              {/* Team Members Preview */}
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">Team Members</p>
                <div className="flex -space-x-2">
                  {dept.employees.slice(0, 5).map((emp, idx) => (
                    <div
                      key={emp.id}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                      title={emp.name}
                    >
                      {emp.name.charAt(0)}
                    </div>
                  ))}
                  {dept.employees.length > 5 && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-gray-700 text-xs font-bold">
                      +{dept.employees.length - 5}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Summary Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="Total Departments"
              value={departments.length}
              icon={<Users size={24} />}
              color="blue"
            />
            <KPICard
              title="Total Employees"
              value={allEmployees.length}
              icon={<Users size={24} />}
              color="green"
            />
            <KPICard
              title="Total Completed Tasks"
              value={departments.reduce((sum, d) => sum + d.tasksCompleted, 0)}
              icon={<CheckCircle2 size={24} />}
              color="purple"
            />
            <KPICard
              title="Total Overdue Tasks"
              value={departments.reduce((sum, d) => sum + d.overdueTasks, 0)}
              icon={<AlertCircle size={24} />}
              color="orange"
            />
          </div>
        </div>

        {/* Department Performance Comparison */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Department Performance Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Department</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Head</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Team Size</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Avg Score</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Completed</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700">Overdue</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Performance</th>
                </tr>
              </thead>
              <tbody>
                {departments.map(dept => (
                  <tr key={dept.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{dept.name}</td>
                    <td className="px-4 py-3 text-gray-600">{dept.head}</td>
                    <td className="px-4 py-3 text-center text-gray-900">{dept.teamSize}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="info">{dept.averageScore}%</Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="success">{dept.tasksCompleted}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant="danger">{dept.overdueTasks}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <PerformanceBadge score={dept.averageScore} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
