local custom_auto = require'lualine.themes.auto'
custom_auto.inactive.c.bg = '#2c2f32'
custom_auto.normal.c.bg = '#2c2f32'
custom_auto.visual.c.bg = '#2c2f32'
custom_auto.replace.c.bg = '#2c2f32'
custom_auto.insert.c.bg = '#2c2f32'
custom_auto.command.c.bg = '#2c2f32'
custom_auto.inactive.b.bg = '#3c4047'
custom_auto.normal.b.bg = '#3c4047'
custom_auto.visual.b.bg = '#3c4047'
custom_auto.replace.b.bg = '#3c4047'
custom_auto.insert.b.bg = '#3c4047'
custom_auto.command.b.bg = '#3c4047'

require('lualine').setup {
  options = {
    icons_enabled = true,
    theme = custom_auto,
    component_separators = { left = '', right = '' },
    section_separators = { left = '', right = ''},
    disabled_filetypes = {},
    always_divide_middle = true,
  },
  sections = {
    lualine_a = {'mode'},
    lualine_b = {'branch', 'diff',
                  {'diagnostics', sources={'nvim_lsp', 'coc'}}},
    lualine_c = {'filename'},
    lualine_x = {'encoding', 'filetype'},
    lualine_y = {'progress'},
    lualine_z = {'location'}
  },
  inactive_sections = {
    lualine_a = {},
    lualine_b = {},
    lualine_c = {'filename'},
    lualine_x = {'location'},
    lualine_y = {},
    lualine_z = {}
  },
  tabline = {
    lualine_a = { require'tabline'.tabline_buffers }
  },
  extensions = {}
}
