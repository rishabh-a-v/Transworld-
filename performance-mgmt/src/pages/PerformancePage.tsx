import React, { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge, PerformanceBadge } from '../components';
import { MainLayout } from '../layouts/MainLayout';
import { mockDataService } from '../data/mockData';

export const PerformancePage: React.FC = () => {
  const employees = useMemo(() => mockDataService.getEmployees(), []);
  const metrics = useMemo(() => mockDataService.getPerformanceMetrics(), []);
  const departments = useMemo(() => mockDataService.getDepartments(), []);

  // Get metrics for a sample employee
  const sampleEmployeeMetrics = useMemo(() => {
    return metrics.filter(m => m.employeeId === employees[0].id);
  }, [metrics, employees]);

  // Department rankings
  const deptRankings = useMemo(() => {
    return departments
      .map(dept => ({
        name: dept.name,
        score: dept.averageScore,
        teamSize: dept.teamSize,
      }))
      .sort((a, b) => b.score - a.score);
  }, [departments]);

  // Performance distribution
  const performanceDistribution = useMemo(() => {
    const ranges = [
      { range: '90-100', count: 0, label: 'Outstanding' },
      { range: '80-89', count: 0, label: 'Exceeds' },
      { range: '70-79', count: 0, label: 'Meets' },
      { range: '60-69', count: 0, label: 'Needs Imp.' },
      { range: '<60', count: 0, label: 'Critical' },
    ];

    employees.forEach(emp => {
      if (emp.performanceScore >= 90) ranges[0].count++;
      else if (emp.performanceScore >= 80) ranges[1].count++;
      else if (emp.performanceScore >= 70) ranges[2].count++;
      else if (emp.performanceScore >= 60) ranges[3].count++;
      else ranges[4].count++;
    });

    return ranges;
  }, [employees]);

  return (
    <MainLayout>
      <div className="p-6 md:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
          <p className="text-gray-600 mt-2">Track employee performance metrics and trends</p>
        </div>

        {/* Scoring Model Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">Performance Scoring Model</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-blue-800"><strong>Final Score =</strong></p>
              <p className="text-sm text-blue-800">60% Core Job Performance</p>
              <p className="text-sm text-blue-800">+ 40% Task Performance</p>
            </div>
            <div>
              <p className="text-sm text-blue-800"><strong>Rating Categories:</strong></p>
              <p className="text-sm text-blue-800">90-100: Outstanding | 80-89: Exceeds | 70-79: Meets</p>
              <p className="text-sm text-blue-800">60-69: Needs Improvement | &lt;60: Critical</p>
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Employee Performance Trends (Sample: {employees[0]?.name})</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleEmployeeMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="coreJobPerformance" stroke="#0ea5e9" strokeWidth={2} name="Core Performance" />
              <Line type="monotone" dataKey="taskPerformance" stroke="#8b5cf6" strokeWidth={2} name="Task Performance" />
              <Line type="monotone" dataKey="finalScore" stroke="#10b981" strokeWidth={2} name="Final Score" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Rankings Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Rankings</h2>
            <div className="space-y-3">
              {deptRankings.map((dept, idx) => (
                <div key={dept.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{dept.name}</p>
                      <p className="text-xs text-gray-600">{dept.teamSize} employees</p>
                    </div>
                  </div>
                  <PerformanceBadge score={dept.score} size="sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Employee Distribution</h2>
            <div className="space-y-4">
              {performanceDistribution.map(item => (
                <div key={item.range}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(item.count / employees.length) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top and Bottom Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h2>
            <div className="space-y-3">
              {employees
                .sort((a, b) => b.performanceScore - a.performanceScore)
                .slice(0, 5)
                .map((emp, idx) => (
                  <div key={emp.id} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-600">{emp.designation}</p>
                      </div>
                    </div>
                    <Badge variant="success">{emp.performanceScore}%</Badge>
                  </div>
                ))}
            </div>
          </div>

          {/* Lowest Performers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Needs Improvement</h2>
            <div className="space-y-3">
              {employees
                .sort((a, b) => a.performanceScore - b.performanceScore)
                .slice(0, 5)
                .map((emp, idx) => (
                  <div key={emp.id} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">{emp.name}</p>
                        <p className="text-xs text-gray-600">{emp.designation}</p>
                      </div>
                    </div>
                    <Badge variant="danger">{emp.performanceScore}%</Badge>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
