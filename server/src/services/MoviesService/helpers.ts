import { IMovie } from '../../models/MovieModel';

export class MovieBuilder {
  movieArtCrew;
  movieBackdrop;
  movieBudget;
  movieCameraCrew;
  movieCast;
  movieCostumeMakeUpCrew;
  movieCrew;
  movieDescription;
  movieDirectingCrew;
  movieDuration;
  movieEditingCrew;
  movieGenres;
  movieLanguage;
  movieLightingCrew;
  moviePoster;
  moviePremiers;
  movieProductionCrew;
  movieProductionPlace;
  movieRevenue;
  movieSlogan;
  movieSoundCrew;
  movieStage;
  movieTitle;
  movieVisualEffectsCrew;
  movieWritingCrew;

  constructor(model: IMovie) {
    this.movieArtCrew = model.movieArtCrew ?? [];
    this.movieBackdrop = model.movieBackdrop ?? [];
    this.movieBudget = model.movieBudget ?? null;
    this.movieCameraCrew = model.movieCameraCrew ?? [];
    this.movieCast = model.movieCast ?? [];
    this.movieCostumeMakeUpCrew = model.movieCostumeMakeUpCrew ?? [];
    this.movieCrew = model.movieCrew ?? [];
    this.movieDescription = model.movieDescription ?? null;
    this.movieDirectingCrew = model.movieDirectingCrew ?? [];
    this.movieDuration = model.movieDuration ?? null;
    this.movieEditingCrew = model.movieEditingCrew ?? [];
    this.movieGenres = model.movieGenres ?? [];
    this.movieLanguage = model.movieLanguage ?? null;
    this.movieLightingCrew = model.movieLightingCrew ?? [];
    this.moviePoster = model.moviePoster ?? [];
    this.moviePremiers = model.moviePremiers ?? [];
    this.movieProductionCrew = model.movieProductionCrew ?? [];
    this.movieProductionPlace = model.movieProductionPlace ?? [];
    this.movieRevenue = model.movieRevenue ?? [];
    this.movieSlogan = model.movieSlogan ?? null;
    this.movieSoundCrew = model.movieSoundCrew ?? [];
    this.movieStage = model.movieStage ?? null;
    this.movieTitle = model.movieTitle ?? null;
    this.movieVisualEffectsCrew = model.movieVisualEffectsCrew ?? [];
    this.movieWritingCrew = model.movieWritingCrew ?? [];
  }
}

export class MovieDto {
  _id;
  movieArtCrew;
  movieBackdrop;
  movieBudget;
  movieCameraCrew;
  movieCast;
  movieCostumeMakeUpCrew;
  movieCrew;
  movieDescription;
  movieDirectingCrew;
  movieDuration;
  movieEditingCrew;
  movieGenres;
  movieLanguage;
  movieLightingCrew;
  moviePoster;
  moviePremiers;
  movieProductionCrew;
  movieProductionPlace;
  movieRevenue;
  movieSlogan;
  movieSoundCrew;
  movieStage;
  movieTitle;
  movieVisualEffectsCrew;
  movieWritingCrew;

  constructor(model: IMovie) {
    this._id = model._id;
    this.movieArtCrew = model.movieArtCrew ?? [];
    this.movieBackdrop = model.movieBackdrop ?? [];
    this.movieBudget = model.movieBudget ?? null;
    this.movieCameraCrew = model.movieCameraCrew ?? [];
    this.movieCast = model.movieCast ?? [];
    this.movieCostumeMakeUpCrew = model.movieCostumeMakeUpCrew ?? [];
    this.movieCrew = model.movieCrew ?? [];
    this.movieDescription = model.movieDescription ?? null;
    this.movieDirectingCrew = model.movieDirectingCrew ?? [];
    this.movieDuration = model.movieDuration ?? null;
    this.movieEditingCrew = model.movieEditingCrew ?? [];
    this.movieGenres = model.movieGenres ?? [];
    this.movieLanguage = model.movieLanguage ?? null;
    this.movieLightingCrew = model.movieLightingCrew ?? [];
    this.moviePoster = model.moviePoster ?? [];
    this.moviePremiers = model.moviePremiers ?? [];
    this.movieProductionCrew = model.movieProductionCrew ?? [];
    this.movieProductionPlace = model.movieProductionPlace ?? [];
    this.movieRevenue = model.movieRevenue ?? [];
    this.movieSlogan = model.movieSlogan ?? null;
    this.movieSoundCrew = model.movieSoundCrew ?? [];
    this.movieStage = model.movieStage ?? null;
    this.movieTitle = model.movieTitle ?? null;
    this.movieVisualEffectsCrew = model.movieVisualEffectsCrew ?? [];
    this.movieWritingCrew = model.movieWritingCrew ?? [];
  }
}
