import { IOrder } from './IOrder';
import { IProduct } from '@modules/products/domain/models/IProduct';

export interface IOrderProducts {
  id: string;
  order: IOrder;
  product: IProduct;
  address: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}
