import { IPerson, Person } from '../../models/PersonModel';
import { parseFiles } from '../../utils/helpers';
import { assetsService } from '../AssetsService/AssetsService';
import { ErrorService } from '../ErrorService';
import { CreatePerson } from './helpers';

class PeopleService {
  async createPerson(
    personData: IPerson,
    files?: {
      [fieldname: string]: Express.Multer.File[];
    },
  ) {
    if (personData) {
      const person = new CreatePerson(personData);

      const isPersonExists = await this.isPersonExists(person);
      if (!isPersonExists) {
        const newPerson = new Person(person);
        if (files) {
          const { personPic, personGalleryPhotos } = files;
          if (personPic?.length) {
            const personPicToAdd = parseFiles(files.personPic);
            const personPic = await assetsService.addAssets(personPicToAdd);
            newPerson.personPic = personPic[0]._id;
          }

          if (personGalleryPhotos?.length) {
            const personGalleryPhotosToAdd = parseFiles(files.personGalleryPhotos);
            const personGalleryPhotos = await assetsService.addAssets(personGalleryPhotosToAdd);
            newPerson.personGalleryPhotos = personGalleryPhotos.map((f) => f._id);
          }
        }

        const result = await newPerson.save();
        return result;
      } else {
        throw ErrorService.Conflict('Person already exists', isPersonExists);
      }
    } else {
      throw ErrorService.BadRequest('Person data not provided');
    }
  }

  // TODO: exclude exisiting person from search
  async isPersonExists(
    personData: Pick<
      IPerson,
      'personDoB' | 'personFullName' | 'personGender' | 'personName' | 'personPlaceOfBirth'
    >,
  ) {
    if (personData) {
      const { personDoB, personFullName, personGender, personName, personPlaceOfBirth } =
        personData;
      const person = await Person.findOne({
        personDoB,
        personFullName,
        personGender,
        personName,
        personPlaceOfBirth,
      });
      if (person) {
        const errors: string[] = [];
        if (personDoB === person.personDoB) {
          errors.push(`Person already exists.`);
        }
        return errors;
      }
    } else {
      throw ErrorService.BadRequest('Person data not provided');
    }
  }
}

export const peopleService = new PeopleService();
