local saga = require 'lspsaga'
saga.init_lsp_saga()
vim.cmd[[
  nnoremap <silent> gh <cmd>lua require'lspsaga.provider'.lsp_finder()<CR>
  nnoremap <silent>ca :Lspsaga code_action<CR>
  nnoremap <silent>dh <cmd>lua require('lspsaga.hover').render_hover_doc()<CR>
  nnoremap <silent>dh :Lspsaga hover_doc<CR>
  nnoremap <silent> <C-f> <cmd>lua require('lspsaga.action').smart_scroll_with_saga(1)<CR>
  nnoremap <silent> <C-b> <cmd>lua require('lspsaga.action').smart_scroll_with_saga(-1)<CR>
  nnoremap <silent>gr :Lspsaga rename<CR>
  nnoremap <silent>go :Lspsaga show_line_diagnostics<CR>
  nnoremap <silent>gj :Lspsaga diagnostic_jump_next<CR>
  nnoremap <silent>gk :Lspsaga diagnostic_jump_prev<CR>
]]
