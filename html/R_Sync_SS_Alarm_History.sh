rsync -a --include='*/' --include='nmsalarm.*' --exclude='*' root@dbmmtl001:/opt/mgtservices/statusService/logs/ /var/www/html/OneNDS_Alarm_History/dbmmtl001/
rsync -a --include='*/' --include='nmsalarm.*' --exclude='*' root@dbmtor001:/opt/mgtservices/statusService/logs/ /var/www/html/OneNDS_Alarm_History/dbmtor001/
rsync -a --include='*/' --include='nmsalarm.*' --exclude='*' root@dbmtor002:/opt/mgtservices/statusService/logs/ /var/www/html/OneNDS_Alarm_History/dbmtor002/

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
date_8_days_ago=$(date -d '-8 day' +%Y-%b-%d)
date_9_days_ago=$(date -d '-9 day' +%Y-%b-%d)

filename_today='nmsalarm.log'
filename_1_day_ago='nmsalarm.log.'$date_1_day_ago'.1.gz'
filename_2_days_ago='nmsalarm.log.'$date_2_days_ago'.1.gz'
filename_3_days_ago='nmsalarm.log.'$date_3_days_ago'.1.gz'
filename_4_days_ago='nmsalarm.log.'$date_4_days_ago'.1.gz'
filename_5_days_ago='nmsalarm.log.'$date_5_days_ago'.1.gz'
filename_6_days_ago='nmsalarm.log.'$date_6_days_ago'.1.gz'
filename_7_days_ago='nmsalarm.log.'$date_7_days_ago'.1.gz'
filename_8_days_ago='nmsalarm.log.'$date_8_days_ago'.1.gz'
filename_9_days_ago='nmsalarm.log.'$date_9_days_ago'.1.gz'

#need to check which ADMs SS have been mounted successfully
#If mounted successfully, then set to 1, else keep at 0
while IFS= read -r line
do
  if [[ $line == *"root@dbmtor001:/opt/mgtservices/statusService/live/"* ]];then 
    is_backup1_mount_point="1"
  fi

  if [[ $line == *"root@dbmmtl001:/opt/mgtservices/statusService/live/"* ]];then
    is_backup2_mount_point="1"
  fi

  if [[ $line == *"root@dbmtor002:/opt/mgtservices/statusService/live/"* ]];then
    is_prim_mount_point="1"
  fi
done < "$what_is_mounted_file"


if [ $is_prim_mount_point=="1" ];then
  cd /var/www/html/OneNDS_Alarm_History/dbmtor002/
  zcat $filename_7_days_ago > nmsalarm_7_days_ago.txt
  zcat $filename_6_days_ago > nmsalarm_6_days_ago.txt
  zcat $filename_5_days_ago > nmsalarm_5_days_ago.txt
  zcat $filename_4_days_ago > nmsalarm_4_days_ago.txt
  zcat $filename_3_days_ago > nmsalarm_3_days_ago.txt
  zcat $filename_2_days_ago > nmsalarm_2_days_ago.txt
  zcat $filename_1_day_ago > nmsalarm_1_day_ago.txt
  cat $filename_today > nmsalarm_today.txt
  chown ubuntu:ubuntu nmsalarm_7_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_6_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_5_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_4_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_3_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_2_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_1_day_ago.txt
  chown ubuntu:ubuntu nmsalarm_today.txt
fi


if [ $is_backup1_mount_point=="1" ];then 
  cd /var/www/html/OneNDS_Alarm_History/dbmtor001/
  zcat $filename_7_days_ago > nmsalarm_7_days_ago.txt
  zcat $filename_6_days_ago > nmsalarm_6_days_ago.txt
  zcat $filename_5_days_ago > nmsalarm_5_days_ago.txt
  zcat $filename_4_days_ago > nmsalarm_4_days_ago.txt
  zcat $filename_3_days_ago > nmsalarm_3_days_ago.txt
  zcat $filename_2_days_ago > nmsalarm_2_days_ago.txt
  zcat $filename_1_day_ago > nmsalarm_1_day_ago.txt
  cat $filename_today > nmsalarm_today.txt
  chown ubuntu:ubuntu nmsalarm_7_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_6_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_5_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_4_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_3_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_2_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_1_day_ago.txt
  chown ubuntu:ubuntu nmsalarm_today.txt
fi




if [ $is_backup2_mount_point=="1" ];then
  cd /var/www/html/OneNDS_Alarm_History/dbmmtl001/
  zcat $filename_7_days_ago > nmsalarm_7_days_ago.txt
  zcat $filename_6_days_ago > nmsalarm_6_days_ago.txt
  zcat $filename_5_days_ago > nmsalarm_5_days_ago.txt
  zcat $filename_4_days_ago > nmsalarm_4_days_ago.txt
  zcat $filename_3_days_ago > nmsalarm_3_days_ago.txt
  zcat $filename_2_days_ago > nmsalarm_2_days_ago.txt
  zcat $filename_1_day_ago > nmsalarm_1_day_ago.txt
  cat $filename_today > nmsalarm_today.txt
  chown ubuntu:ubuntu nmsalarm_7_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_6_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_5_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_4_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_3_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_2_days_ago.txt
  chown ubuntu:ubuntu nmsalarm_1_day_ago.txt
  chown ubuntu:ubuntu nmsalarm_today.txt
  
fi

cd /var/www/html/

if [ -f "/var/www/html/OneNDS_Alarm_History/dbmtor002/"$filename_8_days_ago"" ]; then rm /var/www/html/OneNDS_Alarm_History/dbmtor002/$filename_8_days_ago; fi
if [ -f "/var/www/html/OneNDS_Alarm_History/dbmtor002/"$filename_9_days_ago"" ]; then rm /var/www/html/OneNDS_Alarm_History/dbmtor002/$filename_9_days_ago; fi
if [ -f "/var/www/html/OneNDS_Alarm_History/dbmtor001/"$filename_8_days_ago"" ]; then rm /var/www/html/OneNDS_Alarm_History/dbmtor001/$filename_8_days_ago; fi
if [ -f "/var/www/html/OneNDS_Alarm_History/dbmtor001/"$filename_9_days_ago"" ]; then rm /var/www/html/OneNDS_Alarm_History/dbmtor001/$filename_9_days_ago; fi
if [ -f "/var/www/html/OneNDS_Alarm_History/dbmmtl001/"$filename_8_days_ago"" ]; then rm /var/www/html/OneNDS_Alarm_History/dbmmtl001/$filename_8_days_ago; fi
if [ -f "/var/www/html/OneNDS_Alarm_History/dbmmtl001/"$filename_9_days_ago"" ]; then rm /var/www/html/OneNDS_Alarm_History/dbmmtl001/$filename_9_days_ago; fi

chmod 777 -R /var/www/html/OneNDS_Alarm_History/



