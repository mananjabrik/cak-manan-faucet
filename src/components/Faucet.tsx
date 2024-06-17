import { useState } from 'react';
import { Button } from './theme';
import { isAddress } from 'viem';
export const Faucet = () => {
  const [address, setAddress] = useState<string>();
  const triggerClaim = async () => {
    console.log(isAddress(address ?? ''));
  };

  return (
    <div>
      <div className="pb-8">
        <h1 className="text-xl text-center">Faucet</h1>
      </div>
      <form>
        <div className="flex flex-col">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium">Address</label>
          </div>
          <input
            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            onChange={(e) => setAddress(e.currentTarget.value)}
            placeholder="0x...000"
          />
        </div>
        <Button theme="primary" option="mt-2 w-full" onClick={triggerClaim}>
          Claim
        </Button>
      </form>
    </div>
  );
};
