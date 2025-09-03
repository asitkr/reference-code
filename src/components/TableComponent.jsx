import {
    ChevronDown,
    Search,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { useMemo, useState } from "react";
import ItemsPerPageDropdown from "./ItemsPerPageDropdown";

const TableComponent = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });

    const pageSizeOptions = [10, 20, 30, 50, 100, 500];

    // 🔎 Filter by search
    const filteredData = useMemo(() => {
        return data.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.department.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [data, searchTerm]);

    // 🔽 Sort
    const sortedData = useMemo(() => {
        if (!sortConfig.key) return filteredData;
        return [...filteredData].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key])
                return sortConfig.direction === "ascending" ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key])
                return sortConfig.direction === "ascending" ? 1 : -1;
            return 0;
        });
    }, [filteredData, sortConfig]);

    // 📑 Pagination
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);

    // 👉 Sorting handler
    const handleSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    // 👉 Handle pagination click
    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // 👉 Get pagination numbers with ellipsis
    const getPaginationNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Always show 1st page
            pages.push(1);

            if (currentPage > 3) {
                pages.push("ellipsis1");
            }

            // Middle pages
            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
            ) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("ellipsis2");
            }

            // Always show last page
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            {/* Controls */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex flex-col sm:flex-row justify-between gap-4">
                {/* Items per page */}
                {/* <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-700 dark:text-slate-300">Show</span>
                    <div
                        className="relative"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 cursor-pointer">
                            {itemsPerPage}
                            <ChevronDown
                                className={`h-4 w-4 text-slate-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-lg z-10 py-1">
                                {pageSizeOptions.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => {
                                            setItemsPerPage(size);
                                            setCurrentPage(1); // reset
                                        }}
                                        className={`w-full px-3 py-2 text-left text-sm ${itemsPerPage === size
                                                ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
                                                : "hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-300">entries</span>
                </div> */}

                <ItemsPerPageDropdown
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
        pageSizeOptions={pageSizeOptions}
      />

                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // reset page
                        }}
                        className="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg w-full bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    />
                </div>
            </div>

            {/* Table */}
            <table className="min-w-full border-collapse text-sm">
                {/* <thead>
          <tr className="bg-gray-100 text-left text-gray-700">
            {[
              { key: "id", label: "ID" },
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "role", label: "Role" },
              { key: "department", label: "Department" },
              { key: "status", label: "Status" },
              { key: "age", label: "Age" },
              { key: "location", label: "Location" },
            ].map(({ key, label }) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="px-4 py-2 border cursor-pointer hover:bg-gray-200"
              >
                {label}
                {sortConfig.key === key && (
                  <span className="ml-1 text-blue-500">
                    {sortConfig.direction === "ascending" ? "↑" : "↓"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead> */}
                <thead>
                    <tr className="bg-gray-100 text-left text-gray-700">
                        {[
                            { key: "id", label: "ID", width: "80px" },
                            { key: "name", label: "Name", width: "160px" },
                            { key: "email", label: "Email", width: "220px" },
                            { key: "role", label: "Role", width: "140px" },
                            { key: "department", label: "Department", width: "160px" },
                            { key: "status", label: "Status", width: "120px" },
                            { key: "age", label: "Age", width: "100px" },
                            { key: "location", label: "Location", width: "160px" },
                        ].map(({ key, label, width }) => (
                            <th
                                key={key}
                                onClick={() => handleSort(key)}
                                style={{ width }}
                                className="px-4 py-2 border cursor-pointer hover:bg-gray-200 select-none"
                            >
                                <div className="flex items-center gap-1">
                                    <span>{label}</span>
                                    {/* fixed width for icon so no shaking */}
                                    <span className="inline-block w-3 text-blue-500 text-xs">
                                        {sortConfig.key === key
                                            ? sortConfig.direction === "ascending"
                                                ? "↑"
                                                : "↓"
                                            : ""}
                                    </span>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {paginatedData.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-4 py-2 border">{user.id}</td>
                            <td className="px-4 py-2 border">{user.name}</td>
                            <td className="px-4 py-2 border">{user.email}</td>
                            <td className="px-4 py-2 border">{user.role}</td>
                            <td className="px-4 py-2 border">{user.department}</td>
                            <td className="px-4 py-2 border">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === "Active"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                        }`}
                                >
                                    {user.status}
                                </span>
                            </td>
                            <td className="px-4 py-2 border">{user.age}</td>
                            <td className="px-4 py-2 border">{user.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination with "Showing X to Y of Z" */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                        Showing {Math.min((currentPage - 1) * itemsPerPage + 1, sortedData.length)} to{" "}
                        {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} entries
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <ChevronsLeft className="h-4 w-4" />
                            </button>

                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            <div className="flex gap-1 items-center">
                                {getPaginationNumbers().map((pageNum, index) =>
                                    pageNum.toString().includes("ellipsis") ? (
                                        <div
                                            key={`ellipsis-${index}`}
                                            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-400 min-w-[40px] text-center dark:bg-slate-700 dark:border-slate-600 dark:text-slate-400"
                                        >
                                            ...
                                        </div>
                                    ) : (
                                        <button
                                            key={pageNum}
                                            onClick={() => handlePageChange(Number(pageNum))}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors min-w-[40px] ${currentPage === pageNum
                                                    ? "bg-blue-500 text-white shadow-md"
                                                    : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:text-slate-300"
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    )
                                )}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>

                            <button
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                            >
                                <ChevronsRight className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TableComponent;
