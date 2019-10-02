#!/bin/bash
#this script is called by a cronjob upon reboot... Writes mount point to a txt file every 5 seconds
while sleep 5; do df -k>/var/www/html/what_is_mounted.txt; done
