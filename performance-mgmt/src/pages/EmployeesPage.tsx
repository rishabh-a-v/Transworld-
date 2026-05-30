import React, { useState, useMemo } from 'react';
import { Plus, Eye } from 'lucide-react';
import { Badge, Button, SearchBar, DataTable, Modal, PerformanceBadge } from '../components';
import { MainLayout } from '../layouts/MainLayout';
import { mockDataService } from '../data/mockData';
import { Employee } from '../types';

export const EmployeesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const allEmployees = useMemo(() => mockDataService.getEmployees(), []);
  const departments = useMemo(() => mockDataService.getDepartments(), []);

  const filteredEmployees = useMemo(() => {
    let result = allEmployees;

    if (searchQuery) {
      result = mockDataService.searchEmployees(searchQuery);
    }

    if (departmentFilter) {
      result = result.filter(e => e.department === departmentFilter);
    }

    return result;
  }, [searchQuery, departmentFilter, allEmployees]);

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const columns = [
    {
      header: 'Employee ID',
      accessor: 'id' as keyof Employee,
    },
    {
      header: 'Name',
      accessor: 'name' as keyof Employee,
    },
    {
      header: 'Email',
      accessor: 'email' as keyof Employee,
    },
    {
      header: 'Department',
      accessor: 'department' as keyof Employee,
      render: (value: string) => <Badge variant="info">{value}</Badge>,
    },
    {
      header: 'Designation',
      accessor: 'designation' as keyof Employee,
    },
    {
      header: 'Performance',
      accessor: 'performanceScore' as keyof Employee,
      render: (value: number) => <PerformanceBadge score={value} size="sm" />,
    },
    {
      header: 'Status',
      accessor: 'status' as keyof Employee,
      render: (value: string) => {
        const variants = {
          'Active': 'success' as const,
          'Inactive': 'danger' as const,
          'On Leave': 'warning' as const,
        };
        return <Badge variant={variants[value as keyof typeof variants]}>{value}</Badge>;
      },
    },
    {
      header: 'Action',
      accessor: 'id',
      render: (_: string, row: Employee) => (
        <Button
          size="sm"
          variant="ghost"
          icon={<Eye size={16} />}
          onClick={() => handleViewEmployee(row)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="p-6 md:p-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
            <p className="text-gray-600 mt-2">Manage all employees and their performance</p>
          </div>
          <Button variant="primary" icon={<Plus size={20} />}>
            Add Employee
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SearchBar
              placeholder="Search by name, email, or ID..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Department
              </label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <Button
                variant="secondary"
                onClick={() => {
                  setSearchQuery('');
                  setDepartmentFilter('');
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <DataTable columns={columns} data={filteredEmployees} />
        </div>

        {/* Employee Details Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedEmployee(null);
          }}
          title="Employee Details"
          size="lg"
        >
          {selectedEmployee && (
            <div className="space-y-6">
              {/* Employee Header */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {selectedEmployee.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedEmployee.name}</h2>
                  <p className="text-gray-600">{selectedEmployee.designation}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Employee ID</p>
                  <p className="font-medium text-gray-900">{selectedEmployee.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-medium text-gray-900">{selectedEmployee.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Department</p>
                  <p className="font-medium text-gray-900">{selectedEmployee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Manager</p>
                  <p className="font-medium text-gray-900">{selectedEmployee.manager}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Join Date</p>
                  <p className="font-medium text-gray-900">{selectedEmployee.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <Badge variant={selectedEmployee.status === 'Active' ? 'success' : 'danger'}>
                    {selectedEmployee.status}
                  </Badge>
                </div>
              </div>

              {/* Performance Section */}
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-3">Performance Score</p>
                <PerformanceBadge score={selectedEmployee.performanceScore} size="md" />
              </div>
            </div>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};
