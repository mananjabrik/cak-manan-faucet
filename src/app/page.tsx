export default function Home() {
  return (
    <div className="lg:w-96 md:w-96 sm:w-100 min-h-screen bg-slate-800 mx-auto p-8 relative">
      <div className="text-center pb-8">
        <h1 className="text-xl">Faucet</h1>
      </div>
      <form>
        <div className="flex xl:flex-row md:flex-row sm:flex-col">
          <div className="flex-1">
            <label>Address</label>
          </div>
          <input className="flex-1 rounded text-gray-500" type="text" />
        </div>
        <button className="bg-sky-500 hover:bg-sky-700 rounded w-full mt-2">
          Claim
        </button>
      </form>
      <div className="overflow-hidden">
        <div className="py-8">
          <h2 className="text-xl text-center">Tracker</h2>
        </div>
        <table className="table-auto ">
          <thead>
            <tr>
              <th>Address</th>
              <th>Amount</th>
              <th>Claim At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0x53a...2433</td>
              <td>10</td>
              <td>{new Date().toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
