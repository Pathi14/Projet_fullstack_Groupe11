import { DataSourceContext } from "../context";
import { LikeResponse, MutationLikeArticleArgs, MutationResolvers } from "../types";

export const likeArticle: MutationResolvers['likeArticle'] = async (_, { articleId }: MutationLikeArticleArgs, { dataSources, user }: DataSourceContext): Promise<LikeResponse> => {
  try {
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Vérifier si l'utilisateur a déjà liké l'article
    const existingLike = await dataSources.db.like.findFirst({
      where: {
        userId: user.id,
        articleId,
      },
    });

    if (existingLike) {
      throw new Error('User already liked this article');
    }

    // Créer le like associé à l'article et à l'utilisateur
    await dataSources.db.like.create({
      data: {
        userId: user.id,
        articleId,
      },
    });

    // Incrémenter le nombre de likes
    const updatedArticle = await dataSources.db.article.update({
      where: { id: articleId },
      data: {
        numberOfLikes: {
          increment: 1,
        },
      },
    });

    return {
      code: 201,
      message: 'Article liked successfully',
      success: true,
      article: {  // Inclure l'article dans la réponse
        id: updatedArticle.id,
        title: updatedArticle.title,
        description: updatedArticle.description,
        numberOfLikes: updatedArticle.numberOfLikes, // Inclure le nombre de likes mis à jour
      },
    };
  } catch (error) {
    return {
      code: 400,
      message: (error as Error).message,
      success: false,
      article: null,
    };
  }
};

