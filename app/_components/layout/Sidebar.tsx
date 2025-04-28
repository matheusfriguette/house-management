import { Dollar, HomeAlt } from "iconoir-react";

export default function Sidebar() {
  return (
    <aside className="w-64 px-4 py-12 border-r-2 border-gray-200">
      <nav>
        <ul className="flex flex-col gap-2">
          <li className="p-2 font-semibold text-blue-500 flex items-center gap-3 bg-gray-100 rounded-md">
            <HomeAlt />

            <span>Home Inventory</span>
          </li>

          <li className="p-2 font-semibold text-gray-600 flex items-center gap-3 rounded-md hover:text-blue-500 hover:bg-gray-100">
            <Dollar />

            <span>Budget</span>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
