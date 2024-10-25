import { Metadata } from "next";
import { InboxFilters } from "./components/inbox-filters";
import { MessageList } from "./components/message-list";

export const metadata: Metadata = {
  title: "Inbox | Property Vue",
  description: "Manage your incoming messages and leads",
};

export default function InboxPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#0d3366] mb-2">Inbox</h1>
        <p className="text-gray-500">
          Manage and respond to form submissions from your widgets
        </p>
      </div>
      <InboxFilters />
      <MessageList />
    </div>
  );
}