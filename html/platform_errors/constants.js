const DATE_OLD_TO_NEW = "Date (oldest to newest)";
const DATE_NEW_TO_OLD = "Date (newest to oldest)";
const GENERIC_COND_A_TO_Z = "Generic Condition (A to Z)";
const GENERIC_COND_Z_TO_A = "Generic Condition (Z to A)";
const SEVERITY_A_TO_Z = "Severity (A to Z)";
const SEVERITY_Z_TO_A = "Severity (Z to A)";
const AFFECTED_HOSTS_A_TO_Z = "Affected Hosts (A to Z)";
const AFFECTED_HOSTS_Z_TO_A = "Affected Hosts (Z to A)";
const ALARM_TEXT_A_TO_Z = "Alarm text (A to Z)";
const ALARM_TEXT_Z_TO_A = "Alarm text (Z to A)";
const ALARM_DESC_A_TO_Z = "Alarm description (A to Z)";
const ALARM_DESC_Z_TO_A = "Alarm description (Z to A)";
const INST_COUNT_MOST_TO_LEAST = "Instance count (most to least)";
const INST_COUNT_LEAST_TO_MOST = "Instance count (least to most)";
const GENERIC_SORT_A_TO_Z = "Generic A to Z" 

const ONE_NDS_LIVE_TABLE_NAME = "myTable";


const PRIMARY_MOUNT_POINT = "root@dbmtor002:/opt/mgtservices/statusService/live/"; //translates to /var/www/html/SS_Alarms_Mount_Point
const BACKUP1_MOUNT_POINT = "root@dbmtor001:/opt/mgtservices/statusService/live/"; //translates to /var/www/html/SS_Alarms_Mount_Point_Backup1
const BACKUP2_MOUNT_POINT = "root@dbmmtl001:/opt/mgtservices/statusService/live/"; //translates to /var/www/html/SS_Alarms_Mount_Point_Backup2
const LIVE_ALARMS_TXT_FILTER_PATH = '../AlarmFilterTxtFiles/filters.txt';
const LIVE_NODE_TXT_FILTER_PATH = '../NodeFiltersTxtFiles/filters.txt';
const ACTIVE_MOUNT_POINT_DIR = '../what_is_mounted.txt';

const ONE_NDS_LIVE_ALARMS = "ONE_NDS_LIVE_ALARMS";


//constants for OneNDS Alarm History


const HIST_ALARMS_TXT_FILTER_PATH = '../OneNDS_Alarm_Txt_History_Filter/filters.txt'
const HIST_NODE_TXT_FILTER_PATH = '../OneNDS_Node_Txt_History_Filter/filters.txt';
const ONE_NDS_HISTORY_ALARMS = "ONE_NDS_HISTORY_ALARMS";

const UNIQUE_ALARM_ID_A_TO_Z = "Unique Alarm ID (A to Z)";
const UNIQUE_ALARM_ID_Z_TO_A = "Unique Alarm ID (Z to A)";
 


//translates to /var/www/html/OneNDS_Alarm_History/dbmtor002/*
const PRIMARY_RSYNC_ALARM_HISTORY_FILE_TODAY = '../OneNDS_Alarm_History/dbmtor002/nmsalarm_today.txt';
const PRIMARY_RSYNC_ALARM_HISTORY_FILE_1_DAY_AGO = '../OneNDS_Alarm_History/dbmtor002/nmsalarm_1_day_ago.txt';
const PRIMARY_RSYNC_ALARM_HISTORY_FILE_2_DAYS_AGO = '../OneNDS_Alarm_History/dbmtor002/nmsalarm_2_days_ago.txt';
const PRIMARY_RSYNC_ALARM_HISTORY_FILE_3_DAYS_AGO = '../OneNDS_Alarm_History/dbmtor002/nmsalarm_3_days_ago.txt';
const PRIMARY_RSYNC_ALARM_HISTORY_FILE_4_DAYS_AGO = '../OneNDS_Alarm_History/dbmtor002/nmsalarm_4_days_ago.txt';
const PRIMARY_RSYNC_ALARM_HISTORY_FILE_5_DAYS_AGO = '../OneNDS_Alarm_History/dbmtor002/nmsalarm_5_days_ago.txt';
const PRIMARY_RSYNC_ALARM_HISTORY_FILE_6_DAYS_AGO = '../OneNDS_Alarm_History/dbmtor002/nmsalarm_6_days_ago.txt';
const PRIMARY_RSYNC_ALARM_HISTORY_FILE_7_DAYS_AGO = '../OneNDS_Alarm_History/dbmtor002/nmsalarm_7_days_ago.txt';

