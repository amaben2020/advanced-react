import React, { useState } from 'react';

type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [asc, setAsc] = useState(true);

  const sorted = [...data]?.sort((a, b) => {
    if (!sortKey) return 0;

    const aVal = a[sortKey];
    const bVal = b[sortKey];

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return asc ? aVal - bVal : bVal - aVal;
    }

    return asc
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              style={{
                textAlign: 'left',
                padding: '8px',
                borderBottom: '1px solid #ccc',
                cursor: col.sortable ? 'pointer' : 'default',
              }}
              onClick={() => {
                if (col.sortable) {
                  if (sortKey === col.key) {
                    setAsc(!asc);
                  } else {
                    setSortKey(col.key);
                    setAsc(true);
                  }
                }
              }}
            >
              {col.label}
              {sortKey === col.key ? (asc ? ' 🔼' : ' 🔽') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td
                key={String(col.key)}
                style={{
                  padding: '8px',
                  borderBottom: '1px solid #eee',
                }}
              >
                {String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
