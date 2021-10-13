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

" PLUG
call plug#begin('~/.config/nvim/plugged')
  Plug 'joshdick/onedark.vim'
  Plug 'neovim/nvim-lspconfig'
  Plug 'hrsh7th/nvim-compe'
  Plug 'tpope/vim-commentary'
  Plug 'itchyny/lightline.vim'
  Plug 'kyazdani42/nvim-web-devicons' " for file icons
  Plug 'kyazdani42/nvim-tree.lua'
  Plug 'https://github.com/sagarrakshe/toggle-bool'
call plug#end()

" TOGGLE BOOL
  noremap <C-r> :ToggleBool<CR>

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
  source $HOME/.config/nvim/plug-config/onedark.vim
  highlight Comment          guifg=#318fcf ctermfg=4    guibg=none    ctermbg=none  cterm=italic
  highlight LspDiagnosticsVirtualTextHint guibg=none ctermbg=none
  highlight LspDiagnosticsVirtualTextError guibg=none ctermbg=none
  highlight LspDiagnosticsVirtualTextWarning guibg=none ctermbg=none
  highlight LspDiagnosticsVirtualTextInformation guibg=none ctermbg=none
  highlight Pmenu guibg=#111122
  
  let g:lightline = {
        \ 'colorscheme': 'one',
        \ }
