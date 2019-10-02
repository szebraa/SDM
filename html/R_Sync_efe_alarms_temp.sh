# rsync -a --include='*/' --include='af02_alarm_log.*' --exclude='*' root@efemtl003:/opt/sdf/log/ /var/www/html/efemtl003_alarms/
rsync -a --include='*/' --include='af02_alarm_log.*' --exclude='*' root@efemtl004:/opt/sdf/log/ /var/www/html/efemtl004_alarms/
rsync -a --include='*/' --include='af02_alarm_log.*' --exclude='*' root@efemtl005:/opt/sdf/log/ /var/www/html/efemtl005_alarms/
rsync -a --include='*/' --include='af02_alarm_log.*' --exclude='*' root@efemtl006:/opt/sdf/log/ /var/www/html/efemtl006_alarms/

# rsync -a --include='*/' --include='af02_alarm_log.*' --exclude='*' root@efetor003:/opt/sdf/log/ /var/www/html/efetor003_alarms/  				
# rsync -a --include='*/' --include='af02_alarm_log.*' --exclude='*' root@efetor004:/opt/sdf/log/ /var/www/html/efetor004_alarms/  				
# rsync -a --include='*/' --include='af02_alarm_log.*' --exclude='*' root@efetor005:/opt/sdf/log/ /var/www/html/efetor005_alarms/  				
# rsync -a --include='*/' --include='af02_alarm_log.*' --exclude='*' root@efetor006:/opt/sdf/log/ /var/www/html/efetor006_alarms/

#for file dates
date_today=$(date +%d%m%Y)
date_today_clear=$(date +%d-%B-%Y)
date_1_day_ago=$(date -d '-1 day' +%d%m%Y)
date_1_day_ago_clear=$(date -d '-1 day' +%d-%B-%Y)
date_2_days_ago=$(date -d '-2 day' +%d%m%Y)
date_2_days_ago_clear=$(date -d '-2 day' +%d-%B-%Y)
date_3_days_ago=$(date -d '-3 day' +%d%m%Y)
date_3_days_ago_clear=$(date -d '-3 day' +%d-%B-%Y)
date_4_days_ago=$(date -d '-4 day' +%d%m%Y)
date_4_days_ago_clear=$(date -d '-4 day' +%d-%B-%Y)
date_5_days_ago=$(date -d '-5 day' +%d%m%Y)
date_5_days_ago_clear=$(date -d '-5 day' +%d-%B-%Y)

date_6_days_ago=$(date -d '-6 day' +%d%m%Y)


#for directory dates
date_today_dir=$(date +%Y-%m-%d)
date_1_day_ago_dir=$(date -d '-1 day' +%Y-%m-%d)
date_2_days_ago_dir=$(date -d '-2 day' +%Y-%m-%d)
date_3_days_ago_dir=$(date -d '-3 day' +%Y-%m-%d)
date_4_days_ago_dir=$(date -d '-4 day' +%Y-%m-%d)
date_5_days_ago_dir=$(date -d '-5 day' +%Y-%m-%d)
date_6_days_ago_dir=$(date -d '-6 day' +%Y-%m-%d)
date_7_days_ago_dir=$(date -d '-7 day' +%Y-%m-%d)
date_8_days_ago_dir=$(date -d '-8 day' +%Y-%m-%d)
date_9_days_ago_dir=$(date -d '-9 day' +%Y-%m-%d)
date_10_days_ago_dir=$(date -d '-10 day' +%Y-%m-%d)
date_11_days_ago_dir=$(date -d '-11 day' +%Y-%m-%d)
date_12_days_ago_dir=$(date -d '-12 day' +%Y-%m-%d)
date_13_days_ago_dir=$(date -d '-13 day' +%Y-%m-%d)
date_14_days_ago_dir=$(date -d '-14 day' +%Y-%m-%d)
date_15_days_ago_dir=$(date -d '-15 day' +%Y-%m-%d)
date_16_days_ago_dir=$(date -d '-16 day' +%Y-%m-%d)
date_17_days_ago_dir=$(date -d '-17 day' +%Y-%m-%d)
date_18_days_ago_dir=$(date -d '-18 day' +%Y-%m-%d)


