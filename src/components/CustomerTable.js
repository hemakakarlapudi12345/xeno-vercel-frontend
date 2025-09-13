const CustomerTable = ({ customers = [] }) => (
  <div className="overflow-x-auto mt-6">
    <table className="min-w-full bg-white shadow rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">City</th>
          <th className="px-4 py-2">State</th>
        </tr>
      </thead>
      <tbody>
        {customers.length > 0 ? (
          customers.map(c => (
            <tr key={c.customer_id} className="border-b">
              <td className="px-4 py-2">{c.first_name} {c.last_name}</td>
              <td className="px-4 py-2">{c.email}</td>
              <td className="px-4 py-2">{c.city || '-'}</td>
              <td className="px-4 py-2">{c.state || '-'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center py-4 text-gray-500">
              No customers available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default CustomerTable;
