// noinspection JSUnresolvedFunction,JSUnresolvedVariable
// https://github.com/NiklasPor/prettier-plugin-go-template/issues/63
module.exports = {
  plugins: [
    require("@trivago/prettier-plugin-sort-imports"),
    require("prettier-plugin-md-nocjsp"),
  ],
  overrides: [
    // https://github.com/tats-u/prettier-plugin-md-nocjsp
    {
      files: ["*.md"],
      options: {
        parser: "markdown-nocjsp",
      },
    },
  ],
  importOrder: ["<THIRD_PARTY_MODULES>", "^[~]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
