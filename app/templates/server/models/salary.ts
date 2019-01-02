import * as connections from '../config/connection';
import { Schema, Document, Types } from 'mongoose';
/**
* @export
* @interface ISalaryModel
* @extends {Document}
*/
export interface ISalaryModel extends Document {
  
}
const salarySchema = new Schema({
  
},
{
timestamps: true,
collection: 'salary'
});
export default connections.db.model< ISalaryModel >('Salary', salarySchema);