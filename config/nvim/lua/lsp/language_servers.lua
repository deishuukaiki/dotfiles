-- Setup lspconfig.
local capabilities = require('cmp_nvim_lsp').update_capabilities(vim.lsp.protocol.make_client_capabilities())
require'lspconfig'.html.setup {
  capabilities = capabilities
}

require'lspconfig'.cssls.setup {
  capabilities = capabilities,
}

require'lspconfig'.tsserver.setup {
  capabilities = capabilities,
  on_attach = custom_attach,
  root_dir = vim.loop.cwd,
}

require'lspconfig'.clangd.setup {
  capabilities = capabilities,
}

-- require'lspconfig'.awk_ls.setup{}

require'lspconfig'.bashls.setup {
  capabilities = capabilities,
}

require'lspconfig'.dockerls.setup {
  capabilities = capabilities,
}

require'lspconfig'.pyright.setup {
  capabilities = capabilities,
}

require'lspconfig'.rust_analyzer.setup {
  capabilities = capabilities,
}

local lspconfig = require'lspconfig'
local configs = require'lspconfig.configs'

local capabilities = vim.lsp.protocol.make_client_capabilities()
capabilities.textDocument.completion.completionItem.snippetSupport = true

if not configs.ls_emmet then
  configs.ls_emmet = {
    default_config = {
      cmd = { 'ls_emmet', '--stdio' };
      filetypes = {
        'html',
        'css',
        'scss',
        'javascript',
        'javascriptreact',
        'typescript',
        'typescriptreact',
        'haml',
        'xml',
        'xsl',
        'pug',
        'slim',
        'sass',
        'stylus',
        'less',
        'sss',
        'hbs',
        'handlebars',
      };
      root_dir = function(fname)
        return vim.loop.cwd()
      end;
      settings = {};
    };
  }
end

lspconfig.ls_emmet.setup { capabilities = capabilities }
