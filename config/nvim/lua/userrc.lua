  local user = require("user")
  user.setup({ parallel = true })
  local use = user.use
  
  use "neovim/nvim-lspconfig"
  use "hrsh7th/cmp-nvim-lsp"
  use "hrsh7th/cmp-buffer"
  use "hrsh7th/cmp-path"
  use "hrsh7th/cmp-cmdline"
  use "hrsh7th/nvim-cmp"
  use "tami5/lspsaga.nvim"

  use "danilamihailov/beacon.nvim"
  use "nvim-lualine/lualine.nvim"
  use "kdheepak/tabline.nvim"
  use "kyazdani42/nvim-web-devicons"
  use "tpope/vim-commentary"
  use "cohama/lexima.vim"
  use "rebelot/kanagawa.nvim"

  user.flush()
