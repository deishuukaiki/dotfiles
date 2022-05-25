require'nvim-tree'.setup {
  actions = {
    open_file = {
      quit_on_open = true,
    }
  },
  view = {
      hide_root_folder = false,
      width = 25,
  }
}

vim.g.nvim_tree_gitignore = 1
vim.g.nvim_tree_ident_markers = 1

