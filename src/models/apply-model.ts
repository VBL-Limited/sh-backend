import { model, Schema ,Document} from 'mongoose';
import { IUser } from './user-model';
export interface IApply extends Document {
    offreId: string;
    userId: IUser['_id'];
  }
  
const ApplySchema = new Schema({
    offreId: {
        type: Schema.Types.ObjectId,
        ref: 'Offre'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Application  = model('Application', ApplySchema);
export { Application}