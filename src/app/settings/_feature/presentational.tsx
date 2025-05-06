"use client";

import { Button, Dialog, DialogPanel } from "@headlessui/react";
import { type FC, useState } from "react";
import Link from "next/link";
import { logout } from "./_api/logout";
import { deleteAccount } from "./_api/deleteAccount";
export const SettingsPresentational: FC = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await deleteAccount();
    } catch (error) {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">設定</h2>
        </div>

        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              アカウント設定
            </h3>
            <div className="space-y-4">
              <Link
                href="/settings/change-email"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                メールアドレスを変更
              </Link>
              <Link
                href="/settings/change-password"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                パスワードを変更
              </Link>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              アカウント操作
            </h3>
            <div className="space-y-4">
              <Button
                onClick={() => logout()}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                ログアウト
              </Button>
              <Button
                onClick={() => setIsDeleteDialogOpen(true)}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                アカウントを削除
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-lg bg-white p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              アカウントの削除
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              アカウントを削除すると、すべてのデータが完全に削除され、復元することはできません。この操作は取り消すことができません。
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                キャンセル
              </Button>
              <Button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                {isDeleting ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    削除中...
                  </div>
                ) : (
                  "アカウントを削除"
                )}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};
