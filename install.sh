#!/bin/sh
# Building script.
SUDO=''
if (( $EUID != 0 )); then
    echo "[ERROR] You must run this script as root."
    exit
fi
echo "Installing dependencies..."
$SUDO apt -y install gjs
echo "Installing application"
$SUDO mkdir /usr/share/floatforyt
$SUDO cp -r * /usr/share/floatforyt
echo "Deploying launching..."
$SUDO cp floatforyt.desktop /usr/share/applications
$SUDO ln -s /usr/share/floatforyt/floatforyt /usr/bin/floatforyt
$SUDO mkdir $HOME/bin
$SUDO ln -s /usr/share/floatforyt/floatforyt $HOME/bin/floatforyt