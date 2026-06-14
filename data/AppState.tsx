import React, { PropsWithChildren, createContext, useContext, useMemo, useState } from "react";

import {
  ChatMessage,
  initialMessages,
  outfits,
  users
} from "./mockData";

type AppStateValue = {
  activeAccountId: string;
  activeUser: (typeof users)[number];
  gems: number;
  purchasedOutfitIds: string[];
  selectedOutfitId: string;
  messages: Record<string, ChatMessage[]>;
  signIn: (email?: string) => void;
  switchAccount: (accountId: string) => void;
  purchaseOutfit: (outfitId: string) => boolean;
  addGems: (amount: number) => void;
  selectOutfit: (outfitId: string) => void;
  addMessage: (friendId: string, body: string) => void;
};

const AppStateContext = createContext<AppStateValue | undefined>(undefined);

export function AppStateProvider({ children }: PropsWithChildren) {
  const [activeAccountId, setActiveAccountId] = useState(users[0].id);
  const [gems, setGems] = useState(users[0].gems);
  const [purchasedOutfitIds, setPurchasedOutfitIds] = useState(
    outfits.filter((item) => item.purchased).map((item) => item.id)
  );
  const [selectedOutfitId, setSelectedOutfitId] = useState("csulb-tee");
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(initialMessages);

  const activeUser = users.find((user) => user.id === activeAccountId) ?? users[0];

  const value = useMemo<AppStateValue>(
    () => ({
      activeAccountId,
      activeUser,
      gems,
      purchasedOutfitIds,
      selectedOutfitId,
      messages,
      signIn: (email?: string) => {
        const match = users.find((user) => user.email.toLowerCase() === email?.trim().toLowerCase());
        const nextUser = match ?? users[0];
        setActiveAccountId(nextUser.id);
        setGems(nextUser.gems);
      },
      switchAccount: (accountId: string) => {
        const nextUser = users.find((user) => user.id === accountId);
        if (nextUser) {
          setActiveAccountId(accountId);
          setGems(nextUser.gems);
        }
      },
      purchaseOutfit: (outfitId: string) => {
        const outfit = outfits.find((item) => item.id === outfitId);
        if (!outfit) {
          return false;
        }
        if (purchasedOutfitIds.includes(outfitId)) {
          return true;
        }
        if (gems < outfit.price) {
          return false;
        }
        setGems((current) => current - outfit.price);
        setPurchasedOutfitIds((current) => [...current, outfitId]);
        return true;
      },
      addGems: (amount: number) => setGems((current) => current + amount),
      selectOutfit: (outfitId: string) => setSelectedOutfitId(outfitId),
      addMessage: (friendId: string, body: string) => {
        const message: ChatMessage = {
          id: `${Date.now()}`,
          from: "me",
          body,
          time: "Now"
        };
        setMessages((current) => ({
          ...current,
          [friendId]: [...(current[friendId] ?? []), message]
        }));
      }
    }),
    [activeAccountId, activeUser, gems, messages, purchasedOutfitIds, selectedOutfitId]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const value = useContext(AppStateContext);
  if (!value) {
    throw new Error("useAppState must be used inside AppStateProvider");
  }
  return value;
}

