export interface IFilter {
  name?: string | { $regex: string; $options: string };
  status?: string;
  category?: string;
}
