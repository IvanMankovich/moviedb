import { Types } from 'mongoose';
import { IPerson, Person } from '../../models/PersonModel';
import { parseFiles } from '../../utils/helpers';
import { assetsService } from '../AssetsService/AssetsService';
import { ErrorService } from '../ErrorService';
import { PersonBuilder, PersonDto } from './helpers';

class PeopleService {
  async createPerson(
    personData: IPerson,
    files?: {
      [fieldname: string]: Express.Multer.File[];
    },
  ) {
    if (personData) {
      const person = new PersonBuilder(personData);

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

  async getPersonById(id: string) {
    try {
      const isExists = await this.checkPersonId(id);
      if (isExists) {
        const people = await Person.aggregate([
          { $match: { _id: new Types.ObjectId(id) } },
          {
            $lookup: {
              from: 'assets',
              localField: 'personPic',
              foreignField: '_id',
              as: 'personPic',
            },
          },
          { $unwind: '$personPic' },
          {
            $lookup: {
              from: 'assets',
              localField: 'personGalleryPhotos',
              foreignField: '_id',
              as: 'personGalleryPhotos',
            },
          },
          {
            $lookup: {
              from: 'genders',
              localField: 'personGender',
              foreignField: '_id',
              as: 'personGender',
            },
          },
          { $unwind: '$personGender' },
          {
            $lookup: {
              from: 'countries',
              localField: 'personPlaceOfBirth',
              foreignField: '_id',
              as: 'personPlaceOfBirth',
            },
          },
          { $unwind: '$personPlaceOfBirth' },
          {
            $lookup: {
              from: 'positions',
              localField: 'personPositions',
              foreignField: '_id',
              as: 'personPositions',
            },
          },
        ]);
        const person = people?.[0];

        if (person) {
          return new PersonDto(person);
        } else {
          throw ErrorService.NotFound('Person not found');
        }
      } else {
        throw ErrorService.NotFound('Person not found');
      }
    } catch (err) {
      throw ErrorService.NotFound(err?.toString?.());
    }
  }

  async checkPersonId(id?: string) {
    try {
      if (id) {
        const isExists = await Person.findById(id);
        if (isExists) {
          return true;
        }
        return false;
      } else {
        throw ErrorService.BadRequest('Person id not provided');
      }
    } catch (err) {
      throw ErrorService.BadRequest(err?.toString?.());
    }
  }
}

export const peopleService = new PeopleService();
