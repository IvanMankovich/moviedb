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
    type: [Schema.Types.String],
    required: true,
    index: 1,
  },
  personPic: {
    data: Buffer,
    contentType: String,
    size: Number,
  },
  personGender: {
    type: Schema.Types.String,
    index: 1,
  },
  personDoB: {
    type: Schema.Types.Date,
    index: 1,
  },
  personPlaceOfBirth: {
    type: Schema.Types.String,
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
});

const Person = model('Person', personSchema);

export { Person };