# #Alarm processing for efemtl003
# cd /var/www/html/efemtl003_alarms/

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_today |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_today.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_today_clear' /' temp_today.txt
# sed -i -e 's/^/efemtl003 /' temp_today.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_today.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_today.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_1_day_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_1_day_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_1_day_ago_clear' /' temp_1_day_ago.txt
# sed -i -e 's/^/efemtl003 /' temp_1_day_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_1_day_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_1_day_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_2_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_2_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_2_days_ago_clear' /' temp_2_days_ago.txt
# sed -i -e 's/^/efemtl003 /' temp_2_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_2_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_2_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_3_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_3_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_3_days_ago_clear' /' temp_3_days_ago.txt
# sed -i -e 's/^/efemtl003 /' temp_3_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_3_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_3_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_4_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_4_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_4_days_ago_clear' /' temp_4_days_ago.txt
# sed -i -e 's/^/efemtl003 /' temp_4_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_4_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_4_days_ago.txt

# cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//'|sed 'N;s/\n//' > af02_alarm_log-$date_5_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_5_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_5_days_ago_clear' /' temp_5_days_ago.txt
# sed -i -e 's/^/efemtl003 /' temp_5_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_5_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_5_days_ago.txt

# printf "" > af02_alarm_log-efemtl003-combined.txt
# cat af02_alarm_log-$date_5_days_ago.txt >> af02_alarm_log-efemtl003-combined.txt
# cat af02_alarm_log-$date_4_days_ago.txt >> af02_alarm_log-efemtl003-combined.txt
# cat af02_alarm_log-$date_3_days_ago.txt >> af02_alarm_log-efemtl003-combined.txt
# cat af02_alarm_log-$date_2_days_ago.txt >> af02_alarm_log-efemtl003-combined.txt
# cat af02_alarm_log-$date_1_day_ago.txt >> af02_alarm_log-efemtl003-combined.txt
# cat af02_alarm_log-$date_today.txt >> af02_alarm_log-efemtl003-combined.txt

# cd ..




#Alarm processing for efemtl004
cd /var/www/html/efemtl004_alarms/


#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_today |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_today.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_today_clear' /' temp_today.txt
sed -i -e 's/^/efemtl004 /' temp_today.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_today.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_today.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_1_day_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_1_day_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_1_day_ago_clear' /' temp_1_day_ago.txt
sed -i -e 's/^/efemtl004 /' temp_1_day_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_1_day_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_1_day_ago.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_2_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_2_days_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_2_days_ago_clear' /' temp_2_days_ago.txt
sed -i -e 's/^/efemtl004 /' temp_2_days_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_2_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_2_days_ago.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_3_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_3_days_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_3_days_ago_clear' /' temp_3_days_ago.txt
sed -i -e 's/^/efemtl004 /' temp_3_days_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_3_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_3_days_ago.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_4_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_4_days_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_4_days_ago_clear' /' temp_4_days_ago.txt
sed -i -e 's/^/efemtl004 /' temp_4_days_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_4_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_4_days_ago.txt

cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//'|sed 'N;s/\n//' > af02_alarm_log-$date_5_days_ago.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_5_days_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_5_days_ago_clear' /' temp_5_days_ago.txt
sed -i -e 's/^/efemtl004 /' temp_5_days_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_5_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_5_days_ago.txt

