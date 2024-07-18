export interface IMetric {
  id: string;
  _type: [string, string];
  area: {
    id: string;
  };
  is_automatic: boolean;
  communication: string;
  description: string;
  serial_number: string;
  installation_date: string;
  brand_name: string;
  model_name: string;
  initial_values: number[];
}
