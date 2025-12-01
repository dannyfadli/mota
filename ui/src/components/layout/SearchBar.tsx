import { Search, ScanLine } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="w-full flex items-center gap-2 bg-white shadow-sm border border-gray-200 rounded-xl px-4 py-2">
      
      {/* Icon Search */}
      <Search className="w-5 h-5 text-gray-500" />

      {/* Input */}
      <input
        type="text"
        placeholder="Jelajahi"
        className="flex-1 text-sm outline-none placeholder-gray-400"
      />

      {/* Icon Scan / Camera */}
      <button className="p-1 rounded-lg bg-green-100 text-green-600">
        <ScanLine className="w-5 h-5" />
      </button>
    </div>
  );
}