printf "" > af02_alarm_log-efemtl004-combined.txt
cat af02_alarm_log-$date_5_days_ago.txt >> af02_alarm_log-efemtl004-combined.txt
cat af02_alarm_log-$date_4_days_ago.txt >> af02_alarm_log-efemtl004-combined.txt
cat af02_alarm_log-$date_3_days_ago.txt >> af02_alarm_log-efemtl004-combined.txt
cat af02_alarm_log-$date_2_days_ago.txt >> af02_alarm_log-efemtl004-combined.txt
cat af02_alarm_log-$date_1_day_ago.txt >> af02_alarm_log-efemtl004-combined.txt
cat af02_alarm_log-$date_today.txt >> af02_alarm_log-efemtl004-combined.txt

cd ..








#Alarm processing for efemtl005
cd /var/www/html/efemtl005_alarms/


#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_today |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_today.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_today_clear' /' temp_today.txt
sed -i -e 's/^/efemtl005 /' temp_today.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_today.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_today.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_1_day_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_1_day_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_1_day_ago_clear' /' temp_1_day_ago.txt
sed -i -e 's/^/efemtl005 /' temp_1_day_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_1_day_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_1_day_ago.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_2_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_2_days_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_2_days_ago_clear' /' temp_2_days_ago.txt
sed -i -e 's/^/efemtl005 /' temp_2_days_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_2_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_2_days_ago.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_3_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_3_days_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_3_days_ago_clear' /' temp_3_days_ago.txt
sed -i -e 's/^/efemtl005 /' temp_3_days_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_3_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_3_days_ago.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_4_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_4_days_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_4_days_ago_clear' /' temp_4_days_ago.txt
sed -i -e 's/^/efemtl005 /' temp_4_days_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_4_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_4_days_ago.txt

cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//'|sed 'N;s/\n//' > af02_alarm_log-$date_5_days_ago.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_5_days_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_5_days_ago_clear' /' temp_5_days_ago.txt
sed -i -e 's/^/efemtl005 /' temp_5_days_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_5_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_5_days_ago.txt

printf "" > af02_alarm_log-efemtl005-combined.txt
cat af02_alarm_log-$date_5_days_ago.txt >> af02_alarm_log-efemtl005-combined.txt
cat af02_alarm_log-$date_4_days_ago.txt >> af02_alarm_log-efemtl005-combined.txt
cat af02_alarm_log-$date_3_days_ago.txt >> af02_alarm_log-efemtl005-combined.txt
cat af02_alarm_log-$date_2_days_ago.txt >> af02_alarm_log-efemtl005-combined.txt
cat af02_alarm_log-$date_1_day_ago.txt >> af02_alarm_log-efemtl005-combined.txt
cat af02_alarm_log-$date_today.txt >> af02_alarm_log-efemtl005-combined.txt


cd ..

#Alarm processing for efemtl006
cd /var/www/html/efemtl006_alarms/



#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_today |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_today.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_today_clear' /' temp_today.txt
sed -i -e 's/^/efemtl006 /' temp_today.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_today.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_today.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_1_day_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_1_day_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_1_day_ago_clear' /' temp_1_day_ago.txt
sed -i -e 's/^/efemtl006 /' temp_1_day_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_1_day_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_1_day_ago.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_2_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_2_days_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_2_days_ago_clear' /' temp_2_days_ago.txt
sed -i -e 's/^/efemtl006 /' temp_2_days_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_2_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_2_days_ago.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_3_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_3_days_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_3_days_ago_clear' /' temp_3_days_ago.txt
sed -i -e 's/^/efemtl006 /' temp_3_days_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_3_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_3_days_ago.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_4_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_4_days_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_4_days_ago_clear' /' temp_4_days_ago.txt
sed -i -e 's/^/efemtl006 /' temp_4_days_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_4_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_4_days_ago.txt

cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//'|sed 'N;s/\n//' > af02_alarm_log-$date_5_days_ago.txt

#get rid of unneccesary newlines (store in temp file)
cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_5_days_ago.txt
#pend on date + node affected (something like this: node affected date  )
sed -i -e 's/^/'$date_5_days_ago_clear' /' temp_5_days_ago.txt
sed -i -e 's/^/efemtl006 /' temp_5_days_ago.txt
#get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
cat temp_5_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_5_days_ago.txt

