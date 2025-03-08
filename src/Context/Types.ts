export type Order = {
  orderId: number | null;
  userName: string | null;
  orderType: string | null;
  completed: boolean | null;
};

export type basicOrderType = {
  userName: string;
  orderType: string;
  completed: boolean;
};

export type PanelContainerProps = {
  darkMode: boolean;
  userName: string | undefined;
  userDiscordId: string | undefined;
  userLoggedIn: boolean;
  lockedStatus: boolean;
};

export type PanelContentProps = {
  darkMode: boolean;
  userName: string;
  userDiscordId: string;
  lockedStatus: boolean;
};

export type BreakfastOption = {
  name: string;
  ingredients: string[];
  colour: string;
};

export type LockedStatusRequest = {
  lockStatus: string;
  value: boolean;
};
