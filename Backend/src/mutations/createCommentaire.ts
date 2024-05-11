import { MutationResolvers, MutationCreateArticleArgs, CreateArticleResponse } from "../types.js";
import { DataSourceContext } from "../context.js";

export const createArticle: MutationResolvers['createCommentaire'] = async (_, { content }, { dataSources, user }: DataSourceContext): Promise<CreateCommentaireResponse> => {
  try {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const userId = user.id;

    const createdArticle = await dataSources.db.article.create({
      data: {
        content,
        article: { connect: { id: userId } }
      },
    });

    const articleUser = {
      id: user.id,
      username: user.username
    };

    return {
      code: 201,
      message: 'Article created successfully',
      success: true,
      article: {
        id: createdArticle.id,
        title: createdArticle.title,
        description: createdArticle.description,
        user: articleUser
      }
    };
  } catch (error) {
    return {
      code: 400,
      message: (error as Error).message,
      success: false,
      article: undefined,
    };
  }
}