printf "" > af02_alarm_log-efemtl006-combined.txt
cat af02_alarm_log-$date_5_days_ago.txt >> af02_alarm_log-efemtl006-combined.txt
cat af02_alarm_log-$date_4_days_ago.txt >> af02_alarm_log-efemtl006-combined.txt
cat af02_alarm_log-$date_3_days_ago.txt >> af02_alarm_log-efemtl006-combined.txt
cat af02_alarm_log-$date_2_days_ago.txt >> af02_alarm_log-efemtl006-combined.txt
cat af02_alarm_log-$date_1_day_ago.txt >> af02_alarm_log-efemtl006-combined.txt
cat af02_alarm_log-$date_today.txt >> af02_alarm_log-efemtl006-combined.txt





cd ..

# #Alarm processing for efetor003
# cd /var/www/html/efetor003_alarms/





# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_today |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_today.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_today_clear' /' temp_today.txt
# sed -i -e 's/^/efetor003 /' temp_today.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_today.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_today.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_1_day_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_1_day_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_1_day_ago_clear' /' temp_1_day_ago.txt
# sed -i -e 's/^/efetor003 /' temp_1_day_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_1_day_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_1_day_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_2_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_2_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_2_days_ago_clear' /' temp_2_days_ago.txt
# sed -i -e 's/^/efetor003 /' temp_2_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_2_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_2_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_3_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_3_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_3_days_ago_clear' /' temp_3_days_ago.txt
# sed -i -e 's/^/efetor003 /' temp_3_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_3_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_3_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_4_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_4_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_4_days_ago_clear' /' temp_4_days_ago.txt
# sed -i -e 's/^/efetor003 /' temp_4_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_4_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_4_days_ago.txt

# cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//'|sed 'N;s/\n//' > af02_alarm_log-$date_5_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_5_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_5_days_ago_clear' /' temp_5_days_ago.txt
# sed -i -e 's/^/efetor003 /' temp_5_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_5_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_5_days_ago.txt

# printf "" > af02_alarm_log-efetor003-combined.txt
# cat af02_alarm_log-$date_5_days_ago.txt >> af02_alarm_log-efetor003-combined.txt
# cat af02_alarm_log-$date_4_days_ago.txt >> af02_alarm_log-efetor003-combined.txt
# cat af02_alarm_log-$date_3_days_ago.txt >> af02_alarm_log-efetor003-combined.txt
# cat af02_alarm_log-$date_2_days_ago.txt >> af02_alarm_log-efetor003-combined.txt
# cat af02_alarm_log-$date_1_day_ago.txt >> af02_alarm_log-efetor003-combined.txt
# cat af02_alarm_log-$date_today.txt >> af02_alarm_log-efetor003-combined.txt







# cd ..




# #alarm processing for efetor004
# cd /var/www/html/efetor004_alarms/


# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_today |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_today.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_today_clear' /' temp_today.txt
# sed -i -e 's/^/efetor004 /' temp_today.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_today.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_today.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_1_day_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_1_day_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_1_day_ago_clear' /' temp_1_day_ago.txt
# sed -i -e 's/^/efetor004 /' temp_1_day_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_1_day_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_1_day_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_2_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_2_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_2_days_ago_clear' /' temp_2_days_ago.txt
# sed -i -e 's/^/efetor004 /' temp_2_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_2_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_2_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_3_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_3_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_3_days_ago_clear' /' temp_3_days_ago.txt
# sed -i -e 's/^/efetor004 /' temp_3_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_3_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_3_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_4_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_4_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_4_days_ago_clear' /' temp_4_days_ago.txt
# sed -i -e 's/^/efetor004 /' temp_4_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_4_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_4_days_ago.txt

# cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//'|sed 'N;s/\n//' > af02_alarm_log-$date_5_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_5_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_5_days_ago_clear' /' temp_5_days_ago.txt
# sed -i -e 's/^/efetor004 /' temp_5_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_5_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_5_days_ago.txt

# printf "" > af02_alarm_log-efetor004-combined.txt
# cat af02_alarm_log-$date_5_days_ago.txt >> af02_alarm_log-efetor004-combined.txt
# cat af02_alarm_log-$date_4_days_ago.txt >> af02_alarm_log-efetor004-combined.txt
# cat af02_alarm_log-$date_3_days_ago.txt >> af02_alarm_log-efetor004-combined.txt
# cat af02_alarm_log-$date_2_days_ago.txt >> af02_alarm_log-efetor004-combined.txt
# cat af02_alarm_log-$date_1_day_ago.txt >> af02_alarm_log-efetor004-combined.txt
# cat af02_alarm_log-$date_today.txt >> af02_alarm_log-efetor004-combined.txt


# cd ..




# #alarm processing for efetor005
# cd /var/www/html/efetor005_alarms/


# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_today |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_today.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_today_clear' /' temp_today.txt
# sed -i -e 's/^/efetor005 /' temp_today.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_today.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_today.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_1_day_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_1_day_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_1_day_ago_clear' /' temp_1_day_ago.txt
# sed -i -e 's/^/efetor005 /' temp_1_day_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_1_day_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_1_day_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_2_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_2_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_2_days_ago_clear' /' temp_2_days_ago.txt
# sed -i -e 's/^/efetor005 /' temp_2_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_2_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_2_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_3_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_3_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_3_days_ago_clear' /' temp_3_days_ago.txt
# sed -i -e 's/^/efetor005 /' temp_3_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_3_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_3_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_4_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_4_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_4_days_ago_clear' /' temp_4_days_ago.txt
# sed -i -e 's/^/efetor005 /' temp_4_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_4_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_4_days_ago.txt

# cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//'|sed 'N;s/\n//' > af02_alarm_log-$date_5_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_5_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_5_days_ago_clear' /' temp_5_days_ago.txt
# sed -i -e 's/^/efetor005 /' temp_5_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_5_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_5_days_ago.txt

# printf "" > af02_alarm_log-efetor005-combined.txt
# cat af02_alarm_log-$date_5_days_ago.txt >> af02_alarm_log-efetor005-combined.txt
# cat af02_alarm_log-$date_4_days_ago.txt >> af02_alarm_log-efetor005-combined.txt
# cat af02_alarm_log-$date_3_days_ago.txt >> af02_alarm_log-efetor005-combined.txt
# cat af02_alarm_log-$date_2_days_ago.txt >> af02_alarm_log-efetor005-combined.txt
# cat af02_alarm_log-$date_1_day_ago.txt >> af02_alarm_log-efetor005-combined.txt
# cat af02_alarm_log-$date_today.txt >> af02_alarm_log-efetor005-combined.txt


# cd ..



# #alarm processing for efetor006
# cd /var/www/html/efetor006_alarms/

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_today |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_today.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_today_clear' /' temp_today.txt
# sed -i -e 's/^/efetor006 /' temp_today.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_today.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_today.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_1_day_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_1_day_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_1_day_ago_clear' /' temp_1_day_ago.txt
# sed -i -e 's/^/efetor006 /' temp_1_day_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_1_day_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_1_day_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_2_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_2_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_2_days_ago_clear' /' temp_2_days_ago.txt
# sed -i -e 's/^/efetor006 /' temp_2_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_2_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_2_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_3_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_3_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_3_days_ago_clear' /' temp_3_days_ago.txt
# sed -i -e 's/^/efetor006 /' temp_3_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_3_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_3_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_4_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_4_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_4_days_ago_clear' /' temp_4_days_ago.txt
# sed -i -e 's/^/efetor006 /' temp_4_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_4_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_4_days_ago.txt

# cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//'|sed 'N;s/\n//' > af02_alarm_log-$date_5_days_ago.txt

# #get rid of unneccesary newlines (store in temp file)
# cat af02_alarm_log.$date_5_days_ago |sed 'N;N;s/\n/ /'|sed 'N;s/\n//' > temp_5_days_ago.txt
# #pend on date + node affected (something like this: node affected date  )
# sed -i -e 's/^/'$date_5_days_ago_clear' /' temp_5_days_ago.txt
# sed -i -e 's/^/efetor006 /' temp_5_days_ago.txt
# #get rid of "system alarms", and any alarms that are not minor, major, critical or Indeterminate (i.e.: warning (4), clear (5), or off (6))
# cat temp_5_days_ago.txt | sed '/:0002:/d' | sed '/:4:/d' | sed '/:5:/d' | sed '/:6:/d'|sed 's/:0001:/ Alarm type: Kernel alarm /'|sed 's/:0003:/ Alarm type: Stack (SS7) alarm /'|sed 's/:0004:/ Alarm type: Communications alarm /'|sed 's/:0005:/ Alarm type: Application alarm /'|sed 's/:3:/ Severity: Minor /'|sed 's/:2:/ Severity: Major /'|sed 's/:1:/ Severity: Critical /'|sed 's/:0:/ Severity: Indeterminate /' > af02_alarm_log-$date_5_days_ago.txt

# printf "" > af02_alarm_log-efetor006-combined.txt
# cat af02_alarm_log-$date_5_days_ago.txt >> af02_alarm_log-efetor006-combined.txt
# cat af02_alarm_log-$date_4_days_ago.txt >> af02_alarm_log-efetor006-combined.txt
# cat af02_alarm_log-$date_3_days_ago.txt >> af02_alarm_log-efetor006-combined.txt
# cat af02_alarm_log-$date_2_days_ago.txt >> af02_alarm_log-efetor006-combined.txt
# cat af02_alarm_log-$date_1_day_ago.txt >> af02_alarm_log-efetor006-combined.txt
# cat af02_alarm_log-$date_today.txt >> af02_alarm_log-efetor006-combined.txt


# cd ..

