import { model, Schema } from 'mongoose';

export interface IPerson {
  _id: string;
  personDescription: string;
  personDoB: Date;
  personFullName: string;
  personGender: string;
  personName: string;
  personPlaceOfBirth: string;
  personPositions: string;
  personSocials: IPersonSocials;
  personWebsite: string;
  personPic: string;
  personGalleryPhotos: string[];
}

export interface IPersonSocials {
  facebook: string;
  twitter: string;
  instagram: string;
}

const personSchema = new Schema({
  personName: {
    type: Schema.Types.String,
    required: true,
    index: 1,
  },
  personFullName: {
    type: Schema.Types.String,
    unique: true,
    index: 1,
  },
  personPositions: {
    type: [Schema.Types.ObjectId],
    ref: 'Position',
    required: true,
    index: 1,
  },
  personPic: {
    type: Schema.Types.ObjectId,
  },
  personGender: {
    type: Schema.Types.ObjectId,
    ref: 'Gender',
    index: 1,
  },
  personDoB: {
    type: Schema.Types.Date,
    index: 1,
  },
  personPlaceOfBirth: {
    type: Schema.Types.ObjectId,
    ref: 'Country',
    index: 1,
  },
  personWebsite: {
    type: Schema.Types.String,
  },
  personSocials: {
    facebook: {
      type: Schema.Types.String,
    },
    instagram: {
      type: Schema.Types.String,
    },
    twitter: {
      type: Schema.Types.String,
    },
  },
  personDescription: {
    type: Schema.Types.String,
  },
  personGalleryPhotos: {
    type: [Schema.Types.ObjectId],
  },
});

const Person = model('Person', personSchema);

export { Person };
