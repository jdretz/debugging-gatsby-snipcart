/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
// You can delete this file if you're not using it
const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogTemplatePath = "./src/components/"

  /**
   * Create all blog page
   */
  createPage({
    path: `/blog/all`,
    component: path.resolve(blogTemplatePath + "all.js")
  })
}