#cleanup any old files (6 days or older)
# if [ -f "/var/www/html/efemtl003_alarms/af02_alarm_log."$date_6_days_ago"" ]; then rm /var/www/html/efemtl003_alarms/af02_alarm_log.$date_6_days_ago; fi
# if [ -f "/var/www/html/efemtl003_alarms/af02_alarm_log-"$date_6_days_ago".txt" ]; then rm /var/www/html/efemtl003_alarms/af02_alarm_log-$date_6_days_ago.txt; fi
if [ -f "/var/www/html/efemtl004_alarms/af02_alarm_log."$date_6_days_ago"" ]; then rm /var/www/html/efemtl004_alarms/af02_alarm_log.$date_6_days_ago; fi
if [ -f "/var/www/html/efemtl004_alarms/af02_alarm_log-"$date_6_days_ago".txt" ]; then rm /var/www/html/efemtl004_alarms/af02_alarm_log-$date_6_days_ago.txt; fi
if [ -f "/var/www/html/efemtl005_alarms/af02_alarm_log."$date_6_days_ago"" ]; then rm /var/www/html/efemtl005_alarms/af02_alarm_log.$date_6_days_ago; fi
if [ -f "/var/www/html/efemtl005_alarms/af02_alarm_log-"$date_6_days_ago".txt" ]; then rm /var/www/html/efemtl005_alarms/af02_alarm_log-$date_6_days_ago.txt; fi
if [ -f "/var/www/html/efemtl006_alarms/af02_alarm_log."$date_6_days_ago"" ]; then rm /var/www/html/efemtl006_alarms/af02_alarm_log.$date_6_days_ago; fi
if [ -f "/var/www/html/efemtl006_alarms/af02_alarm_log-"$date_6_days_ago".txt" ]; then rm /var/www/html/efemtl006_alarms/af02_alarm_log-$date_6_days_ago.txt; fi
# if [ -f "/var/www/html/efetor003_alarms/af02_alarm_log."$date_6_days_ago"" ]; then rm /var/www/html/efetor003_alarms/af02_alarm_log.$date_6_days_ago; fi
# if [ -f "/var/www/html/efetor003_alarms/af02_alarm_log-"$date_6_days_ago".txt" ]; then rm /var/www/html/efetor003_alarms/af02_alarm_log-$date_6_days_ago.txt; fi
# if [ -f "/var/www/html/efetor004_alarms/af02_alarm_log."$date_6_days_ago"" ]; then rm /var/www/html/efetor004_alarms/af02_alarm_log.$date_6_days_ago; fi
# if [ -f "/var/www/html/efetor004_alarms/af02_alarm_log-"$date_6_days_ago".txt" ]; then rm /var/www/html/efetor004_alarms/af02_alarm_log-$date_6_days_ago.txt; fi
# if [ -f "/var/www/html/efetor005_alarms/af02_alarm_log."$date_6_days_ago"" ]; then rm /var/www/html/efetor005_alarms/af02_alarm_log.$date_6_days_ago; fi
# if [ -f "/var/www/html/efetor005_alarms/af02_alarm_log-"$date_6_days_ago".txt" ]; then rm /var/www/html/efetor005_alarms/af02_alarm_log-$date_6_days_ago.txt; fi
# if [ -f "/var/www/html/efetor006_alarms/af02_alarm_log."$date_6_days_ago"" ]; then rm /var/www/html/efetor006_alarms/af02_alarm_log.$date_6_days_ago; fi
# if [ -f "/var/www/html/efetor006_alarms/af02_alarm_log-"$date_6_days_ago".txt" ]; then rm /var/www/html/efetor006_alarms/af02_alarm_log-$date_6_days_ago.txt; fi



# #cleanup folders (which are generated for some reason...)
# if [ -d "/var/www/html/efemtl003_alarms/"$date_today_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_today_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_1_day_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_1_day_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_2_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_2_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_3_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_3_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_4_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_4_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_5_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_5_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_6_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_6_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_7_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_7_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_8_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_8_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_9_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_9_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_10_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_10_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_11_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_11_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_12_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_12_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_13_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_13_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_14_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_14_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_15_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_15_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_16_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_16_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_17_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_17_days_ago_dir; fi
# if [ -d "/var/www/html/efemtl003_alarms/"$date_18_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl003_alarms/$date_18_days_ago_dir; fi




