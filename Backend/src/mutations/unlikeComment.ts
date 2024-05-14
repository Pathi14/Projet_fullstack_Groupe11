import { DataSourceContext } from "../context";
import { LikeResponse, MutationUnlikeCommentArgs, MutationResolvers } from "../types";

export const unlikeComment: MutationResolvers['unlikeComment'] = async (_, { commentId }: MutationUnlikeCommentArgs, { dataSources, user }: DataSourceContext): Promise<LikeResponse> => {
    try {
        if (!user) {
            throw new Error('User not authenticated');
        }
    
        // Vérifier si l'utilisateur a déjà aimé le commentaire
        const existingLike = await dataSources.db.like.findFirst({
            where: {
                userId: user.id,
                commentId
            }
        });
    
        if (!existingLike) {
            throw new Error('User has not liked this comment');
        }
    
        // Supprimer le like associé au commentaire et à l'utilisateur
        await dataSources.db.like.delete({
            where: {
                id: existingLike.id
            }
        });
    
        // Mettre à jour le nombre de likes dans le commentaire
        await dataSources.db.comment.update({
            where: {
                id: commentId
            },
            data: {
                numberOfLikes: {
                    decrement: 1 // Décrémenter le nombre de likes de 1
                }
            }
        });
    
        return {
            code: 200,
            message: 'Comment unliked successfully',
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