//translates to /var/www/html/OneNDS_Alarm_History/dbmtor001/*
const BACKUP1_RSYNC_ALARM_HISTORY_FILE_TODAY = '../OneNDS_Alarm_History/dbmtor001/nmsalarm_today.txt';
const BACKUP1_RSYNC_ALARM_HISTORY_FILE_1_DAY_AGO = '../OneNDS_Alarm_History/dbmtor001/nmsalarm_1_day_ago.txt';
const BACKUP1_RSYNC_ALARM_HISTORY_FILE_2_DAYS_AGO = '../OneNDS_Alarm_History/dbmtor001/nmsalarm_2_days_ago.txt';
const BACKUP1_RSYNC_ALARM_HISTORY_FILE_3_DAYS_AGO = '../OneNDS_Alarm_History/dbmtor001/nmsalarm_3_days_ago.txt';
const BACKUP1_RSYNC_ALARM_HISTORY_FILE_4_DAYS_AGO = '../OneNDS_Alarm_History/dbmtor001/nmsalarm_4_days_ago.txt';
const BACKUP1_RSYNC_ALARM_HISTORY_FILE_5_DAYS_AGO = '../OneNDS_Alarm_History/dbmtor001/nmsalarm_5_days_ago.txt';
const BACKUP1_RSYNC_ALARM_HISTORY_FILE_6_DAYS_AGO = '../OneNDS_Alarm_History/dbmtor001/nmsalarm_6_days_ago.txt';
const BACKUP1_RSYNC_ALARM_HISTORY_FILE_7_DAYS_AGO = '../OneNDS_Alarm_History/dbmtor001/nmsalarm_7_days_ago.txt';

//translates to /var/www/html/OneNDS_Alarm_History/dbmmtl001/*
const BACKUP2_RSYNC_ALARM_HISTORY_FILE_TODAY = '../OneNDS_Alarm_History/dbmmtl001/nmsalarm_today.txt';
const BACKUP2_RSYNC_ALARM_HISTORY_FILE_1_DAY_AGO = '../OneNDS_Alarm_History/dbmmtl001/nmsalarm_1_day_ago.txt';
const BACKUP2_RSYNC_ALARM_HISTORY_FILE_2_DAYS_AGO = '../OneNDS_Alarm_History/dbmmtl001/nmsalarm_2_days_ago.txt';
const BACKUP2_RSYNC_ALARM_HISTORY_FILE_3_DAYS_AGO = '../OneNDS_Alarm_History/dbmmtl001/nmsalarm_3_days_ago.txt';
const BACKUP2_RSYNC_ALARM_HISTORY_FILE_4_DAYS_AGO = '../OneNDS_Alarm_History/dbmmtl001/nmsalarm_4_days_ago.txt';
const BACKUP2_RSYNC_ALARM_HISTORY_FILE_5_DAYS_AGO = '../OneNDS_Alarm_History/dbmmtl001/nmsalarm_5_days_ago.txt';
const BACKUP2_RSYNC_ALARM_HISTORY_FILE_6_DAYS_AGO = '../OneNDS_Alarm_History/dbmmtl001/nmsalarm_6_days_ago.txt';
const BACKUP2_RSYNC_ALARM_HISTORY_FILE_7_DAYS_AGO = '../OneNDS_Alarm_History/dbmmtl001/nmsalarm_7_days_ago.txt';


const ONE_NDS_HISTORY_TABLE_NAME = "OneNDSHistoryTable";

