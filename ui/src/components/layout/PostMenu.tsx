import { FilePlus, ShoppingCart } from "lucide-react";

export default function PostMenu({ onSelect }: { onSelect: (type: string) => void }) {
  return (
    <div className="w-full flex flex-col items-center mt-6">

      <h2 className="text-xl font-semibold text-green-900 mb-4">
        Postingan Baru
      </h2>

      {/* Container tombol */}
      <div className="flex gap-4">
        
        {/* Tombol Postingan Biasa */}
        <button
          onClick={() => onSelect("normal")}
          className="w-36 h-20 bg-white border-2 border-green-500 rounded-xl
                     flex flex-col items-center justify-center shadow-md hover:bg-green-50 
                     transition-all duration-200"
        >
          <FilePlus size={28} className="text-green-700" />
          <span className="text-sm font-medium text-green-900 mt-1">
            Post Biasa
          </span>
        </button>

        {/* Tombol Postingan Marketplace */}
        <button
          onClick={() => onSelect("marketplace")}
          className="w-36 h-20 bg-white border-2 border-green-500 rounded-xl
                     flex flex-col items-center justify-center shadow-md hover:bg-green-50
                     transition-all duration-200"
        >
          <ShoppingCart size={28} className="text-green-700" />
          <span className="text-sm font-medium text-green-900 mt-1">
            Marketplace
          </span>
        </button>

      </div>
    </div>
  );
}