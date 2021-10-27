#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

PS1='\[\e[0;92m\]\u\[\e[0;1m\]@\[\e[0;95m\]\h \[\e[0;96m\]\W \[\e[0;1m\]λ \[\e[0m\]'

# AUTOCOMPLETION
  complete -cf doas

# HISTORY
  export HISTCONTROL=ignoredups

# VI MODE
  set -o vi

# AUTOJUMP
  [[ -s /home/maciej/.autojump/etc/profile.d/autojump.sh ]] && source /home/maciej/.autojump/etc/profile.d/autojump.sh

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

  # general improvements
    alias cp='cp -iv'                           # Preferred 'cp' implementation
    alias mv='mv -iv'                           # Preferred 'mv' implementation
    alias mkdir='mkdir -pv'                     # Preferred 'mkdir' implementation
    alias c='clear'                             # c:            Clear terminal display
    alias wget='wget --hsts-file="$XDG_CACHE_HOME/wget-hsts" -c'
    alias r='ranger'
    # ls
      alias ls='ls --color=auto'
      alias ll='ls -lAFh'                         # Preferred 'ls' implementation
      alias la='ls -Al'               		# show hidden files
      alias lh='ls -lSrh'             		# sort by size human readable

  # ssh
    alias ssh223="ssh root@192.168.50.223"
    alias ssh107="ssh monika@192.168.50.107"
    alias ssh127="ssh maciej@192.168.50.127"

  # copy content of file
    alias copyfile="xclip -selection clipboard -i < "

