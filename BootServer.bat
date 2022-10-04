@ECHO OFF

set dbip=172.24.194.223

REM step one: start the mongo server

start cmd.exe /c mongod --config "conf/mongod.conf" --bind_ip %dbip%

timeout /t 7

REM starts webserver maybe?
REM SET DEBUG=betterchatroom:* & npm start
SET DEBUG=betterchatroom:* & node bin/www %dbip%