const DEFAULT = "DEFAULT";
const DATE_ONLY = "DATE_ONLY";
const TIME_ONLY = "TIME_ONLY";
const DATE_AND_TIME = "DATE_AND_TIME";


//Constants for OneNDS History affected hosts translation table

const SDN_NAME_OF_BDSTOR011 = 'ONENDS-1/NDS-1/DSA-2/DIRN-1';
const SDN_NAME_OF_BDSTOR013 = 'ONENDS-1/NDS-1/DSA-2/DIRN-2';
const SDN_NAME_OF_BDSMTLl012 = 'ONENDS-1/NDS-1/DSA-2/DIRN-3';
const SDN_NAME_OF_BDSMTLl014 = 'ONENDS-1/NDS-1/DSA-2/DIRN-4';
const SDN_NAME_OF_BDSTOR021 = 'ONENDS-1/NDS-1/DSA-3/DIRN-1';
const SDN_NAME_OF_BDSTOR023 = 'ONENDS-1/NDS-1/DSA-3/DIRN-2';
const SDN_NAME_OF_BDSMTL022 = 'ONENDS-1/NDS-1/DSA-3/DIRN-3';
const SDN_NAME_OF_BDSMTL024 = 'ONENDS-1/NDS-1/DSA-3/DIRN-4';
const SDN_NAME_OF_BDSTOR031 = 'ONENDS-1/NDS-1/DSA-4/DIRN-1';
const SDN_NAME_OF_BDSTOR033 = 'ONENDS-1/NDS-1/DSA-4/DIRN-2';
const SDN_NAME_OF_BDSMTL032 = 'ONENDS-1/NDS-1/DSA-4/DIRN-3';
const SDN_NAME_OF_BDSMTL034 = 'ONENDS-1/NDS-1/DSA-4/DIRN-4';
const SDN_NAME_OF_BDSTOR041 = 'ONENDS-1/NDS-1/DSA-5/DIRN-1';
const SDN_NAME_OF_BDSTOR043 = 'ONENDS-1/NDS-1/DSA-5/DIRN-2';
const SDN_NAME_OF_BDSMTL042 = 'ONENDS-1/NDS-1/DSA-5/DIRN-3';
const SDN_NAME_OF_BDSMTL044 = 'ONENDS-1/NDS-1/DSA-5/DIRN-4';
const SDN_NAME_OF_BDSTOR051 = 'ONENDS-1/NDS-1/DSA-6/DIRN-1';
const SDN_NAME_OF_BDSTOR053 = 'ONENDS-1/NDS-1/DSA-6/DIRN-2';
const SDN_NAME_OF_BDSMTL052 = 'ONENDS-1/NDS-1/DSA-6/DIRN-3';
const SDN_NAME_OF_BDSMTL054 = 'ONENDS-1/NDS-1/DSA-6/DIRN-4';
const SDN_NAME_OF_BDSTOR061 = 'ONENDS-1/NDS-1/DSA-7/DIRN-1';
const SDN_NAME_OF_BDSTOR063 = 'ONENDS-1/NDS-1/DSA-7/DIRN-2';
const SDN_NAME_OF_BDSMTL062 = 'ONENDS-1/NDS-1/DSA-7/DIRN-3';
const SDN_NAME_OF_BDSMTL064 = 'ONENDS-1/NDS-1/DSA-7/DIRN-4';

