"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InboxFilters } from "./inbox-filters";
import { MessageList } from "./message-list";

interface InboxDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InboxDialog({ open, onOpenChange }: InboxDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Inbox</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 overflow-y-auto pr-2">
          <InboxFilters />
          <MessageList />
        </div>
      </DialogContent>
    </Dialog>
  );
}