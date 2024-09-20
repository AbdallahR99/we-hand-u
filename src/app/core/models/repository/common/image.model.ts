import { Base } from '../base.model';

export class ImageModel extends Base {
  constructor(public imageUrl: string = '') {
    super();
  }
}
