import { Document, Model, PopulateOptions } from 'mongoose';

interface PaginateOptions {
  page?: number | string;
  limit?: number | string;
  sort?: Record<string, 1 | -1>;
  populate?: string | PopulateOptions | Array<string | PopulateOptions>;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}

export const paginate = async <T extends Document>(
  Model: Model<T>,
  query: Record<string, any> = {},
  options: PaginateOptions = {},
): Promise<PaginationResult<T>> => {
  const page = Math.max(parseInt(options.page as string) || 1, 1);
  const limit = Math.max(parseInt(options.limit as string) || 20, 1);
  const skip = (page - 1) * limit;
  const sort = options.sort ?? { createdAt: -1 };

  try {
    let queryBuilder = Model.find(query)
      .sort(sort || {})
      .skip(skip)
      .limit(limit);

    if (options.populate) {
      if (Array.isArray(options.populate)) {
        for (const pop of options.populate) {
          queryBuilder =
            typeof pop === 'string'
              ? queryBuilder.populate([pop])
              : queryBuilder.populate(pop);
        }
      } else {
        if (typeof options.populate === 'string') {
          queryBuilder = queryBuilder.populate([options.populate]);
        } else {
          queryBuilder = queryBuilder.populate(options.populate);
        }
      }
    }

    const [data, totalCount] = await Promise.all([
      queryBuilder,
      Model.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
    };
  } catch (error: any) {
    throw new Error('Pagination error: ' + error?.message);
  }
};
