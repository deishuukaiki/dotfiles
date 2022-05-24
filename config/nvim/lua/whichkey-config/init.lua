local wk = require("which-key")
local mappings = {
  t = {":ToggleTerm<CR>", "Toggle Terminal"},
  c = {":ColorizerToggle<CR>", "Toggle Colorizer"},
  w = {":w<CR>", "Write"},
  W = {":SudaWrite<CR>", "SudaWrite"},
  q = {":q<CR>", "Quit"},
  x = {":bdelete<CR>", "Close buffer"},
  e = {":NvimTreeToggle<CR>", "Explore"},
  f = {":Telescope find_files<CR>", "Telescope Find Files"},
  F = {":Telescope live_grep<CR>", "Telescope Live Grep"},
  l = {
    name = "LSP",
    d = {'<cmd>lua vim.lsp.buf.definition()<cr>', "Go To Definition"},
    D = {'<cmd>lua vim.lsp.buf.declaration()<cr>', "Go To Declaration"},
    r = {'<cmd>Lspsaga rename<CR>', 'Rename'},
    c = {'<cmd>Lspsaga code_action<CR>', 'Code Actions'},
    C = {":<c-u>Lspsaga range_code_action<CR>", "Range Code Actions"},
    h = {"<cmd>Lspsaga hover_doc<CR>", "Hover Doc"},
    s = {"<cmd>Lspsaga show_line_diagnostics<CR>", "Show Line Diagnostics"}
  },
}
local opts = {
  prefix = '<leader>'
}
wk.register(mappings, opts)
