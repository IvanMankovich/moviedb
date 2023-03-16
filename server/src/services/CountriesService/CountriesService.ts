import { ErrorService } from '../ErrorService';
import { Country } from '../../models/CountryModel';
import { getGIRegEx, getSearchStr } from '../../utils/helpers';
import { IQuery } from '../types';
import { PipelineStage } from 'mongoose';

class CountriesService {
  async addCountry(countryName: string) {
    const isCountryExists = await this.isCountryExists(countryName);
    if (!isCountryExists) {
      const newCountry = new Country({ countryName });
      const result = await newCountry.save();
      return result;
    } else {
      throw ErrorService.Conflict('Country already exists', isCountryExists);
    }
  }

  async isCountryExists(countryName: string) {
    const result = await Country.findOne({ countryName: getGIRegEx(countryName) });

    if (result) {
      const errors: string[] = [];
      errors.push(`Country '${countryName}' already exists.`);

      return errors;
    } else {
      return false;
    }
  }

  async removeCountry(_id: string) {
    const CountryData = await Country.deleteOne({ _id: _id });
    return CountryData;
  }

  async findCountries({
    qStr = '',
    qFields = ['countryName'],
    limit = '10',
    pg = '1',
    sortField = 'countryName',
    sortDir = '1',
  }: IQuery) {
    const searchObj = getSearchStr(qFields, qStr);

    const aggregateParams: PipelineStage[] = [
      {
        $match: searchObj,
      },
    ];

    if (sortField && sortDir) {
      aggregateParams.push({
        $sort: { [sortField]: +sortDir as 1 | -1 },
      });
    }

    aggregateParams.push({
      $facet: {
        countries: [{ $skip: (+pg - 1) * +limit }, { $limit: +limit }],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    });

    const countriesData = await Country.aggregate(aggregateParams);

    const data = {
      data: countriesData[0].countries,
      totalPages: countriesData[0].totalCount[0]
        ? Math.ceil(countriesData[0].totalCount[0].count / +limit)
        : 0,
      currentPage: +pg,
    };
    return data;
  }
}

export const countriesService = new CountriesService();
