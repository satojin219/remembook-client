"use client";

import type { APIResponse } from "@/types/common";
import type { FC } from "react";
import { useState } from "react";
import type { CreateCheckoutLinkResponse } from "./_api/createCheckoutLink";
import { PolicyDialog } from "@/components/PolicyDialog";
import { COIN_PRICE, PER_COIN_AMOUNT } from "@/lib/coin";

type Props = {
  createCheckoutLink: (
    amount: number
  ) => Promise<APIResponse<CreateCheckoutLinkResponse>>;
};

export const ChargePresentational: FC<Props> = ({ createCheckoutLink }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateBonusCoins = (baseAmount: number) => {
    if (baseAmount >= 50) {
      return Math.floor(baseAmount / 10);
    }
    return 0;
  };

  const handlePurchase = async (amount: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await createCheckoutLink(amount);
      const stripeUrl = res.data?.url;
      if (!stripeUrl) {
        setError("決済URLの取得に失敗しました。");
        return;
      }
      window.location.href = stripeUrl;
    } catch (err) {
      setError("エラーが発生しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        コインを購入
      </h1>
      <p className="text-center text-gray-600 mb-8">
        1コイン = {COIN_PRICE}
        円。コインは5枚単位で購入でき、1回の決済につき最低5枚から購入できます。
      </p>
      <p className="text-center text-red-500 mb-8">
        コインの有効期限は180日です。
      </p>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          コインを選択
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { amount: 10, label: "10枚" },
              { amount: 50, label: "50枚 + 5枚ボーナス" },
              { amount: 100, label: "100枚 + 10枚ボーナス" },
            ].map((option) => {
              const bonusCoins = calculateBonusCoins(option.amount);
              const totalCoins = option.amount + bonusCoins;
              const totalPrice = option.amount * COIN_PRICE;

              return (
                <button
                  key={option.amount}
                  type="button"
                  onClick={() => handlePurchase(option.amount)}
                  disabled={isLoading}
                  className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all">
                  <div className="font-semibold text-lg">{option.label}</div>
                  <div className="text-gray-600 mt-1">
                    ¥{totalPrice.toLocaleString()}
                  </div>
                  {bonusCoins > 0 && (
                    <div className="text-sm text-green-600 mt-1">
                      +{bonusCoins}枚ボーナス
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full" />
              <span>処理中...</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>※ コインの購入は Stripe による安全な決済で処理されます</p>
        <PolicyDialog
          label="特定商取引法に基づく表示を確認する"
          initialTab="transaction"
        />
      </div>
    </div>
  );
};
