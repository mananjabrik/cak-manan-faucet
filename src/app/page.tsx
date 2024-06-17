'use client';
import { formatAddress } from '@/lib';
import { format } from 'date-fns';
export default function Home() {
  const shortAddressWallet = '0x9B9862654eA3F3cC054276e2A442164cBb2B15F4'; // todo get wallet address

  return (
    <div className="lg:w-96 md:w-96 sm:w-100 min-h-screen bg-slate-800 mx-auto p-8 relative">
      <div className="pb-8">
        <h1 className="text-xl text-center">Faucet</h1>
      </div>
      <form>
        <div className="flex flex-col">
          <div className="flex-1">
            <label>Address</label>
          </div>
          <input
            className="flex-1 rounded text-gray-500 px-2"
            type="text"
            placeholder="0x...000"
          />
        </div>
        <button className="bg-sky-500 hover:bg-sky-700 rounded w-full mt-2">
          Claim
        </button>
      </form>
      <div className="overflow-hidden bg-gray-500 mt-5 rounded">
        <div>
          <h2 className="text-xl text-center">Tracker</h2>
        </div>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Address</th>
              <th>Amount</th>
              <th>Claim At</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatAddress(shortAddressWallet)}</td>
              <td>10</td>
              <td>{format(new Date().toLocaleString(), 'mm/dd/yyyy')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
