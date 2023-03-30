import { model, Schema } from 'mongoose';

export interface ICrewMember {
  crewPerson: string;
  crewPersonPosition: string;
}

export interface IPremiere {
  premiereDate: Date;
  premiereCountry: string;
  premiereRating: string;
}

export interface ISumOfMoney {
  amount: number;
  currency: string;
}

export interface ICast {
  castPerson: string;
  castCharacterName: string;
}

export interface IMovie {
  _id: string;
  movieArtCrew: ICrewMember[];
  movieBackdrop: string[];
  movieBudget: ISumOfMoney;
  movieCameraCrew: ICrewMember[];
  movieCast: ICast[];
  movieCostumeMakeUpCrew: ICrewMember[];
  movieCrew: ICrewMember[];
  movieDescription: string;
  movieDirectingCrew: ICrewMember[];
  movieDuration: number;
  movieEditingCrew: ICrewMember[];
  movieGenres: string[];
  movieLanguage: string;
  movieLightingCrew: ICrewMember[];
  moviePoster: string[];
  moviePremiers: IPremiere[];
  movieProductionCrew: ICrewMember[];
  movieProductionPlace: string[];
  movieRevenue: ISumOfMoney;
  movieSlogan: string;
  movieSoundCrew: ICrewMember[];
  movieStage: string;
  movieTitle: string;
  movieVisualEffectsCrew: ICrewMember[];
  movieWritingCrew: ICrewMember[];
}

const movieSchema = new Schema({
  movieArtCrew: [
    {
      crewPerson: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        index: 1,
      },
      crewPersonPosition: {
        type: Schema.Types.ObjectId,
        ref: 'Position',
        required: true,
        index: 1,
      },
    },
  ],
  movieBackdrop: [Schema.Types.ObjectId],
  movieBudget: {
    amount: Schema.Types.Number,
    currency: Schema.Types.ObjectId,
  },
  movieCameraCrew: [
    {
      crewPerson: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        index: 1,
      },
      crewPersonPosition: {
        type: Schema.Types.ObjectId,
        ref: 'Position',
        required: true,
        index: 1,
      },
    },
  ],
  movieCast: [
    {
      castPerson: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        index: 1,
      },
      castCharacterName: {
        type: Schema.Types.String,
        required: true,
      },
    },
  ],
  movieCostumeMakeUpCrew: [
    {
      crewPerson: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        index: 1,
      },
      crewPersonPosition: {
        type: Schema.Types.ObjectId,
        ref: 'Position',
        required: true,
        index: 1,
      },
    },
  ],
  movieCrew: [
    {
      crewPerson: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        index: 1,
      },
      crewPersonPosition: {
        type: Schema.Types.ObjectId,
        ref: 'Position',
        required: true,
        index: 1,
      },
    },
  ],
  movieDescription: {
    type: Schema.Types.String,
  },
  movieDirectingCrew: [
    {
      crewPerson: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        index: 1,
      },
      crewPersonPosition: {
        type: Schema.Types.ObjectId,
        ref: 'Position',
        required: true,
        index: 1,
      },
    },
  ],
  movieDuration: {
    type: Schema.Types.Number,
  },
  movieEditingCrew: [
    {
      crewPerson: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        index: 1,
      },
      crewPersonPosition: {
        type: Schema.Types.ObjectId,
        ref: 'Position',
        required: true,
        index: 1,
      },
    },
  ],
  movieGenres: {
    type: [Schema.Types.ObjectId],
    ref: 'Genre',
    required: true,
    index: 1,
  },
  movieLanguage: {
    type: Schema.Types.ObjectId,
    ref: 'Language',
    index: 1,
  },
  movieLightingCrew: [
    {
      crewPerson: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        index: 1,
      },
      crewPersonPosition: {
        type: Schema.Types.ObjectId,
        ref: 'Position',
        required: true,
        index: 1,
      },
    },
  ],
  moviePoster: [Schema.Types.ObjectId],
  moviePremiers: [
    {
      premiereDate: { type: Schema.Types.Date, required: true },
      premiereCountry: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
      premiereRating: { type: Schema.Types.ObjectId, ref: 'FilmRating' },
    },
  ],
  movieProductionCrew: [
    {
      crewPerson: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        index: 1,
      },
      crewPersonPosition: {
        type: Schema.Types.ObjectId,
        ref: 'Position',
        required: true,
        index: 1,
      },
    },
  ],
  movieProductionPlace: {
    type: [Schema.Types.ObjectId],
    ref: 'Country',
    required: true,
    index: 1,
  },
  movieRevenue: {
    amount: Schema.Types.Number,
    currency: Schema.Types.ObjectId,
  },
  movieSlogan: {
    type: Schema.Types.String,
  },
  movieSoundCrew: [
    {
      crewPerson: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        index: 1,
      },
      crewPersonPosition: {
        type: Schema.Types.ObjectId,
        ref: 'Position',
        required: true,
        index: 1,
      },
    },
  ],
  movieStage: {
    type: Schema.Types.ObjectId,
    ref: 'ProductionStage',
    required: true,
    index: 1,
  },
  movieTitle: {
    type: Schema.Types.String,
    required: true,
    index: 1,
  },
  movieVisualEffectsCrew: [
    {
      crewPerson: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        index: 1,
      },
      crewPersonPosition: {
        type: Schema.Types.ObjectId,
        ref: 'Position',
        required: true,
        index: 1,
      },
    },
  ],
  movieWritingCrew: [
    {
      crewPerson: {
        type: Schema.Types.ObjectId,
        ref: 'People',
        required: true,
        index: 1,
      },
      crewPersonPosition: {
        type: Schema.Types.ObjectId,
        ref: 'Position',
        required: true,
        index: 1,
      },
    },
  ],
});

const Movie = model('Movie', movieSchema);

export { Movie };
