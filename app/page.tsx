"use client";

import { useEffect, useState } from "react";

function Home() {
  const [price, setPrice] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const coins = [
    "BTC",
    "ETH",
    "LTC",
    "XRP",
    "BCH",
    "ADA",
    "SOL",
    "DOT",
    "AVAX",
    "DOGE",
    "MATIC",
    "BNB",
    "LINK",
    "XLM",
    "TRX",
    "FIL",
    "SHIB",
    "LUNA",
    "FTM",
    "ALGO",
    "VET",
    "NEO",
    "EOS",
    "ZRX",
    "KSM",
    "YFI",
    "UNI",
    "SAND",
    "AAVE",
    "CRV",
    "MKR",
    "GRT",
    "COMP",
    "STMX",
    "ZEC",
    "XMR",
    "BAT",
    "CRO",
    "EGLD",
    "KAVA",
    "HNT",
    "OXT",
    "LRC",
    "ICX",
    "QTUM",
    "REN",
    "STPT",
  ];

  useEffect(() => {
    async function fetchCryptoData() {
      setLoading(true);

      try {
        const responses = await Promise.all(
          coins.map((currency) =>
            fetch(`https://rest.coinapi.io/v1/exchangerate/${currency}/USD`, {
              headers: { "X-CoinAPI-Key": "f89e5fb2-af01-4db6-9918-535c68e489c4" },
            })
              .then((response) => response.json())
              .catch((error) => null)
          )
        );

        const fetchedPrice = responses

          .filter((response) => response && response.rate)

          .map((response, i) => ({

            currency: coins[i],

            rate: response.rate,

          }));

        setPrice(fetchedPrice);
      } catch (err) {

        console.error("Error fetching data:", err);

      } finally {

        setLoading(false);
      }
    }

    fetchCryptoData();
  }, []);

  return (
    <>
      {loading && (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="text-center text-3xl">Sabar Karo...</p>
        </div>
      )}

      {!loading && (
        <div className="w-full justify-center">
          <table className="min-w-full bg-white ">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-4 text-left text-lg font-medium text-white">
                  Cryptocurrency
                </th>
                <th className="p-4 text-left text-lg font-medium text-white">
                  Price in USD
                </th>
              </tr>
            </thead>
            <tbody>
              {price.map((crypto) => (
                <tr key={crypto.currency} className="even:bg-blue-50">
                  <td className="p-4 text-sm text-black">
                    {`1 ${crypto.currency}`}
                  </td>
                  <td className="p-4 text-sm text-black">
                    {`$ ${crypto.rate.toFixed(2)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Home;
