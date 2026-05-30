import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import { Badge, Button, SearchBar, DataTable, ProgressBar } from '../components';
import { MainLayout } from '../layouts/MainLayout';
import { mockDataService } from '../data/mockData';
import { Task } from '../types';

export const TasksPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const allTasks = useMemo(() => mockDataService.getTasks(), []);
  const departments = useMemo(() => mockDataService.getDepartments(), []);

  const filteredTasks = useMemo(() => {
    let result = allTasks;

    if (searchQuery) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter) {
      result = result.filter(t => t.status === statusFilter);
    }

    if (departmentFilter) {
      result = result.filter(t => t.department === departmentFilter);
    }

    return result;
  }, [searchQuery, statusFilter, departmentFilter, allTasks]);

  const getPriorityColor = (priority: string) => {
    const colors = {
      'Low': 'info',
      'Medium': 'warning',
      'High': 'danger',
      'Critical': 'danger',
    };
    return colors[priority as keyof typeof colors] as 'info' | 'warning' | 'danger';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'Pending': 'warning',
      'In Progress': 'info',
      'Completed': 'success',
      'Overdue': 'danger',
    };
    return colors[status as keyof typeof colors] as 'success' | 'warning' | 'danger' | 'info';
  };

  const columns = [
    {
      header: 'Task ID',
      accessor: 'id' as keyof Task,
    },
    {
      header: 'Title',
      accessor: 'title' as keyof Task,
    },
    {
      header: 'Assigned To',
      accessor: 'assignedTo' as keyof Task,
    },
    {
      header: 'Due Date',
      accessor: 'dueDate' as keyof Task,
    },
    {
      header: 'Priority',
      accessor: 'priority' as keyof Task,
      render: (value: string) => <Badge variant={getPriorityColor(value)}>{value}</Badge>,
    },
    {
      header: 'Status',
      accessor: 'status' as keyof Task,
      render: (value: string) => <Badge variant={getStatusColor(value)}>{value}</Badge>,
    },
    {
      header: 'Progress',
      accessor: 'completionPercentage' as keyof Task,
      render: (value: number) => <ProgressBar value={value} showPercentage={true} />,
    },
  ];

  return (
    <MainLayout>
      <div className="p-6 md:p-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600 mt-2">Manage and track all tasks</p>
          </div>
          <Button variant="primary" icon={<Plus size={20} />}>
            Create Task
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SearchBar
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
            <Button
              variant="secondary"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('');
                setDepartmentFilter('');
              }}
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-900">{allTasks.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{allTasks.filter(t => t.status === 'Pending').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">{allTasks.filter(t => t.status === 'In Progress').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Overdue</p>
            <p className="text-2xl font-bold text-red-600">{allTasks.filter(t => t.status === 'Overdue').length}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <DataTable columns={columns} data={filteredTasks} />
        </div>
      </div>
    </MainLayout>
  );
};
