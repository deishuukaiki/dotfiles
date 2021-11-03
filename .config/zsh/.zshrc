#########
# ZSHRC #
#########


# PREVENT NESTED RANGER INSTANCES
  ranger() {
      if [ -z "$RANGER_LEVEL" ]; then
          /usr/bin/ranger "$@"
      else
          exit
      fi
  }

# STORE ZSH DOTFILES AT ~/.config/zsh
  ZSH_CONFIG_DIR=/home/maciej/.config/zsh

# AUTOCOMPLETION
  autoload -Uz compinit
  compinit

  eval "$(dircolors)"
  zstyle ':completion:*' list-colors ${(s.:.)LS_COLORS}
  LS_COLORS='rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=37;01:cd=37;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=01;04;37:ow=01;04;34:st=01;34:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.webp=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:';
  PROMPT="%F{10}%n%f@%F{13}%m%f %F{14}%1d%f%B λ%b "

# ENVIRONMENT VARIABLES
  export VISUAL=/usr/bin/nvim
  export EDITOR=/usr/bin/nvim
  export PATH="$PATH:/home/maciej/.local/bin"
  export KEYTIMEOUT=10
  export BROWSER=librewolf
  export ADOTDIR="$HOME/.config/antigen"
  export GNUPGHOME="$XDG_DATA_HOME/gnupg"
  export QT_QPA_PLATFORMTHEME="qt5ct"
  ZSH_AUTOSUGGEST_STRATEGY=(completion)

# OTHER
  setopt extended_glob
  SAVEHIST=2000

# PLUGINS

  # ANTIGEN

    # source antigen
      source "$ZSH_CONFIG_DIR/antigen.zsh"

    # bundle
      antigen bundle zsh-users/zsh-completions
      antigen bundle autojump
      antigen bundle fdw/ranger-autojump
      antigen bundle --branch=main softmoth/zsh-vim-mode
      antigen bundle copyfile
      antigen bundle copybuffer
      antigen bundle history
      antigen bundle alexrochas/zsh-extract

      antigen apply
  
  # VI mode cursor styling
    MODE_CURSOR_VIINS="#ffffff blinking bar"
    MODE_CURSOR_REPLACE="#ffffff blinking underline"
    MODE_CURSOR_VICMD="#ffffff block"
    MODE_CURSOR_SEARCH="#ffffff steady underline"
    MODE_CURSOR_VISUAL="#ffffff steady underline"
    MODE_CURSOR_VLINE="$MODE_CURSOR_VISUAL"

# ALIASES

  # general improvements
    alias ls="ls -1 --color=auto --quoting-style=literal --group-directories-first"
    alias ll="ls -lah1 --color=auto --quoting-style=literal --group-directories-first"
    alias la="ls -a1 --color=auto --quoting-style=literal --group-directories-first"

  # doas
    alias sudo="doas"

  # ssh
    alias ssh223="ssh root@192.168.50.223"
    alias ssh107="ssh monika@192.168.50.107"
    alias ssh127="ssh maciej@192.168.50.127"

  # vnc
    alias startvncserver="x0vncserver -PasswordFile ~/.vnc/passwd"

  # wget
    alias wget='wget --hsts-file="$XDG_CACHE_HOME/wget-hsts"'

  # steam
    alias steam='steam -no-browser +open steam://open/minigameslist'
    alias steamclient='\steam'