if [ -d "/var/www/html/efemtl004_alarms/"$date_today_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_today_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_1_day_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_1_day_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_2_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_2_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_3_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_3_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_4_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_4_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_5_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_5_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_6_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_6_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_7_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_7_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_8_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_8_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_9_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_9_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_10_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_10_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_11_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_11_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_12_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_12_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_13_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_13_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_14_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_14_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_15_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_15_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_16_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_16_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_17_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_17_days_ago_dir; fi
if [ -d "/var/www/html/efemtl004_alarms/"$date_18_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl004_alarms/$date_18_days_ago_dir; fi



if [ -d "/var/www/html/efemtl005_alarms/"$date_today_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_today_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_1_day_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_1_day_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_2_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_2_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_3_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_3_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_4_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_4_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_5_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_5_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_6_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_6_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_7_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_7_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_8_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_8_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_9_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_9_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_10_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_10_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_11_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_11_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_12_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_12_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_13_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_13_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_14_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_14_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_15_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_15_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_16_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_16_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_17_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_17_days_ago_dir; fi
if [ -d "/var/www/html/efemtl005_alarms/"$date_18_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl005_alarms/$date_18_days_ago_dir; fi


if [ -d "/var/www/html/efemtl006_alarms/"$date_today_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_today_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_1_day_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_1_day_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_2_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_2_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_3_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_3_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_4_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_4_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_5_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_5_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_6_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_6_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_7_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_7_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_8_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_8_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_9_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_9_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_10_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_10_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_11_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_11_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_12_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_12_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_13_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_13_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_14_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_14_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_15_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_15_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_16_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_16_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_17_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_17_days_ago_dir; fi
if [ -d "/var/www/html/efemtl006_alarms/"$date_18_days_ago_dir"" ]; then rm -rf /var/www/html/efemtl006_alarms/$date_18_days_ago_dir; fi

# if [ -d "/var/www/html/efetor003_alarms/"$date_today_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_today_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_1_day_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_1_day_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_2_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_2_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_3_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_3_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_4_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_4_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_5_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_5_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_6_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_6_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_7_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_7_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_8_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_8_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_9_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_9_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_10_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_10_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_11_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_11_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_12_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_12_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_13_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_13_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_14_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_14_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_15_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_15_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_16_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_16_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_17_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_17_days_ago_dir; fi
# if [ -d "/var/www/html/efetor003_alarms/"$date_18_days_ago_dir"" ]; then rm -rf /var/www/html/efetor003_alarms/$date_18_days_ago_dir; fi


# if [ -d "/var/www/html/efetor004_alarms/"$date_today_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_today_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_1_day_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_1_day_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_2_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_2_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_3_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_3_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_4_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_4_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_5_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_5_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_6_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_6_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_7_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_7_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_8_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_8_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_9_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_9_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_10_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_10_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_11_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_11_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_12_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_12_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_13_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_13_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_14_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_14_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_15_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_15_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_16_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_16_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_17_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_17_days_ago_dir; fi
# if [ -d "/var/www/html/efetor004_alarms/"$date_18_days_ago_dir"" ]; then rm -rf /var/www/html/efetor004_alarms/$date_18_days_ago_dir; fi


# if [ -d "/var/www/html/efetor005_alarms/"$date_today_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_today_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_1_day_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_1_day_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_2_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_2_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_3_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_3_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_4_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_4_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_5_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_5_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_6_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_6_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_7_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_7_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_8_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_8_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_9_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_9_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_10_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_10_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_11_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_11_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_12_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_12_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_13_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_13_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_14_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_14_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_15_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_15_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_16_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_16_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_17_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_17_days_ago_dir; fi
# if [ -d "/var/www/html/efetor005_alarms/"$date_18_days_ago_dir"" ]; then rm -rf /var/www/html/efetor005_alarms/$date_18_days_ago_dir; fi


# if [ -d "/var/www/html/efetor006_alarms/"$date_today_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_today_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_1_day_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_1_day_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_2_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_2_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_3_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_3_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_4_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_4_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_5_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_5_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_6_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_6_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_7_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_7_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_8_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_8_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_9_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_9_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_10_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_10_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_11_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_11_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_12_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_12_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_13_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_13_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_14_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_14_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_15_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_15_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_16_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_16_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_17_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_17_days_ago_dir; fi
# if [ -d "/var/www/html/efetor006_alarms/"$date_18_days_ago_dir"" ]; then rm -rf /var/www/html/efetor006_alarms/$date_18_days_ago_dir; fi






# chmod 777 -R /var/www/html/efemtl003_alarms/ /var/www/html/efemtl004_alarms/ /var/www/html/efemtl005_alarms/ /var/www/html/efemtl006_alarms/ /var/www/html/efetor003_alarms/ /var/www/html/efetor004_alarms/ /var/www/html/efetor005_alarms/ /var/www/html/efetor006_alarms/;
chmod 777 -R /var/www/html/efemtl004_alarms/ /var/www/html/efemtl005_alarms/ /var/www/html/efemtl006_alarms/;
