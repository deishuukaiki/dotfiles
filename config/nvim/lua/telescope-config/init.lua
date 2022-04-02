require('telescope').setup{
  defaults = {
    layout_config = {
      width = 0.75,
      prompt_position = "top",
      preview_cutoff = 120,
      horizontal = {mirror = false},
      vertical = {mirror = false},
    },
    mappings = {
      i = {
        ["<C-h>"] = "which_key"
      }
    },
  },
  pickers = {
  },
  extensions = {
  }
}
