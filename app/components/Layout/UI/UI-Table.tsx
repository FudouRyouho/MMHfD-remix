import { flexRender, Table as TanTable, RowData } from "@tanstack/react-table";

interface TableProps<TData extends RowData> {
  table: TanTable<TData>;
  className?: string;
}

export default function UITable<TData extends RowData>({
  table,
  className = "",
}: TableProps<TData>) {
  return (
    <div className="w-full max-w-full overflow-x-scroll">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-scroll">
          <table className={`min-w-full divide-y divide-white/5 ${className}`}>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className="px-3 py-2 text-center text-[12px] font-medium uppercase tracking-wider cursor-pointer select-none border-l-[1px] border-l-white/5"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="ml-2">
                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted() as string] ?? null}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-zinc-400 divide-y divide-white/5">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="odd:bg-white/5 even:bg-white/10">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-3 py-2 text-center text-sm border-l-[1px] border-l-white/5 whitespace-nowrap ${
                        cell.column.id === "timeLeft"
                          ? cell.getValue().toString().startsWith("+")
                            ? "text-red-600"
                            : "text-green-600"
                          : ""
                      }`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}