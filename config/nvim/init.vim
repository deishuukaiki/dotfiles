" NeoVim config

" show line numbers
set number
" set tab width
set shiftwidth=2
" something
set termguicolors
" needed for compe
set completeopt=menu,menuone,noselect
" popupmenu transparency
set pumblend=5
" hybrid line numbers
set number relativenumber
" no swap file
set noswapfile
" dont wrap lines
set nowrap
" highlight current line
  " set cursorline
" dont show mode under statusline
set noshowmode
" change buffer without saving
set hidden

" LOAD PLUGINS
  lua require('userrc')

" TOGGLE BOOL
  noremap <C-g> :ToggleBool<CR>

" COLORSCHEME
  colorscheme kanagawa

  highlight Pmenu guibg=#18131f
  highlight PmenuSel guibg=#4e3d62
  highlight PmenuSbar guibg=#271e31
  highlight PmenuThumb guibg=#4c3b5f
  
" COMPLETION
  lua require('cmprc')
  lua require('treesitterrc')
  lua require('autotagrc')

" TABLINE & LUALINE
  lua require('tablinerc')
  lua require('lualinerc')

  " highlight Comment          guifg=#318fcf ctermfg=4    guibg=none    ctermbg=none  cterm=italic
  " highlight LspDiagnosticsSignError guibg=#282a2e
  " highlight LspDiagnosticsSignWarning guibg=#282a2e
  " highlight LspDiagnosticsSignInformation guibg=#282a2e
  " highlight LspDiagnosticsSignHint guibg=#282a2e

