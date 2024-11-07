export interface PriceData {
  today: PriceJSON;
  tomorrow: {
    data_ok: boolean;
    prices: {
      price: number;
      date: string;
    }[];
    options: {
      average: number;
      highest: {
        price: number;
        date: string;
      };
      lowest: {
        price: number;
        date: string;
      };
    };
  };
  chart: ChartData;
}

export interface AlertsJSON {
  [key: string]: {
    id: string;
    message: string;
    type: string;
    canBeDismissed: boolean;
  };
}

export interface ChartData {
  dataset: {
    timestamp: number;
    date: string;
    price: number;
  }[];
}

export interface PriceJSON {
  data_ok: boolean;
  prices: {
    price: number;
    date: string;
  }[];
  options: {
    average: number;
    highest: {
      price: number;
      date: string;
    };
    lowest: {
      price: number;
      date: string;
    };
  };
}

export interface ModuleData {
  notifications: {
    status: boolean;
    message: string;
    options: {
      contents: {
        [key: string]: string;
      };
      types: {
        [key: string]: string;
      };
    };
    subscription?: {
      id: string;
      endpoint: PushSubscription;
      type: subscriptionType;
    };
  };
}

export interface ModalHandlerProps {
  title: string;
  jsx: JSX.Element | null;
  icon: JSX.Element | null;
  closeText?: string;
  onClose: () => void;
  action?: () => void;
  disableOutsideClick?: boolean;
}

export interface ErrorProps {
  message: string;
  isCritical: boolean;
}

export interface subscriptionJSON {
  id: string;
  endpoint: PushSubscription;
  type: subscriptionType;
}

export interface subscriptionType {
  content: string;
  content_type: string;
  when: string;
  when_type: string;
}
