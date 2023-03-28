import { model, Schema } from 'mongoose';

export interface ILanguage {
  _id: string;
  languageName: string;
  languageCode: string;
}

const languageSchema = new Schema({
  languageName: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    index: 1,
  },
  languageCode: {
    type: Schema.Types.String,
    unique: true,
    required: true,
    index: 1,
  },
});

const Language = model('Language', languageSchema);

export { Language };
