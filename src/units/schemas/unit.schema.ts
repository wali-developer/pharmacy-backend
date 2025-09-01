import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UnitDocument = Unit & Document;

@Schema({ timestamps: true })
export class Unit {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ enum: ['Active', 'Inactive'], default: 'Active' })
  status: string;
}

export const UnitSchema = SchemaFactory.createForClass(Unit);
