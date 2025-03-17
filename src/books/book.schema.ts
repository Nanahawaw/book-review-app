import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookDocument = Book & Document;
@Schema()
export class Review {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  date: Date;
}

@Schema()
export class Book {
  @Prop({ required: true, index: true })
  title: string;

  @Prop({ required: true, index: true })
  author: string;

  @Prop()
  publishedYear: number;

  @Prop()
  genre: string;

  @Prop()
  rating: number;

  @Prop([Review])
  reviews: Review[];
}

export const BookSchema = SchemaFactory.createForClass(Book);

//create compound index
BookSchema.index({ author: 1, publishedYear: 1 });
