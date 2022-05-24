require'bufferline'.setup{
    options = {
        show_buffer_close_icons = false,
        show_close_icon = false,
        color_icons = true,
    },
}
vim.cmd[[
    nnoremap <silent>t :BufferLineCycleNext<CR>
    nnoremap <silent>T :BufferLineCyclePrev<CR>
]]
