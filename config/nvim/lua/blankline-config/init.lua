-- vim.opt.list = true

require("indent_blankline").setup {
    space_char_blankline = " ",
    show_current_context = true,
    show_current_context_start = true,
    char_blankline = '┆',
    use_treesitter = true,
    context_char_blankline = "┆",
}
