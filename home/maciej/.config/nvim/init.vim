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
  Plug 'nvim-lualine/lualine.nvim'
  Plug 'kdheepak/tabline.nvim'
  Plug 'kyazdani42/nvim-web-devicons' " for file icons
  Plug 'kevinhwang91/rnvimr'
  Plug 'tpope/vim-commentary'
  Plug 'https://github.com/sagarrakshe/toggle-bool'
call plug#end()

" RNVIMR
  let g:rnvimr_enable_ex = 1
  let g:rnvimr_enable_picker = 1
  let g:rnvimr_draw_border = 1
  highlight link RnvimrNormal CursorLine
  nnoremap <silent> <A-t> :RnvimrToggle<CR>

" LUALINE
  lua require('tabline').setup { enable = false }
  lua require('lualineconfig')

" TOGGLE BOOL
  noremap <C-g> :ToggleBool<CR>

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
