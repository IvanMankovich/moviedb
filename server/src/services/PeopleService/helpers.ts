import { IPerson } from '../../models/PersonModel';

export class CreatePerson {
  personDescription;
  personDoB;
  personFullName;
  personGender;
  personName;
  personPlaceOfBirth;
  personPositions;
  personSocials;
  personWebsite;
  personPic;
  personGalleryPhotos;

  constructor(model: IPerson) {
    this.personDescription = model.personDescription ?? null;
    this.personDoB = model.personDoB ?? null;
    this.personFullName = model.personFullName ?? null;
    this.personGender = model.personGender ?? null;
    this.personName = model.personName ?? null;
    this.personPlaceOfBirth = model.personPlaceOfBirth ?? null;
    this.personPositions = model.personPositions ?? [];
    this.personSocials =
      JSON.stringify(model.personSocials) === '{}'
        ? {
            facebook: null,
            twitter: null,
            instagram: null,
          }
        : model.personSocials;
    this.personWebsite = model.personWebsite ?? null;
    this.personPic = model.personPic ?? null;
    this.personGalleryPhotos = model.personGalleryPhotos ?? [];
  }
}
