import { MutationResolvers, MutationCreateCommentArgs, CreateCommentResponse } from "../types.js";
import { DataSourceContext } from "../context.js";

export const createComment: MutationResolvers['createComment'] = async (_, { articleId, content }: MutationCreateCommentArgs, { dataSources, user }: DataSourceContext): Promise<CreateCommentResponse> => {
  try {
    if (!user) {
      throw new Error('User not authenticated');
    }

    const userId = user.id;

    const article = await dataSources.db.article.findUnique({
        where: { id: articleId }
    });

    if (!article) {
        throw new Error('Article not found');
    }

    const createdComment = await dataSources.db.comment.create({
      data: {
        content,
        article: { connect: { id: articleId } },
        user: { connect: { id: userId } }
      },
    });

    const commentUser = {
        id: user.id,
        username: user.username
    };

    return {
      code: 201,
      message: 'Comment created successfully',
      success: true,
      comment: {
        id: createdComment.id,
        content: createdComment.content,
        user: commentUser,
        article: article
      }
    };
  } catch (error) {
    return {
      code: 400,
      message: (error as Error).message,
      success: false,
      comment: undefined,
    };
  }
}
