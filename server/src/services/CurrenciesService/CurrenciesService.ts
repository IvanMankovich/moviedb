import { ErrorService } from '../ErrorService';
import { Currency } from '../../models/CurrencyModel';
import { getGIRegEx, getSearchStr } from '../../utils/helpers';
import { IQuery } from '../types';
import { PipelineStage } from 'mongoose';

class CurrenciesService {
  async addCurrency(currencyCode: string) {
    const isCurrencyExists = await this.isCurrencyExists(currencyCode);
    if (!isCurrencyExists) {
      const newCurrency = new Currency({ currencyCode });
      const result = await newCurrency.save();
      return result;
    } else {
      throw ErrorService.Conflict('Currency already exists', isCurrencyExists);
    }
  }

  async isCurrencyExists(currencyCode: string) {
    const result = await Currency.findOne({ currencyCode: getGIRegEx(currencyCode) });

    if (result) {
      const errors: string[] = [];
      errors.push(`Currency '${currencyCode}' already exists.`);

      return errors;
    } else {
      return false;
    }
  }

  async removeCurrency(_id: string) {
    const CurrencyData = await Currency.deleteOne({ _id: _id });
    return CurrencyData;
  }

  async findCurrencies({
    qStr = '',
    qFields = ['currencyCode'],
    limit = '10',
    pg = '1',
    sortField = 'currencyCode',
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
        currencies: [{ $skip: (+pg - 1) * +limit }, { $limit: +limit }],
        totalCount: [
          {
            $count: 'count',
          },
        ],
      },
    });

    const currenciesData = await Currency.aggregate(aggregateParams);

    const data = {
      data: currenciesData[0].currencies,
      totalPages: currenciesData[0].totalCount[0]
        ? Math.ceil(currenciesData[0].totalCount[0].count / +limit)
        : 0,
      currentPage: +pg,
    };
    return data;
  }
}

export const currenciesService = new CurrenciesService();
