local custom_auto = require'lualine.themes.auto'
  custom_auto.inactive.b.bg = '#252535'
  custom_auto.normal.b.bg = '#252535'
  custom_auto.visual.b.bg = '#252535'
  custom_auto.replace.b.bg = '#252535'
  custom_auto.insert.b.bg = '#252535'
  custom_auto.command.b.bg = '#252535'

require('lualine').setup {
  options = {
    icons_enabled = true,
    -- theme = custom_auto,
    theme = 'tokyonight',
    always_divide_middle = true,
    -- section_separators = '',
    -- component_separators = '',
 }
}

