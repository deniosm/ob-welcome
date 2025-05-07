#!/bin/bash

# Define variables
CONFIG_FILE="/home/$USER/.ob-welcome"
AUTOSTART_FILE="/home/$USER/.config/autostart/ob-welcome-first.desktop"

if [ "$(cat "$CONFIG_FILE")" = "autostart=1" ]; then
    echo "autostart=0" > "$CONFIG_FILE"
    rm -f "$AUTOSTART_FILE"
fi
