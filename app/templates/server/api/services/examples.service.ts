import Promise from 'bluebird';
import L from '../../common/logger';
import Example, {IExampleModel} from '../../models/example';

export class ExamplesService {
  all(): Promise<IExampleModel[]> {
    return Example.find();
  }

  byId(_id: string): Promise<IExampleModel> {
    return Example.findById(_id);
  }

  create(name: string): Promise<IExampleModel> {
    return Example({name}).save();
  }
}

export default new ExamplesService();