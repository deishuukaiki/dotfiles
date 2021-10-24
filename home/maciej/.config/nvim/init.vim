" NeoVim config

" show line numbers
set number
" set tab width
set shiftwidth=2
" something
set termguicolors
" needed for compe
set completeopt=menuone,noselect
" popupmenu transparency
set pumblend=10
" hybrid line numbers
set number relativenumber
" no swap file
set noswapfile
" dont wrap lines
set nowrap
" highlight current line
set cursorline
" dont show mode under statusline
set noshowmode

" PLUG
call plug#begin('~/.config/nvim/plugged')
  Plug 'neovim/nvim-lspconfig'
  Plug 'hrsh7th/nvim-compe'
  Plug 'tpope/vim-commentary'
  Plug 'kyazdani42/nvim-web-devicons' " for file icons
  Plug 'kyazdani42/nvim-tree.lua'
  Plug 'https://github.com/sagarrakshe/toggle-bool'
  Plug 'nvim-lualine/lualine.nvim'
call plug#end()

" LUALINE
  lua require('statusline')

" TOGGLE BOOL
  noremap <C-w> :ToggleBool<CR>

" TREE SETTINGS
  source ~/.config/nvim/plug-config/tree.vim

" LSP SETTINGS
  source ~/.config/nvim/plug-config/lsp-config.vim
  lua require('lsp')

" TABS
  nnoremap <A-,> :tabprev<CR>
  nnoremap <A-.> :tabnext<CR>
  nnoremap <A-n> :tabnew<CR>

" COLORSCHEME
  source $HOME/.config/nvim/plug-config/base16-tomorrow-night.vim
  highlight Comment          guifg=#318fcf ctermfg=4    guibg=none    ctermbg=none  cterm=italic
  highlight LspDiagnosticsVirtualTextHint guibg=none ctermbg=none
  highlight LspDiagnosticsVirtualTextError guibg=none ctermbg=none
  highlight LspDiagnosticsVirtualTextWarning guibg=none ctermbg=none
  highlight LspDiagnosticsVirtualTextInformation guibg=none ctermbg=none
  highlight Pmenu guibg=#111122
