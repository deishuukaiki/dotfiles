require'nvim-tree'.setup {
  auto_open = 1,
  actions = {
    open_file = {
      quit_on_open = true,
    }
  }
}

vim.g.nvim_tree_width = 25
vim.g.nvim_tree_gitignore = 1
vim.g.nvim_tree_ident_markers = 1

