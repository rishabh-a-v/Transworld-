import React, { useMemo } from 'react';
import { Download, FileText } from 'lucide-react';
import { Badge, Button } from '../components';
import { MainLayout } from '../layouts/MainLayout';
import { mockDataService } from '../data/mockData';

export const ReportsPage: React.FC = () => {
  const reports = useMemo(() => mockDataService.getReports(), []);
  const departments = useMemo(() => mockDataService.getDepartments(), []);

  const handleDownloadReport = (reportId: string) => {
    alert(`Downloading report ${reportId}...`);
  };

  return (
    <MainLayout>
      <div className="p-6 md:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-2">View and download performance reports</p>
        </div>

        {/* Report Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {reports.map(report => (
            <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{report.type} Report</h3>
                  <p className="text-sm text-gray-600 mt-1">{report.date}</p>
                </div>
                <FileText className="text-blue-600" size={24} />
              </div>

              <div className="space-y-3 mb-6 py-4 border-t border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Task Completion Rate</span>
                  <span className="font-semibold text-gray-900">{report.taskCompletionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">KPI Achievement Rate</span>
                  <span className="font-semibold text-gray-900">{report.kpiAchievementRate}%</span>
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={<Download size={16} />}
                onClick={() => handleDownloadReport(report.id)}
                className="w-full"
              >
                Download
              </Button>
            </div>
          ))}
        </div>

        {/* Department Performance Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Performance Summary</h2>
          <div className="space-y-4">
            {departments.map(dept => (
              <div key={dept.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{dept.name}</p>
                  <p className="text-sm text-gray-600">Team Size: {dept.teamSize}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">Average Score</p>
                    <p className="text-lg font-bold text-gray-900">{dept.averageScore}%</p>
                  </div>
                  <Badge variant={dept.averageScore >= 80 ? 'success' : 'warning'}>
                    {dept.averageScore >= 90 ? 'Outstanding' : dept.averageScore >= 80 ? 'Good' : 'Needs Work'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Report Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Latest Report Details</h2>
          {reports.length > 0 && (
            <div>
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">{reports[0].type} Report - {reports[0].date}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Performance Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Task Completion</span>
                        <span className="font-medium text-gray-900">{reports[0].taskCompletionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">KPI Achievement</span>
                        <span className="font-medium text-gray-900">{reports[0].kpiAchievementRate}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Department Performance</h4>
                    <div className="space-y-2">
                      {reports[0].departmentPerformance.slice(0, 3).map(dept => (
                        <div key={dept.department} className="flex justify-between">
                          <span className="text-sm text-gray-600">{dept.department}</span>
                          <span className="font-medium text-gray-900">{dept.score}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm font-medium text-gray-700 mb-4">Export Options</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" size="sm" icon={<Download size={16} />}>
                    Export as PDF
                  </Button>
                  <Button variant="secondary" size="sm" icon={<Download size={16} />}>
                    Export as Excel
                  </Button>
                  <Button variant="secondary" size="sm" icon={<Download size={16} />}>
                    Export as CSV
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
