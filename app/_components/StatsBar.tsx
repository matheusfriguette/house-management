export default function StatsBar({ items }: any) {
  const totalCost = items.reduce(
    (sum: any, item: any) => sum + (item.estimatedCost || 0),
    0
  );
  const boughtCount = items.filter((i: any) => i.status === "bought").length;

  return (
    <div className="bg-white border-t-2 border-gray-300 p-3">
      <div className="flex justify-between">
        <span>Total: ${totalCost}</span>
        <span>
          {boughtCount}/{items.length} items bought
        </span>
        <span className="text-blue-500">Add Item</span>
      </div>
    </div>
  );
}
