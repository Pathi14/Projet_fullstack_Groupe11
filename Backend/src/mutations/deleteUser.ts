import { MutationResolvers } from "../types";
import { DataSourceContext } from "../context";

export const deleteUser: MutationResolvers['deleteUser'] = async (_, { userId }, { dataSources }: DataSourceContext) => {
  try {
    await dataSources.db.$transaction(async (prisma) => {
      // Supprimer les likes de l'utilisateur
      await prisma.like.deleteMany({
        where: {
          userId: userId,
        },
      });

      // Supprimer les commentaires de l'utilisateur
      await prisma.comment.deleteMany({
        where: {
          userId: userId,
        },
      });

      // Supprimer les articles de l'utilisateur
      await prisma.article.deleteMany({
        where: {
          userId: userId,
        },
      });

      // Supprimer l'utilisateur
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
    });

    return {
      code: 200,
      success: true,
      message: "User and all associated data deleted successfully",
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: (error as Error).message,
    };
  }
};
