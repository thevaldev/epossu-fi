export interface PriceData {
  today: PriceJSON;
  tomorrow: {
    data_ok: boolean;
    prices: [
      {
        price: number;
        date: string;
      }
    ];
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

export interface ChartData {
  dataset: [
    {
      timestamp: number;
      date: string;
      price: number;
    }
  ];
}

export interface PriceJSON {
  data_ok: boolean;
  prices: [
    {
      price: number;
      date: string;
    }
  ];
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
