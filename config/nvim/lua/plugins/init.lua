return require('packer').startup(function()
    -- Packer can manage itself
    use 'wbthomason/packer.nvim'
    use 'rebelot/kanagawa.nvim' -- colorscheme
    use {'nvim-treesitter/nvim-treesitter', run = ":TSUpdate"}
    use {
        'nvim-lualine/lualine.nvim',
        requires = { 'kyazdani42/nvim-web-devicons', opt = true }
    }
    use {
        'akinsho/bufferline.nvim', 
        requires = 'kyazdani42/nvim-web-devicons'
    }
    use {
        'kyazdani42/nvim-tree.lua',
        requires = 'kyazdani42/nvim-web-devicons',
    }
    use {'windwp/nvim-ts-autotag'} -- html auto close tags
    use {'windwp/nvim-autopairs'} -- auto close brackets etc
    use {'p00f/nvim-ts-rainbow'} -- highlight every level of bracket in different color
    use {'folke/which-key.nvim'}
    use {
        'nvim-telescope/telescope.nvim',
        requires = { {'nvim-lua/plenary.nvim'} }
    }
    use {'neovim/nvim-lspconfig'}
    use {'hrsh7th/cmp-nvim-lsp'}
    use {'hrsh7th/cmp-buffer'}
    use {'hrsh7th/cmp-path'}
    use {'hrsh7th/cmp-cmdline'}
    use {'hrsh7th/nvim-cmp'}
    use {"L3MON4D3/LuaSnip"}
    use {'onsails/lspkind-nvim'}
    use {'norcalli/nvim-colorizer.lua'}
    use {'lukas-reineke/indent-blankline.nvim'}
    use {'terrortylor/nvim-comment'}
    use {'lambdalisue/suda.vim'}
    use {"akinsho/toggleterm.nvim", tag = 'v1.*'}
end)
