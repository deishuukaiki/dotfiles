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

# pipewire
pipewire &

# xrandr and xwallpaper
/home/maciej/.scripts/xrandr.sh; sleep 1;
/home/maciej/.scripts/wallpaper.sh &

picom -b &

case "$2" in

  'dwm')
      dwmblocks & exec dbus-launch dwm
    ;;

  '')
      dwmblocks & exec dbus-launch dwm
    ;;

  'bspwm')
    exec bspwm
    ;;

esac
