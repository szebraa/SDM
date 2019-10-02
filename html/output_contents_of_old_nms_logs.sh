#!/bin/bash
#this script is called by a cronjob everyday at midnight...
#The purpose of it is to "zcat" all gz nms files into
#txt files so that my SHiaI Javascript file can read it easily
what_is_mounted_file="/var/www/html/what_is_mounted.txt"
is_prim_mount_point=0
is_backup1_mount_point=0
is_backup2_mount_point=0
date_1_day_ago=$(date -d '-1 day' +%Y-%b-%d)
date_2_days_ago=$(date -d '-2 day' +%Y-%b-%d)
date_3_days_ago=$(date -d '-3 day' +%Y-%b-%d)
date_4_days_ago=$(date -d '-4 day' +%Y-%b-%d)
date_5_days_ago=$(date -d '-5 day' +%Y-%b-%d)
date_6_days_ago=$(date -d '-6 day' +%Y-%b-%d)
date_7_days_ago=$(date -d '-7 day' +%Y-%b-%d)

filename_1_day_ago='nmsalarm.log.'$date_1_day_ago'.1.gz'
filename_2_days_ago='nmsalarm.log.'$date_2_days_ago'.1.gz'
filename_3_days_ago='nmsalarm.log.'$date_3_days_ago'.1.gz'
filename_4_days_ago='nmsalarm.log.'$date_4_days_ago'.1.gz'
filename_5_days_ago='nmsalarm.log.'$date_5_days_ago'.1.gz'
filename_6_days_ago='nmsalarm.log.'$date_6_days_ago'.1.gz'
filename_7_days_ago='nmsalarm.log.'$date_7_days_ago'.1.gz'

#need to check which ADMs SS have been mounted successfully
#If mounted successfully, then set to 1, else keep at 0
while IFS= read -r line
do
  if [[ $line == *"root@dbmtor001:/opt/mgtservices/statusService/logs/"* ]];then 
    is_backup1_mount_point=1
  fi

  if [[ $line == *"root@dbmmtl001:/opt/mgtservices/statusService/logs/"* ]];then
    is_backup2_mount_point=1
  fi

  if [[ $line == *"root@dbmtor002:/opt/mgtservices/statusService/logs/"* ]];then
    is_prim_mount_point=1
  fi
done < "$what_is_mounted_file"


if [ $is_prim_mount_point == "1" ];then
  cd SS_Alarms_Mount_Point/
  zcat $filename_7_days_ago > nmsalarm_7_days_ago.txt
  zcat $filename_6_days_ago > nmsalarm_6_days_ago.txt
  zcat $filename_5_days_ago > nmsalarm_5_days_ago.txt
  zcat $filename_4_days_ago > nmsalarm_4_days_ago.txt
  zcat $filename_3_days_ago > nmsalarm_3_days_ago.txt
  zcat $filename_2_days_ago > nmsalarm_2_days_ago.txt
  zcat $filename_1_day_ago > nmsalarm_1_day_ago.txt
  chown ubuntu:ubuntu nmsalarm_7_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_6_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_5_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_4_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_3_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_2_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_1_day_ago.txt
fi 

if [ $is_backup1_mount_point == "1" ];then 
  cd ../SS_Alarms_Mount_Point_Backup1/
  zcat $filename_7_days_ago > nmsalarm_7_days_ago.txt
  zcat $filename_6_days_ago > nmsalarm_6_days_ago.txt
  zcat $filename_5_days_ago > nmsalarm_5_days_ago.txt
  zcat $filename_4_days_ago > nmsalarm_4_days_ago.txt
  zcat $filename_3_days_ago > nmsalarm_3_days_ago.txt
  zcat $filename_2_days_ago > nmsalarm_2_days_ago.txt
  zcat $filename_1_day_ago > nmsalarm_1_day_ago.txt
  chown ubuntu:ubuntu nmsalarm_7_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_6_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_5_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_4_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_3_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_2_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_1_day_ago.txt
fi

if [ $is_backup2_mount_point == "1" ];then
  cd ../SS_Alarms_Mount_Point_Backup2/
  zcat $filename_7_days_ago > nmsalarm_7_days_ago.txt
  zcat $filename_6_days_ago > nmsalarm_6_days_ago.txt
  zcat $filename_5_days_ago > nmsalarm_5_days_ago.txt
  zcat $filename_4_days_ago > nmsalarm_4_days_ago.txt
  zcat $filename_3_days_ago > nmsalarm_3_days_ago.txt
  zcat $filename_2_days_ago > nmsalarm_2_days_ago.txt
  zcat $filename_1_day_ago > nmsalarm_1_day_ago.txt
  chown ubuntu:ubuntu nmsalarm_7_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_6_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_5_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_4_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_3_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_2_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_1_day_ago.txt
fi


