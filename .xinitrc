#!/bin/bash
#
# ~/.xinitrc
#
# Executed by startx (run your window manager from here)

if [ -d /etc/X11/xinit/xinitrc.d ]; then
  for f in /etc/X11/xinit/xinitrc.d/*; do
    [ -x "$f" ] && . "$f"
  done
  unset f
fi

# xresources in .config
xrdb -merge ~/.config/.Xresources &

# polish keyboard
setxkbmap pl &

# set alsa volume of speakers
# UNCOMMENT ON LAPTOP!!!
# amixer -c 0 set Speaker 100

# pipewire
pipewire &
pipewire-media-session &
pipewire-pulse &

# xrandr and xwallpaper
# $HOME/scripts/xrandr.sh; sleep 1;
# $HONE/scripts/wallpaper.sh &
# xwallpaper --center /usr/share/wallpaper.jpg

dwmblocks &
dwm
