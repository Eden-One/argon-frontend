import { useState } from "react";
import ParentLayout from "@/components/layout/ParentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  Search,
  Send,
  ArrowLeft,
  Paperclip,
  Check,
  CheckCheck,
} from "lucide-react";
import { messagesParent } from "@/data/parentMockData";

export default function ParentMessagerie() {
  const [selectedConversation, setSelectedConversation] = useState<typeof messagesParent[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = messagesParent.filter(
    (conv) =>
      conv.correspondant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (conv.matiere && conv.matiere.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const unreadCount = messagesParent.filter((m) => m.nonLu).length;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hier";
    } else {
      return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send the message
    setNewMessage("");
  };

  // Mobile: Show conversation list or conversation detail
  const showConversationList = !selectedConversation;

  return (
    <ParentLayout>
      <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-4rem)] flex flex-col pb-20 lg:pb-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          {selectedConversation ? (
            <Button
              variant="ghost"
              className="lg:hidden"
              onClick={() => setSelectedConversation(null)}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour
            </Button>
          ) : (
            <div>
              <h1 className="font-display text-2xl font-bold mb-1">Messagerie</h1>
              <p className="text-muted-foreground">
                {unreadCount > 0
                  ? `${unreadCount} message${unreadCount > 1 ? "s" : ""} non lu${unreadCount > 1 ? "s" : ""}`
                  : "Tous les messages sont lus"}
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Conversations List */}
          <Card
            className={`flex-shrink-0 w-full lg:w-80 flex flex-col ${
              !showConversationList ? "hidden lg:flex" : ""
            }`}
          >
            <CardHeader className="pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="space-y-1 p-2">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
                        selectedConversation?.id === conv.id
                          ? "bg-amber-100"
                          : conv.nonLu
                          ? "bg-amber-50 hover:bg-amber-100"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conv.avatar} />
                        <AvatarFallback className="bg-amber-100 text-amber-700">
                          {conv.correspondant[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium truncate ${conv.nonLu ? "font-semibold" : ""}`}>
                            {conv.correspondant}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(conv.date)}
                          </span>
                        </div>
                        {conv.matiere && (
                          <p className="text-xs text-amber-600">{conv.matiere}</p>
                        )}
                        <p className="text-sm text-muted-foreground truncate">
                          {conv.dernierMessage}
                        </p>
                      </div>
                      {conv.nonLu && (
                        <div className="w-3 h-3 rounded-full bg-amber-500" />
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Conversation Detail */}
          <Card
            className={`flex-1 flex flex-col ${
              showConversationList ? "hidden lg:flex" : ""
            }`}
          >
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <CardHeader className="border-b py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.avatar} />
                      <AvatarFallback className="bg-amber-100 text-amber-700">
                        {selectedConversation.correspondant[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedConversation.correspondant}</h3>
                      {selectedConversation.matiere && (
                        <p className="text-sm text-muted-foreground">
                          {selectedConversation.matiere}
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      {selectedConversation.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.expediteur === "parent" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-2xl ${
                              msg.expediteur === "parent"
                                ? "bg-amber-500 text-white rounded-br-sm"
                                : "bg-muted rounded-bl-sm"
                            }`}
                          >
                            <p className="text-sm">{msg.contenu}</p>
                            <div
                              className={`flex items-center justify-end gap-1 mt-1 ${
                                msg.expediteur === "parent"
                                  ? "text-amber-100"
                                  : "text-muted-foreground"
                              }`}
                            >
                              <span className="text-xs">
                                {new Date(msg.date).toLocaleTimeString("fr-FR", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                              {msg.expediteur === "parent" && (
                                <CheckCheck className="h-3 w-3" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Textarea
                      placeholder="Écrivez votre message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[44px] max-h-[120px] resize-none"
                      rows={1}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-amber-500 hover:bg-amber-600"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p>Sélectionnez une conversation</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </ParentLayout>
  );
}
