export interface Movie {
  originalTitle: string;
  localTitle: string;
  movieId?: string;
  prec: string;
  rating?: number;
  comments: Comment[];
  releaseInfo:{year: number}
}