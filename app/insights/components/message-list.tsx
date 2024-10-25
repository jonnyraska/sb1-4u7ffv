"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Mail, MailOpen, Star, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  id: string;
  name: string;
  email: string;
  number: string;
  message: string;
  widget: string;
  date: Date;
  isStarred: boolean;
  isRead: boolean;
}

const initialMessages: Message[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    number: "+1 (555) 123-4567",
    message: "I'm interested in a kitchen remodel. Can you provide more information about your services?",
    widget: "Kitchen Gallery",
    date: new Date("2024-03-20T10:30:00"),
    isStarred: false,
    isRead: false,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    number: "+1 (555) 987-6543",
    message: "Your bathroom designs look amazing! I'd love to schedule a consultation.",
    widget: "Bathroom Gallery",
    date: new Date("2024-03-19T15:45:00"),
    isStarred: true,
    isRead: true,
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    number: "+1 (555) 456-7890",
    message: "Looking to transform our backyard. What's the typical timeline for outdoor projects?",
    widget: "Outdoor Spaces",
    date: new Date("2024-03-19T09:15:00"),
    isStarred: false,
    isRead: true,
  },
];

export function MessageList() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const toggleStar = (id: string) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
  };

  const toggleRead = (id: string) => {
    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, isRead: !msg.isRead } : msg
    ));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const openMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      setMessages(messages.map(msg =>
        msg.id === message.id ? { ...msg, isRead: true } : msg
      ));
    }
  };

  return (
    <>
      <Card>
        <div className="divide-y divide-gray-100">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                !message.isRead ? "bg-blue-50" : ""
              }`}
              onClick={() => openMessage(message)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-8 w-8 ${
                            message.isStarred ? "text-yellow-500" : "text-gray-400"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(message.id);
                          }}
                        >
                          <Star className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {message.isStarred ? "Unstar message" : "Star message"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div>
                    <h3 className="font-semibold text-[#0d3366]">
                      {message.name}
                    </h3>
                    <p className="text-sm text-gray-500">{message.widget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {format(message.date, "MMM d, h:mm a")}
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRead(message.id);
                          }}
                        >
                          {message.isRead ? (
                            <MailOpen className="h-5 w-5" />
                          ) : (
                            <Mail className="h-5 w-5" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {message.isRead ? "Mark as unread" : "Mark as read"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(message.id);
                          }}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete message</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-1">
                {message.message}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{selectedMessage.name}</h3>
                  <p className="text-sm text-gray-500">{selectedMessage.widget}</p>
                </div>
                <span className="text-sm text-gray-500">
                  {format(selectedMessage.date, "PPP p")}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Email:</span>{" "}
                  {selectedMessage.email}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Phone:</span>{" "}
                  {selectedMessage.number}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}