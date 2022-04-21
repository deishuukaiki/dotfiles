local wk = require("which-key")
local mappings = {
    c = {":ColorizerToggle<CR>", "Toggle Colorizer"},
  w = {":w<CR>", "Write"},
  q = {":q<CR>", "Quit"},
  x = {":bdelete<CR>", "Close buffer"},
  e = {":NvimTreeToggle<CR>", "Explore"},
  f = {":Telescope find_files<CR>", "Telescope Find Files"},
  F = {":Telescope live_grep<CR>", "Telescope Live Grep"},
  l = {
    name = "LSP",
    i = {":LspInfo<cr>", "Connected Language Servers"},
    k = {"<cmd>lua vim.lsp.buf.signature_help()<cr>", "Signature Help"},
    w = {'<cmd>lua vim.lsp.buf.add_workspace_folder()<cr>', "Add Workspace Folder"},
    W = {'<cmd>lua vim.lsp.buf.remove_workspace_folder()<cr>', "Remove Workspace Folder"},
    l = {
      '<cmd>lua print(vim.inspect(vim.lsp.buf.list_workspace_folders()))<cr>',
      "List Workspace Folders"
    },
    t = {'<cmd>lua vim.lsp.buf.type_definition()<cr>', "Type Definition"},
    d = {'<cmd>lua vim.lsp.buf.definition()<cr>', "Go To Definition"},
    D = {'<cmd>lua vim.lsp.buf.declaration()<cr>', "Go To Declaration"},
    r = {'<cmd>lua vim.lsp.buf.references()<cr>', "References"},
  },
}
local opts = {
  prefix = '<leader>'
}
wk.register(mappings, opts)
