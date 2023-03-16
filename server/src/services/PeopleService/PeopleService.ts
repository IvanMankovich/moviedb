import { IPerson, Person } from '../../models/PersonModel';
import { ErrorService } from '../ErrorService';
import { CreatePerson } from './helpers';

class PeopleService {
  async createPerson(personData: IPerson) {
    if (personData) {
      const person = new CreatePerson(personData);

      const isPersonExists = await this.isPersonExists(person);
      if (!isPersonExists) {
        const newPerson = new Person(person);
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
