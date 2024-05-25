import { DataSourceContext } from "../context";
import { LikeResponse, MutationUnlikeArticleArgs, MutationResolvers } from "../types";

export const unlikeArticle: MutationResolvers['unlikeArticle'] = async (_, { articleId }: MutationUnlikeArticleArgs, { dataSources, user }: DataSourceContext): Promise<LikeResponse> => {
  try {
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Vérifier si l'utilisateur a déjà aimé l'article
    const existingLike = await dataSources.db.like.findFirst({
      where: {
        userId: user.id,
        articleId,
      },
    });

    if (!existingLike) {
      throw new Error('User has not liked this article');
    }

    // Supprimer le like associé à l'article et à l'utilisateur
    await dataSources.db.like.delete({
      where: {
        id: existingLike.id,
      },
    });

    // Décrémenter le nombre de likes
    const updatedArticle = await dataSources.db.article.update({
      where: { id: articleId },
      data: {
        numberOfLikes: {
          decrement: 1,
        },
      },
    });

    return {
      code: 200,
      message: 'Article unliked successfully',
      success: true,
      article: {
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