const SDN_NAME_OF_PGDTOR011 = 'ONENDS-1/NDS-2/DSA-1/DIRN-1';
const SDN_NAME_OF_PGDTOR013 = 'ONENDS-1/NDS-2/DSA-1/DIRN-2';
const SDN_NAME_OF_PGDMTL012 = 'ONENDS-1/NDS-2/DSA-1/DIRN-3';
const SDN_NAME_OF_PGDMTL014 = 'ONENDS-1/NDS-2/DSA-1/DIRN-4';
const SDN_NAME_OF_FDSTOR001 = 'ONENDS-1/NDS-1/DSA-1/DIRN-1';
const SDN_NAME_OF_FDSTOR002 = 'ONENDS-1/NDS-1/DSA-1/DIRN-2';
const SDN_NAME_OF_FDSTOR003 = 'ONENDS-1/NDS-1/DSA-1/DIRN-4';
const SDN_NAME_OF_FDSTOR004 = 'ONENDS-1/NDS-1/DSA-1/DIRN-7';
const SDN_NAME_OF_FDSMTL001 = 'ONENDS-1/NDS-1/DSA-1/DIRN-3';
const SDN_NAME_OF_FDSMTL002 = 'ONENDS-1/NDS-1/DSA-1/DIRN-5';
const SDN_NAME_OF_FDSMTL003 = 'ONENDS-1/NDS-1/DSA-1/DIRN-6';
const SDN_NAME_OF_FDSMTL004 = 'ONENDS-1/NDS-1/DSA-1/DIRN-8';


const SDN_NAME_OF_DBMMTL001 = 'ONENDS-1/ADM-1/ADMH-1/ADMN-dbmmtl001';
const SDN_NAME_OF_DBMTOR001 = 'ONENDS-1/ADM-1/ADMH-1/ADMN-dbmtor001';
const SDN_NAME_OF_DBMTOR002 = 'ONENDS-1/ADM-1/ADMH-1/ADMN-dbmtor002';
                                                                  
const SDN_NAME_OF_PGWTOR001 = 'ONENDS-1/PGW-1/PGWH-1/PGWN-pgwtor001';
const SDN_NAME_OF_PGWTOR002 = 'ONENDS-1/PGW-1/PGWH-1/PGWN-pgwtor002';
const SDN_NAME_OF_PGWMTL001 = 'ONENDS-1/PGW-1/PGWH-1/PGWN-pgwmtl001';
const SDN_NAME_OF_PGWMTL002 = 'ONENDS-1/PGW-1/PGWH-1/PGWN-pgwmtl002';
                                                                   
const SDN_NAME_OF_DBMTOR001_SS = 'ONENDS-1/SS-1/SSHA-1/SSN-dbmtor001';
const SDN_NAME_OF_DBMTOR002_SS = 'ONENDS-1/SS-1/SSHA-1/SSN-dbmtor002';
const SDN_NAME_OF_DBMMTL001_SS = 'ONENDS-1/SS-1/SSHA-1/SSN-dbmmtl001';

const SDN_NAME_OF_PGDTOR011_NTF = 'ONENDS-1/NTF-1/NTFH-1/NTFN-pgdtor011';
const SDN_NAME_OF_PGDTOR013_NTF = 'ONENDS-1/NTF-1/NTFH-1/NTFN-pgdtor013';
const SDN_NAME_OF_PGDMTL012_NTF = 'ONENDS-1/NTF-1/NTFH-1/NTFN-pgdmtl012';
const SDN_NAME_OF_PGDMTL014_NTF = 'ONENDS-1/NTF-1/NTFH-1/NTFN-pgdmtl014';


