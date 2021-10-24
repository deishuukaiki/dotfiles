#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

PS1=' \[\e[0;92m\]\u\[\e[0;1m\]@\[\e[0;95m\]\h \[\e[0;1m\]λ\[\e[0m\] '

# AUTOCOMPLETION
  complete -cf doas

# HISTORY
  export HISTCONTROL=ignoredups

# VI MODE
  set -o vi

# PREVENT NESTED RANGER INSTANCES
  ranger() {
      if [ -z "$RANGER_LEVEL" ]; then
          /usr/bin/ranger "$@"
      else
          exit
      fi
  }

# XDG DIRS
  export XDG_DESKTOP_DIR="$HOME/downloads"
  export XDG_DOWNLOAD_DIR="$HOME/downloads"
  export XDG_MUSIC_DIR="$HOME/media/music"
  export XDG_PICTURES_DIR="$HOME/media/pictures"
  export XDG_VIDEOS_DIR="$HOME/media/videos"

# ENVIRONMENT VARIABLES
  export VISUAL=/usr/bin/nvim
  export EDITOR=/usr/bin/nvim
  export PATH="$PATH:/home/maciej/.local/bin"
  export KEYTIMEOUT=10
  export BROWSER=librewolf
  export ADOTDIR="$HOME/.config/antigen"
  export GNUPGHOME="$XDG_DATA_HOME/gnupg"

# ALIASES
  
  # ls
    alias ls='ls --color=auto'

  # vim
    alias vim="nvim"

  # ssh
    alias ssh223="ssh root@192.168.50.223"
    alias ssh210="ssh usr@192.168.50.210 -p 8022"
    alias ssh107="ssh monika@192.168.50.107"
    alias ssh127="ssh maciej@192.168.50.127"

  # vnc
    alias startvncserver="x0vncserver -PasswordFile ~/.vnc/passwd"

  # wget
    alias wget='wget --hsts-file="$XDG_CACHE_HOME/wget-hsts"'

  # steam
    alias steam='steam -no-browser +open steam://open/minigameslist'
    alias steamclient='\steam'
