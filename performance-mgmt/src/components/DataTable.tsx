import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T | string;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
}

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps<any>>(
  ({ columns, data, loading = false }, ref) => {
    const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

    const sortedData = React.useMemo(() => {
      if (!sortConfig) return data;

      return [...data].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }, [data, sortConfig]);

    const handleSort = (key: string) => {
      setSortConfig(prev =>
        prev?.key === key
          ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
          : { key, direction: 'asc' }
      );
    };

    if (loading) {
      return <div className="flex justify-center items-center p-8">Loading...</div>;
    }

    return (
      <div ref={ref} className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort(col.accessor as string)}
                  style={{ width: col.width }}
                >
                  <div className="flex items-center gap-2">
                    {col.header}
                    {sortConfig?.key === col.accessor && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="px-4 py-3" style={{ width: col.width }}>
                    {col.render ? col.render(row[col.accessor as keyof typeof row], row) : (row[col.accessor as keyof typeof row] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {sortedData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No data available
          </div>
        )}
      </div>
    );
  }
);

DataTable.displayName = 'DataTable';
