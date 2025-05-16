"use client";

import type { APIResponse } from "@/types/common";
import type { FC } from "react";
import { useState } from "react";
import type { CreateCheckoutLinkResponse } from "./_api/createCheckoutLink";
import { PolicyDialog } from "@/components/PolicyDialog";

type Props = {
  createCheckoutLink: (
    amount: number
  ) => Promise<APIResponse<CreateCheckoutLinkResponse>>;
};

const COIN_PRICE = 50;

export const ChargePresentational: FC<Props> = ({ createCheckoutLink }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        1コイン = {COIN_PRICE}円。コインは5枚単位で購入でき、1回の決済につき最低5枚から購入できます。
      </p>
      <p className="text-center text-red-500 mb-8">
        コインの有効期限は180日です。
      </p>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          カスタム金額
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="custom-amount"
              className="block text-sm text-gray-600 mb-2">
              購入するコインの数を入力
            </label>
            <div className="space-y-2">
              <input
                type="number"
                id="custom-amount"
                min={1}
                placeholder="例: 300"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                onChange={(e) => setSelectedAmount(Number(e.target.value))}
                value={selectedAmount || ""}
              />
              {selectedAmount && (
                <p className="text-right text-sm text-gray-600">
                  支払い金額: ¥{(selectedAmount * COIN_PRICE).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="button"
            disabled={!selectedAmount || isLoading}
            onClick={() => selectedAmount && handlePurchase(selectedAmount)}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                <span>処理中...</span>
              </div>
            ) : selectedAmount ? (
              `${selectedAmount}コイン (¥${(
                selectedAmount * COIN_PRICE
              ).toLocaleString()}) を購入`
            ) : (
              "コインの数を入力してください"
            )}
          </button>
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
