#!/bin/sh
echo "Do you wish to uninstall this program? (Yes/No)"
read yn
    case $yn in
        Yes ) break;;
        No ) exit;;
    esac
sudo rm -rf /usr/share/floatforyt
sudo rm /usr/share/applications/floatforyt.desktop
sudo rm /usr/bin/floatforyt

echo "Succefully uninstalled float for youtube."
