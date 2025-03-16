"use client";

import {
  Button,
  CloseButton,
  Dialog,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { type FC, useState } from "react";
import { TermsContent } from "./policies/TermsContent";
import { PrivacyContent } from "./policies/PrivacyContent";
import { TransactionContent } from "./policies/TransactionContent";

type PolicyType = "terms" | "privacy" | "transaction";

type Props = {
  label?: string;
  buttonClassName?: string;
  initialTab?: PolicyType;
};

export const PolicyDialog: FC<Props> = ({
  label = "ポリシーを確認",
  buttonClassName = "text-blue-600 hover:text-blue-500 hover:underline",
  initialTab = "terms",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const tabs: { id: PolicyType; title: string }[] = [
    { id: "terms", title: "利用規約" },
    { id: "privacy", title: "プライバシーポリシー" },
    { id: "transaction", title: "特定商取引法に基づく表示" },
  ];

  const getContent = (type: PolicyType) => {
    switch (type) {
      case "terms":
        return <TermsContent />;
      case "privacy":
        return <PrivacyContent />;
      case "transaction":
        return <TransactionContent />;
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className={buttonClassName}>
        {label}
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-2xl rounded-lg bg-white">
            <div className="flex items-center justify-between border-b p-4">
              <TabGroup
                defaultIndex={tabs.findIndex((tab) => tab.id === initialTab)}>
                <div className="flex items-center justify-between w-full">
                  <TabList className="flex space-x-4">
                    {tabs.map((tab) => (
                      <Tab
                        key={tab.id}
                        className={({ selected }) =>
                          `px-4 py-2 text-sm font-medium rounded-lg ${
                            selected
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                          }`
                        }>
                        {tab.title}
                      </Tab>
                    ))}
                  </TabList>
                  <CloseButton
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-1 hover:bg-gray-100">
                    <span className="sr-only">閉じる</span>
                    <svg
                      className="h-5 w-5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </CloseButton>
                </div>

                <TabPanels className="mt-4">
                  {tabs.map((tab) => (
                    <TabPanel
                      key={tab.id}
                      className="max-h-[60vh] overflow-y-auto p-6">
                      {getContent(tab.id)}
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>
            </div>

            <div className="border-t p-4 flex justify-end">
              <CloseButton
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                閉じる
              </CloseButton>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
