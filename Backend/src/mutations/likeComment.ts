import { DataSourceContext } from "../context";
import { LikeResponse, MutationLikeCommentArgs, MutationResolvers } from "../types";

export const likeComment: MutationResolvers['likeComment'] = async (_, { commentId }: MutationLikeCommentArgs, { dataSources, user }: DataSourceContext): Promise<LikeResponse> => {
    try {
      if (!user) {
        throw new Error('User not authenticated');
      }
  
      // Vérifier si l'utilisateur a déjà liké le commentaire
      const existingLike = await dataSources.db.like.findFirst({
        where: {
          userId: user.id,
          commentId
        }
      });
  
      if (existingLike) {
        throw new Error('User already liked this comment');
      }
  
      // Créer le like associé au commentaire et à l'utilisateur
      const like = await dataSources.db.like.create({
        data: {
          userId: user.id,
          commentId
        }
      });

      await dataSources.db.comment.update({
        where: {
            id: commentId
        },
        data: {
            numberOfLikes: {
                increment: 1
            }
        }
        
      });
  
      return {
        code: 201,
        message: 'Comment liked successfully',
        success: true
      };
    } catch (error) {
      return {
        code: 400,
        message: (error as Error).message,
        success: false
      };
    }
  }
  