const HOSTNAME_BDSTOR011 = 'bdstor011';
const HOSTNAME_BDSTOR013 = 'bdstor013';
const HOSTNAME_BDSTOR021 = 'bdstor021';
const HOSTNAME_BDSTOR023 = 'bdstor023';
const HOSTNAME_BDSTOR031 = 'bdstor031';
const HOSTNAME_BDSTOR033 = 'bdstor033';
const HOSTNAME_BDSTOR041 = 'bdstor041';
const HOSTNAME_BDSTOR043 = 'bdstor043';
const HOSTNAME_BDSTOR051 = 'bdstor051';
const HOSTNAME_BDSTOR053 = 'bdstor053';
const HOSTNAME_BDSTOR061 = 'bdstor061';
const HOSTNAME_BDSTOR063 = 'bdstor063';
const HOSTNAME_BDSMTL012 = 'bdsmtl012';
const HOSTNAME_BDSMTL014 = 'bdsmtl014';
const HOSTNAME_BDSMTL022 = 'bdsmtl022';
const HOSTNAME_BDSMTL024 = 'bdsmtl024';
const HOSTNAME_BDSMTL032 = 'bdsmtl032';
const HOSTNAME_BDSMTL034 = 'bdsmtl034';
const HOSTNAME_BDSMTL042 = 'bdsmtl042';
const HOSTNAME_BDSMTL044 = 'bdsmtl044';
const HOSTNAME_BDSMTL052 = 'bdsmtl052';
const HOSTNAME_BDSMTL054 = 'bdsmtl054';
const HOSTNAME_BDSMTL062 = 'bdsmtl062';
const HOSTNAME_BDSMTL064 = 'bdsmtl064';
const HOSTNAME_FDSTOR001 = 'fdstor001';
const HOSTNAME_FDSTOR002 = 'fdstor002';
const HOSTNAME_FDSTOR003 = 'fdstor003';
const HOSTNAME_FDSTOR004 = 'fdstor004';
const HOSTNAME_FDSMTL001 = 'fdsmtl001';
const HOSTNAME_FDSMTL002 = 'fdsmtl002';
const HOSTNAME_FDSMTL003 = 'fdsmtl003';
const HOSTNAME_FDSMTL004 = 'fdsmtl004';
const HOSTNAME_DBMTOR001 = 'dbmtor001';
const HOSTNAME_DBMTOR002 = 'dbmtor002';
const HOSTNAME_DBMMTL001 = 'dbmmtl001';
const HOSTNAME_PGDTOR011 = 'pgdtor011';
const HOSTNAME_PGDTOR013 = 'pgdtor013';
const HOSTNAME_PGDMTL012 = 'pgdmtl012';
const HOSTNAME_PGDMTL014 = 'pgdmtl014';
const HOSTNAME_PGWTOR001 = 'pgwtor001';
const HOSTNAME_PGWTOR002 = 'pgwtor002';
const HOSTNAME_PGWMTL001 = 'pgwmtl001';
const HOSTNAME_PGWMTL002 = 'pgwmtl002';
const HOSTNAME_DISTOR001 = 'distor001';
const HOSTNAME_DISMTL001 = 'dismtl001';




//NAMES OF HTML DIV IDs for OneNDS, HLR/HSS, EIR, and CISCO

const LIVE_ONE_NDS_ALARMS_HEAD = "LIVE_ONE_NDS_ALARMS_HEAD";
const LIVE_ONE_NDS_ALARMS_BODY = "LIVE_ONE_NDS_ALARMS_BODY";
const LIVE_HLR_HSS_ALARMS_HEAD = "LIVE_HLR_HSS_ALARMS_HEAD";
const LIVE_HLR_HSS_ALARMS_BODY = "LIVE_HLR_HSS_ALARMS_BODY";
const LIVE_EIR_ALARMS_HEAD = "LIVE_EIR_ALARMS_HEAD";
const LIVE_EIR_ALARMS_BODY = "LIVE_EIR_ALARMS_BODY";
const LIVE_CISCO_ALARMS_HEAD = "LIVE_CISCO_ALARMS_HEAD";
const LIVE_CISCO_ALARMS_BODY = "LIVE_CISCO_ALARMS_BODY";

const ONE_NDS_ALARM_HISTORY_HEAD = "ONE_NDS_ALARM_HISTORY_HEAD";
const ONE_NDS_ALARM_HISTORY_BODY = "ONE_NDS_ALARM_HISTORY_BODY";
const HLR_HSS_ALARM_HISTORY_HEAD = "HLR_HSS_ALARM_HISTORY_HEAD";
const HLR_HSS_ALARM_HISTORY_BODY = "HLR_HSS_ALARM_HISTORY_BODY";
const EIR_ALARM_HISTORY_HEAD = "EIR_ALARM_HISTORY_HEAD";
const EIR_ALARM_HISTORY_BODY = "EIR_ALARM_HISTORY_BODY";
const CISCO_ALARM_HISTORY_HEAD = "CISCO_ALARM_HISTORY_HEAD";
const CISCO_ALARM_HISTORY_BODY = "CISCO_ALARM_HISTORY_BODY";
