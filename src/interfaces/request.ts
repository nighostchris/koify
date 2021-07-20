import { TRequestVariableFrom, TRequestDataType } from '../types';

export interface IRequestVariable {
  // Name of the variable you parsed from request
  name: string,
  // The location of the variable you parsed from request
  from: TRequestVariableFrom,
  // Data type of the variable
  type: TRequestDataType,
  // (Optional) Check the validity of received variable
  validator?: any,
  // Required for processing by service handler later on
  require: boolean,
}
