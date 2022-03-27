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
set pumblend=10
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
  
" COMPLETION
  lua require('cmprc')
  lua require('lspsagarc')
  " highlight Pmenu guibg=#111122

" TABLINE & LUALINE
  lua require('tablinerc')
  lua require('lualinerc')

  " highlight Comment          guifg=#318fcf ctermfg=4    guibg=none    ctermbg=none  cterm=italic
  " highlight LspDiagnosticsSignError guibg=#282a2e
  " highlight LspDiagnosticsSignWarning guibg=#282a2e
  " highlight LspDiagnosticsSignInformation guibg=#282a2e
  " highlight LspDiagnosticsSignHint guibg=#282a2e

