module.exports = {
  resolver: {
    Mutation: {
      updateUser: {
        description: "Update user information",
        resolver: "plugins::users-permissions.user.updateMe",
      },
    },
  },
};
