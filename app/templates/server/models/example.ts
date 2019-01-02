import * as connections from '../config/connection';
import { Schema, Document, Types } from 'mongoose';

/**
* @export
* @interface IExampleModel
* @extends {Document}
*/
export interface IExampleModel extends Document {
 _id: Types.ObjectId;
 createdAt ? : Date;
 updatedAt ? : Date;
}

const exampleSchema = new Schema({
  name: {
    type: String,
    required: true,
  }
},
{
  timestamps: true,
  collection: 'example'
});

export default connections.db.model< IExampleModel >('Example', exampleSchema);