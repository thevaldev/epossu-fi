export interface PriceData {
  success: boolean;
  data: {
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
  };
}

export interface PriceApiResponse {
  success: boolean;
  data: {
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
  };
}

export interface ChartData {
  options: {
    highest: number;
    lowest: number;
  };
  dataset: [
    {
      hour: string;
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
