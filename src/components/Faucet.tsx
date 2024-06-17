import { useRef, useState } from 'react';
import { Button } from './theme';
import { isAddress } from 'viem';
import axios, { AxiosError } from 'axios';
export const Faucet = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const triggerClaim = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const address = formData.get('address');
    try {
      const claim = await axios.post<
        any,
        {
          status: number;
          data: boolean;
        }
      >(`http://localhost:3000/api/transaction/${address}`);
    } catch (e: any | AxiosError) {
      if (axios.isAxiosError(e)) {
        return alert(e?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="pb-8">
        <h1 className="text-xl text-center">Faucet</h1>
      </div>
      <form onSubmit={triggerClaim}>
        <div className="flex flex-col">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium" htmlFor="address">
              Address
            </label>
          </div>
          <input
            className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            placeholder="0x...000"
            name="address"
            required
          />
        </div>
        <Button theme="primary" option="mt-2 w-full">
          {isLoading ? 'loading . . .' : 'Claim ( 0.1 )'}
        </Button>
      </form>
    </div>
  );
};
