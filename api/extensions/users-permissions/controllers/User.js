"use strict";

/**
 * User.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

const _ = require("lodash");
const { sanitizeEntity } = require("strapi-utils");

const sanitizeUser = user =>
  sanitizeEntity(user, {
    model: strapi.query("user", "users-permissions").model
  });

const formatError = error => [
  { messages: [{ id: error.id, message: error.message, field: error.field }] }
];

module.exports = {
  /**
   * Create a/an user record.
   * @return {Object}
   */
  async create(ctx) {
    const advanced = await strapi
      .store({
        environment: "",
        type: "plugin",
        name: "users-permissions",
        key: "advanced"
      })
      .get();

    const { email, username, password, role } = ctx.request.body;

    console.log(ctx.request.body);

    if (!email) return ctx.badRequest("missing.email");
    if (!username) return ctx.badRequest("missing.username");
    if (!password) return ctx.badRequest("missing.password");

    const userWithSameUsername = await strapi
      .query("user", "users-permissions")
      .findOne({ username });

    if (userWithSameUsername) {
      return ctx.badRequest(
        null,
        formatError({
          id: "Auth.form.error.username.taken",
          message: "Username already taken.",
          field: ["username"]
        })
      );
    }

    if (advanced.unique_email) {
      const userWithSameEmail = await strapi
        .query("user", "users-permissions")
        .findOne({ email });

      if (userWithSameEmail) {
        return ctx.badRequest(
          null,

          formatError({
            id: "Auth.form.error.email.taken",
            message: "Email already taken.",
            field: ["email"]
          })
        );
      }
    }

    const user = {
      ...ctx.request.body,
      provider: "local"
    };

    console.log(user);

    if (!role) {
      const defaultRole = await strapi
        .query("role", "users-permissions")
        .findOne({ type: advanced.default_role }, []);

      user.role = defaultRole.id;
    }

    try {
      // Try to create the user on the data api if it doesn't already exist
      const success = await strapi.config.functions.astroplant.signup(ctx, {
        username: username,
        email: email,
        password: password
      });

      const data = await strapi.plugins["users-permissions"].services.user.add(
        user
      );

      ctx.created(sanitizeUser(data));
    } catch (error) {
      ctx.badRequest(null, formatError(error));
    }
  },

  /**
   * Update a/an user record.
   * @return {Object}
   */
  async updateMe(ctx) {
    const advancedConfigs = await strapi
      .store({
        environment: "",
        type: "plugin",
        name: "users-permissions",
        key: "advanced"
      })
      .get();

    const { id } = ctx.params;

    const authUser = ctx.state.user;

    if (authUser.id != id) {
      return ctx.badRequest(null, [
        { messages: [{ id: "Can't modify the profile of another user." }] }
      ]);
    }

    const { email, username, password } = ctx.request.body;

    const user = await strapi.plugins["users-permissions"].services.user.fetch({
      id
    });

    if (_.has(ctx.request.body, "email") && !email) {
      return ctx.badRequest("email.notNull");
    }

    if (_.has(ctx.request.body, "username") && !username) {
      return ctx.badRequest("username.notNull");
    }

    if (
      _.has(ctx.request.body, "password") &&
      !password &&
      user.provider === "local"
    ) {
      return ctx.badRequest("password.notNull");
    }

    if (_.has(ctx.request.body, "username")) {
      const userWithSameUsername = await strapi
        .query("user", "users-permissions")
        .findOne({ username });

      if (userWithSameUsername && userWithSameUsername.id != id) {
        return ctx.badRequest(
          null,
          formatError({
            id: "Auth.form.error.username.taken",
            message: "username.alreadyTaken.",
            field: ["username"]
          })
        );
      }
    }

    if (_.has(ctx.request.body, "email") && advancedConfigs.unique_email) {
      const userWithSameEmail = await strapi
        .query("user", "users-permissions")
        .findOne({ email });

      if (userWithSameEmail && userWithSameEmail.id != id) {
        return ctx.badRequest(
          null,
          formatError({
            id: "Auth.form.error.email.taken",
            message: "Email already taken",
            field: ["email"]
          })
        );
      }
    }

    let updateData = {
      ...ctx.request.body
    };

    if (_.has(ctx.request.body, "password") && password === user.password) {
      delete updateData.password;
    }

    const data = await strapi.plugins["users-permissions"].services.user.edit(
      { id },
      updateData
    );

    ctx.send(sanitizeUser(data));
  },

  async changePassword(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] }
      ]);
    }

    const { newPassword, oldPassword } = ctx.request.body;

    if (_.has(ctx.request.body, "newPassword") && !newPassword) {
      return ctx.badRequest("newPassword.notNull");
    }

    if (_.has(ctx.request.body, "oldPassword") && !oldPassword) {
      return ctx.badRequest("oldPassword.notNull");
    }

    const validPassword = strapi.plugins[
      "users-permissions"
    ].services.user.validatePassword(oldPassword, user.password);

    if (_.has(ctx.request.body, "oldPassword") && !validPassword) {
      console.log("OLD");
      return ctx.badRequest(null, [
        { messages: [{ id: "Old password didn't match" }] }
      ]);
    }

    if (
      _.has(ctx.request.body, "newPassword") &&
      newPassword === user.password
    ) {
      console.log("NEW");

      return ctx.badRequest(null, [
        { messages: [{ id: "New password must be diffrent" }] }
      ]);
    }

    let updateData = { username: user.username, password: newPassword };

    const data = await strapi.plugins["users-permissions"].services.user.edit(
      { id: user.id },
      updateData
    );

    ctx.send({ ok: true });
  }
};
