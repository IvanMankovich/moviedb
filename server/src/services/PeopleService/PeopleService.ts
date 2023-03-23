import { PipelineStage, Types } from 'mongoose';
import { ICountry } from '../../models/CountryModel';
import { IGender } from '../../models/GenderModel';
import { IPerson, Person } from '../../models/PersonModel';
import { IPosition } from '../../models/PositionModel';
import { getSearchStr, parseFiles } from '../../utils/helpers';
import { assetsService } from '../AssetsService/AssetsService';
import { countriesService } from '../CountriesService/CountriesService';
import { ErrorService } from '../ErrorService';
import { gendersService } from '../GendersService/GendersService';
import { positionsService } from '../PositionsService/PositionsService';
import { IPeopleQuery } from '../types';
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
          { $unwind: { path: '$personPic', preserveNullAndEmptyArrays: true } },
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
          { $unwind: { path: '$personPlaceOfBirth', preserveNullAndEmptyArrays: true } },
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

  async getPeopleByParams({
    limit = '10',
    pg = '1',
    sortField = 'personName',
    sortDir = '1',
    personDoBfrom,
    personDoBto,
    personGender,
    personPlaceOfBirth,
    personPositions,
    qFields = 'personName',
    qStr = '',
  }: IPeopleQuery) {
    try {
      const searchObj = getSearchStr(qFields, qStr);

      const matchParams = [];
      const formData: {
        personGender?: IGender;
        personPlaceOfBirth?: ICountry;
        personPositions?: IPosition[];
      } = {};

      if (searchObj) {
        matchParams.push(searchObj);
      }

      if (personGender) {
        const gender = await gendersService.getGenderById(personGender);
        formData.personGender = gender?.toObject?.() as IGender;
        matchParams.push({ personGender: new Types.ObjectId(personGender) });
      }

      if (personPlaceOfBirth) {
        const country = await countriesService.getCountryById(personPlaceOfBirth);
        formData.personPlaceOfBirth = country?.toObject?.() as ICountry;
        matchParams.push({ personPlaceOfBirth: new Types.ObjectId(personPlaceOfBirth) });
      }

      if (personPositions) {
        const positions = personPositions.split(',');
        const q = positions.map((v) => new Types.ObjectId(v));

        const positionsArray = await positionsService.getPositionsByIds(q);
        formData.personPositions = positionsArray.map((p) => p.toObject()) as IPosition[];
        matchParams.push({ personPositions: { $all: q } });
      }

      if (personDoBfrom || personDoBto) {
        const personDoB: {
          $gte?: Date;
          $lte?: Date;
        } = {};
        if (personDoBfrom) {
          personDoB.$gte = new Date(personDoBfrom);
        }
        if (personDoBto) {
          personDoB.$lte = new Date(personDoBto);
        }
        matchParams.push({ personDoB: personDoB });
      }

      const aggregateParams: PipelineStage[] = [
        {
          $match: {
            searchObj,
          },
        },
      ];

      if (sortField && sortDir) {
        aggregateParams.push({
          $sort: { [sortField]: +sortDir as 1 | -1 },
        });
      }

      aggregateParams.push({
        $facet: {
          people: [{ $skip: (+pg - 1) * +limit }, { $limit: +limit }],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      });

      const people = await Person.aggregate([
        {
          $match: { $and: [...matchParams] },
        },
        {
          $lookup: {
            from: 'assets',
            localField: 'personPic',
            foreignField: '_id',
            as: 'personPic',
          },
        },
        { $unwind: { path: '$personPic', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'genders',
            localField: 'personGender',
            foreignField: '_id',
            as: 'personGender',
          },
        },
        { $unwind: { path: '$personGender', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'countries',
            localField: 'personPlaceOfBirth',
            foreignField: '_id',
            as: 'personPlaceOfBirth',
          },
        },
        { $unwind: { path: '$personPlaceOfBirth', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'positions',
            localField: 'personPositions',
            foreignField: '_id',
            as: 'personPositions',
          },
        },
        {
          $facet: {
            people: [{ $skip: (+pg - 1) * +limit }, { $limit: +limit }],
            totalCount: [
              {
                $count: 'count',
              },
            ],
          },
        },
      ]);

      const data = {
        data: people[0].people,
        totalPages: people[0].totalCount[0] ? Math.ceil(people[0].totalCount[0].count / +limit) : 0,
        currentPage: +pg,
        formData: formData,
      };
      return data;
    } catch (err) {
      throw new Error(err?.toString?.());
    }
  }
}

export const peopleService = new PeopleService();
